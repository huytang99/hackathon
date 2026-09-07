---
mode: agent
description: T+5. Break down the topic, choose the sharpest product, and fill PLAN.md. Works from the topic alone.
---

The topic is: **${input:topic}**

Our current idea, if we have one — **may be blank**: ${input:idea}

**If that idea field is blank or vague, do the thinking yourself.** Do not ask
us to supply one and do not stall. Generating and choosing the product is your
job in this mode; we will review and override.

Constraints that shape every decision below: **~150 minutes total. 2 developers
with Copilot on 2 laptops. 6 more people without keyboards. Judging is final
product and demo first, Copilot workflow second.** Read
`.github/copilot-instructions.md` and `PLAN.md` first.

Work through phases A–E in order, show your reasoning for A–D **in chat**
(briefly — this is not an essay), then write the result into `PLAN.md`.
`PLAN.md` is the only file you may write.

---

## Phase A — Interrogate the topic

Answer concretely. "Users" is not an answer; a named role is.

1. **Who** feels this pain? A specific role in a specific setting.
2. **The moment of pain** — the particular 30 seconds where it actually hurts.
   Not a general condition, a moment.
3. **What they do today instead** — the workaround. There is always one, and it
   is usually a spreadsheet, a group chat, or a person who just remembers.
4. **What visibly changes** for them if this works.
5. **What is countable** — the one number that would move.

If the topic is genuinely ambiguous, ask **at most one** clarifying question,
then proceed on a stated assumption regardless of whether we answer. Blocking
costs more than being wrong here.

## Phase B — What will every other team build?

State the **obvious reading** of this topic — the product roughly 70% of teams
will land on. Be specific and honest; it is often the right answer.

Then decide explicitly, and say which:

- **Execute the obvious thing better** — same idea, sharper user, better demo,
  real-looking data. Low risk. Usually correct.
- **Take a deliberately sharper angle** — a narrower user or an unexpected
  moment in the workflow. Higher ceiling, only if it is still demoable in three
  clicks.

Do not choose novelty for its own sake. A judge remembers a product that
clearly works, not one that is merely unusual.

## Phase C — Three candidates at different risk levels

One line each: who it is for, what they do in it, why a judge would care.

1. **Safe** — obvious, certain to finish, modest ceiling.
2. **Sharp** — narrower user or narrower moment, feels insightful, still safe
   to build.
3. **Ambitious** — highest ceiling, real risk of not finishing in 75 minutes.

If we supplied an idea, add it as candidate 4 exactly as we described it.

## Phase D — Score and choose

Score each candidate 1–5 on all six, show the table, total them:

| Criterion | What a 5 looks like |
| --- | --- |
| **Demoable in 3 clicks** | A judge sees the value in 90 seconds, no setup, no explaining |
| **Buildable in 75 min** | Maps cleanly onto one or two existing archetypes; 2 devs, no new concepts |
| **Visual impact** | The hero screen looks like a product someone ships |
| **Insight** | A judge thinks "I had not considered that" |
| **Differentiation** | Distinct from the Phase B obvious reading, or clearly better executed |
| **Failure isolation** | If one feature breaks, the demo still tells the story |

**Weight "demoable" and "buildable" double.** A brilliant unfinished product
scores zero, and this is the single most common way strong teams lose.

Pick the highest total and say why in one sentence.

**If we supplied an idea:** say honestly whether a generated candidate scored
higher. But if ours is **within 2 points**, choose ours — we have organisational
context you do not, and we have to demo it. Only argue if the gap is real.

### Ideas that reliably lose — reject these

- **"A platform for X."** Too broad, nothing specific to click.
- Anything whose value is **invisible on screen** — a better algorithm, a
  cleverer data model, a faster pipeline.
- Anything needing **real auth, real integrations, or real third-party data** to
  be impressive. It will not be finished.
- **A generic chatbot.** Several teams will build one and none will stand out.
  An AI feature embedded in a specific workflow is fine; a chat window is not.
- **CRUD with no insight** — a list of things with no reason to look at it.
- Anything needing **more than two archetypes** to make sense.

## Phase E — Write PLAN.md

Fill in every section of `PLAN.md`, including §0 with the Phase A–D conclusions
compressed to a few lines. Then:

- **Three golden-path demo steps.** Three things a judge watches someone click,
  in order, that together tell the story.
- **Screens and archetypes** — which file to copy for each, from the table in
  the instructions file. Two archetypes is the realistic maximum; if it seems to
  need three, say which to drop.
- **Feature queue: 3–5 features**, each ownable by one developer inside one
  folder `app/(feature)/<kebab-name>/`, each independently demoable. Order them
  so **features 1 and 2 alone still produce a working demo.** Mark the showpiece.
- **Shared types block** — TypeScript for `lib/types.ts`, **shared types only**
  (types more than one feature touches: usually one entity, a status union, the
  store surface). Under 25 lines. List what you deliberately left out as
  feature-local. Print it; do not edit `lib/types.ts`.
- **Runtime AI: yes or no.** If no, name the files to delete
  (`app/api/ai/route.ts`, `lib/ai.ts`, `lib/ai-fallback.ts`, `app/(core)/assistant/`).
- **Theme** — `theme-ember` (warm, serif, sharp: editorial, human, internal
  tools), `theme-tidal` (cool, geometric, round: calm, technical, data), or
  `theme-graphite` (near-black + acid lime, very sharp: dense, high-contrast).
  One line of justification.
- **The screenshot** — the one screen a judge captures, and which feature builds it.
- **Out of scope** — aggressively. Auth, persistence, multi-user, edit/delete,
  settings, and anything outside the three steps.

## Rules for your output

- **Decide, do not survey.** One recommendation beats three options with
  trade-offs. We have 150 minutes.
- Keep `PLAN.md` short. Both Copilot sessions read it, and a long plan dilutes
  context rather than enriching it.
- Never propose a database, auth, Docker, a second service, or a new dependency.
- If the topic is genuinely a data-analysis task — here is a dataset, find the
  insight — rather than a product, say so plainly and recommend
  `escape-hatch/app.py` instead of the Next.js app.
