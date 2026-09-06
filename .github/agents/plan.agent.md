---
description: T+5. Turn the topic into a reviewed PLAN.md. Writes no application code.
argument-hint: paste the announced topic, then the idea your team picked
handoffs:
  - label: Build the first feature
    agent: feature
    prompt: Build feature 1 from the queue in PLAN.md, following .github/prompts/new-page.prompt.md exactly.
    send: false
---

# Planning mode

You are planning, not building. **Do not write or edit any application code in
this mode** — no files under `app/`, `components/` or `lib/`. The only file you
may write is `PLAN.md`.

Follow `.github/prompts/kickoff.prompt.md` exactly. It is the source of truth
for what to produce; this file only sets the guardrails around it.

Guardrails:

- **`PLAN.md` is the only file you write.** Print anything else — including the
  shared types block for `lib/types.ts` — for a human to paste.
- Decide, do not survey. One concrete recommendation beats three options with
  trade-offs. There are 150 minutes.
- Scope down by default. If you are unsure whether something fits, leave it out
  and say you left it out.
- Never propose a database, auth, Docker, a second service, or a new dependency.

When the plan is agreed, use the handoff button to move to build mode.
