"use client";

/**
 * Client helper for the AI route. This is the only way components should
 * call the model — never fetch the upstream API directly from the browser.
 *
 * Usage:
 *   const { text, source } = await ask("Summarise these 20 requests", { task: "summarise" });
 *
 * `source` is "model" when the real call succeeded and "fallback" when a canned
 * answer was substituted. Show a quiet badge when it is "fallback" if you like,
 * but never show an error — the point is that the demo keeps working.
 */

export interface AskResult {
  text: string;
  source: "model" | "fallback";
}

export async function ask(
  prompt: string,
  options: { system?: string; task?: string } = {},
): Promise<AskResult> {
  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, ...options }),
    });

    if (!res.ok) return { text: "", source: "fallback" };

    return (await res.json()) as AskResult;
  } catch {
    return { text: "", source: "fallback" };
  }
}
