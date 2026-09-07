# Runtime AI setup

## First: do you even need this?

Only if **the app itself** calls a model while a user is using it. Example: a
user pastes a ticket, the app sends it to a model, a category comes back.

If the topic does not need that, delete these and move on — it removes a whole
class of failure:

```
app/api/ai/route.ts   lib/ai.ts   lib/ai-fallback.ts   app/(core)/assistant/
```

## Three things that get confused

| Thing | What it does | Who uses it |
| --- | --- | --- |
| **Copilot** | Writes your code, in your editor | You |
| **Copilot coding agent** | Writes your code in a cloud sandbox, from an issue | You |
| **A runtime LLM API** | Answers questions **while a user uses the app** | Your app |

**Your Copilot licence does not give the app an API to call.** Different
products. Runtime AI needs its own endpoint and its own credentials.

## GitHub Models no longer works

`models.github.ai` was **retired on 30 July 2026** — playground, model catalog
and inference API. There is no grandfathering and all its tokens are invalid.
Calling it now returns:

```
HTTP 410  {"error":{"code":"github_models_retirement_brownout", ...}}
```

A `models:read` PAT cannot fix this. The service is gone. If you find a blog
post or tutorial recommending it, that post is out of date.

## Configure any OpenAI-compatible provider

The route is provider-agnostic. Set three variables in `.env.local`:

```bash
AI_BASE_URL=...     # provider endpoint
AI_TOKEN=...        # provider credential
AI_MODEL=gpt-4o-mini
```

Options, best first:

1. **A company-internal or Azure Foundry endpoint.** Ask the organisers whether
   one is available — this is the only option that needs no personal spend and
   no approval from you. Azure Foundry is GitHub's official migration target and
   speaks the same API, so it is usually just these three variables.
   `AI_BASE_URL=https://<resource>.services.ai.azure.com/models`
2. **A direct provider key** someone on the team already has.
   `AI_BASE_URL=https://api.openai.com/v1`
3. **Nothing — run on the canned answers.** See below. This is a legitimate
   choice, not a failure.

Anything OpenAI-compatible works: OpenAI, Azure Foundry, OpenRouter, Groq,
Together, a local Ollama, or a company gateway. Only the three variables change.

## Where the credential must live

`.env.local` (gitignored) for local, and your host's environment-variable
settings for the deployed app. Nowhere else.

- **Never** commit a token, not even in a comment or an example.
- **Never** paste a token into a chat prompt — prompts can be logged and
  retained, so treat a pasted token as a published one.
- **Never** put it in client code. Anything sent to the browser is readable by
  anyone who opens devtools. That is the entire reason `app/api/ai/route.ts`
  exists: the browser calls your route, and your route holds the key.

## Restart after editing `.env.local`

Next reads environment variables **at server start**. If you add a token while
`npm run dev` is running, the running process will not see it and every answer
will silently be a fallback. Stop the server and start it again.

## Debugging: why am I always getting a fallback?

The route swallows upstream errors on purpose — correct for a demo, unhelpful
while wiring things up. Set `AI_DEBUG=1` in `.env.local` and the real error
comes back in the response as `debug`:

```bash
curl -s localhost:3000/api/ai -H "content-type: application/json" \
  -d '{"prompt":"say ok","task":"summarise"}'
```

`"source":"model"` means the real call worked. `"source":"fallback"` plus
`debug` tells you why it did not. **Set `AI_DEBUG=0` before the demo.**

## The fallback is the point

`lib/ai-fallback.ts` returns a canned, plausible answer whenever the real call
cannot be made — no token, rate limit, network failure, retired service. The
route never throws and never returns an error status.

**Rewrite those strings so they read like real output for your topic.** Ten
minutes there buys immunity from rate limits, dead venue wifi, and providers
being switched off underneath you — which, as GitHub Models just demonstrated,
does happen. A slightly generic answer on stage costs almost nothing; a stack
trace costs the demo.

The UI marks a fallback with a quiet "offline answer" badge and shows no error.

## If the topic needs an agent

You do not need an agent framework. Microsoft Agent Framework is .NET and
Python only — no first-class TypeScript — so it would mean a second runtime, a
second service and CORS.

The Vercel AI SDK is already installed. A tool-calling agent is `generateText`
with `tools` and a step limit: the model reasons, calls your tools, loops until
done. About 30 lines, same repo, deploys with the app.
