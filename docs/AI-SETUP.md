# AI setup — what the PAT is, and whether you actually need it

## Three different things that keep getting confused

| Thing | What it does | Who uses it |
| --- | --- | --- |
| **GitHub Copilot** | Writes your code, in your editor | You, the developer |
| **Copilot coding agent** | Writes your code, in a cloud sandbox, from an issue | You, the developer |
| **A runtime LLM API** | Answers questions **while a user is using your app** | Your app, at runtime |

The important consequence: **your Copilot licence does not give your app an API
to call.** They are separate products. Copilot helps you build the app; if the
app itself needs to send text to a model and get an answer back, that is a
different service and needs its own credentials.

Concrete example. Topic is "build a support ticket triager". A user pastes a
ticket into your app, and the app sends it to a model which returns a category.
That call happens at runtime, on behalf of a user, from your server. Copilot is
not involved at all.

## So what is a PAT?

A **Personal Access Token** is a long password-like string that proves your
GitHub identity to an API, instead of a username and password. You generate it
once and paste it into an environment variable.

**GitHub Models** is GitHub's service that lets you call LLMs (GPT, Claude,
Llama and others) over an endpoint that speaks the standard OpenAI API format,
authenticated with that token. It is attractive for this contest because you
already have GitHub accounts — no vendor signup, no procurement, no company
credit card, and it is on-theme for a GitHub event.

## Why the token must stay on the server

Anything you send to the browser is readable by anyone who opens developer
tools. A token in client-side JavaScript is a published token.

So the flow is:

```
browser  ──►  /api/ai (your server, holds the token)  ──►  GitHub Models
```

That is the entire reason `app/api/ai/route.ts` exists, and the only reason this
app has any server-side code at all. `lib/ai.ts` is the thin client that calls
your own route. **Never call the upstream API from a component.**

## Do you actually need this?

Roughly a coin flip, depending on the topic — which is exactly why it is set up
in advance rather than built under time pressure.

- **Topic needs runtime AI** → set `GITHUB_MODELS_TOKEN` and you are done in
  two minutes.
- **Topic does not** → delete `app/api/ai/route.ts`, `lib/ai.ts`,
  `lib/ai-fallback.ts` and `app/(core)/assistant/`. Twenty seconds, and it
  removes an entire class of failure.

Either way it costs nothing to have prepared it.

## Setup (do this in the prep week, not on the day)

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** →
   **Fine-grained tokens** → **Generate new token**.
2. Scope: **`models:read`**. Nothing else. No repo access needed.
3. Copy `.env.example` to `.env.local` and paste the token in.
4. Test it: `npm run dev`, open `/assistant`, click a suggestion. If the reply
   has **no** "offline answer" badge, the real model answered.
5. Add the same variable to your Vercel project settings, or the deployed app
   will silently use the fallback.

## The constraints you must design around

- **~10–20 requests per minute**, depending on tier.
- **~8K input / 4K output tokens.**

So: do not build anything that needs long context, high throughput, or many
calls per user action. One call per button press, short prompts. This is fine
for a demo and hopeless for a product — know which you are building.

## The fallback is the point

`lib/ai-fallback.ts` returns a canned, plausible answer whenever the real call
cannot be made — missing token, rate limit, network failure, upstream error. The
route is written so it **never throws and never returns an error status**.

**At ~T+20 on contest day, rewrite those canned strings so they read like real
output for your actual topic.** Ten minutes there buys total immunity from rate
limits, expired tokens and dead conference wifi. A generic-but-plausible answer
on stage costs you almost nothing; a stack trace on stage costs you the demo.

The UI marks a fallback answer with a quiet "offline answer" badge and shows no
error. That is the correct trade in front of judges.

## Ask the organisers first

- Does the company provide an internal LLM or Azure OpenAI endpoint you should
  use instead? If so, prefer it — swap the `baseURL` in
  `app/api/ai/route.ts` and skip the PAT entirely.
- Is GitHub Models permitted on your accounts? Some org policies restrict it.

## If the topic needs an actual agent

You do not need an agent framework, and you should not add one. Microsoft Agent
Framework is .NET and Python only — no first-class TypeScript — so it would mean
a second runtime, a second service, a second deploy and CORS, inside 150
minutes. Multi-agent orchestration is also the least predictable thing to put in
front of judges.

The Vercel AI SDK is already installed. A tool-calling agent is `generateText`
with `tools` and a step limit — the model reasons, calls your tools, loops until
done. About 30 lines, TypeScript, same repo, deploys with the app.
