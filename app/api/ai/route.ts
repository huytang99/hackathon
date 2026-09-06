import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { z } from "zod";
import { fallbackFor } from "@/lib/ai-fallback";

/**
 * The only server-side file in this app.
 *
 * It exists for exactly one reason: the model token must never reach the
 * browser. Anything shipped to the client is readable by anyone who opens
 * devtools, so the token stays here in an env var and the client calls us.
 *
 * Contract: this route NEVER throws and NEVER returns a non-200 except for a
 * malformed body. If the model is unreachable, rate-limited, or the token is
 * missing, it returns a canned answer with source:"fallback". The UI shows
 * something sensible either way.
 */

const BodySchema = z.object({
  prompt: z.string().min(1).max(6000),
  system: z.string().max(2000).optional(),
  /** Picks which canned answer to use if the model call fails. */
  task: z.string().max(60).optional(),
});

const DEFAULT_SYSTEM =
  "You are a concise analyst embedded in an internal operations tool. Answer in plain prose, no preamble, no bullet points unless asked, under 120 words.";

export async function POST(req: Request) {
  let body: z.infer<typeof BodySchema>;

  try {
    body = BodySchema.parse(await req.json());
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const token = process.env.GITHUB_MODELS_TOKEN;

  if (!token) {
    return Response.json({ text: fallbackFor(body.task), source: "fallback" });
  }

  try {
    const github = createOpenAI({
      baseURL: "https://models.github.ai/inference",
      apiKey: token,
    });

    const { text } = await generateText({
      model: github(process.env.AI_MODEL ?? "openai/gpt-4o-mini"),
      system: body.system ?? DEFAULT_SYSTEM,
      prompt: body.prompt,
      maxOutputTokens: 700,
      temperature: 0.4,
    });

    return Response.json({ text, source: "model" });
  } catch {
    return Response.json({ text: fallbackFor(body.task), source: "fallback" });
  }
}
