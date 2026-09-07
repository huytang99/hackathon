# Runbook — 150 minutes

**The only file anyone reads today.** The other one is `PLAN.md`, which
you fill in rather than read.

Built for: **2 laptops · 2 Copilot Business seats · 8 people · open internet ·
public deploy allowed · topic at T+0.**

The binding constraint is **keyboards**, not licences, headcount or credits.
So every rule below either keeps both keyboards generating code, or moves work
off a keyboard entirely — to the cloud agent, to phones, or to someone's head.

---

## T+0 → T+5 · Pick one idea

Whole team. No laptops open.

1. **3 minutes silent writing.** Everyone writes their idea on paper or a phone.
   No discussion. This gets eight brains contributing in a room with two
   keyboards, and stops the loudest voice setting direction.
2. Dev 1 reads all eight aloud, picks **one**. A decision, not a vote.

## T+5 → T+12 · One prompt produces the plan

**This is the whole planning phase.** Dev 1 on laptop 1, Copilot Chat in agent
mode, Navigator A reading over their shoulder.

Pick **plan** from the agent dropdown in Copilot Chat. That mode cannot write
application code — only `PLAN.md` — so the model cannot start building while
you are still deciding what to build. (If the dropdown does not show it, your
VS Code is older: type `/kickoff` instead. Same content, no guardrail.)

It asks for two inputs:

- `topic` — paste the announced topic verbatim
- `idea` — two or three sentences on what the team chose

It rewrites `PLAN.md` with: the product sentence, **three golden-path steps**,
which archetype each screen copies, a **3–5 feature queue** with folders and
owners, the **shared types block**, the AI yes/no call, and the theme.

Then, and this is the part that matters:

3. **Read it on screen as a group. Out loud.** Two minutes.
4. **Fix what is wrong by hand.** It will get something wrong — usually it
   over-scopes the feature queue, or invents a type nobody needs. Cutting is
   faster than regenerating. Do not re-run the prompt.
5. Dev 1 pastes the shared types block into `lib/types.ts`.
6. Commit and push:

```bash
git add -A && git commit -m "Plan and shared types" && git push
```

Why one prompt instead of a planning framework: 150 minutes does not survive a
`specify → plan → tasks → implement` loop. This gets you a reviewed, committed
plan in seven minutes, and the reviewing is the part that adds the value.

## T+12 → T+25 · Dev 1 builds the spine, alone

Nobody else writes code yet. This is short, and it is what makes the next 65
minutes conflict-free.

Dev 1 does, in this order. **The order matters** — step 1 is what unblocks
Dev 2, so it comes before everything else.

1. **Scaffold Dev 2's feature folder first, and push immediately.** Create
   `app/(feature)/<dev2-feature>/page.tsx` with a stub that renders a
   `PageHeader` and nothing else, add its nav entry to
   `components/shell/app-shell.tsx`, and push. Two minutes.

   ```bash
   npm run verify && git add -A && git commit -m "Scaffold <feature>" && git push
   ```

   **Dev 2 pulls and starts building at ~T+15.** Without this they sit idle
   until T+25, or worse, edit the shell themselves and collide with you.

2. **Scaffold the remaining feature folders** the same way, all in one push.
3. **Set the theme** class on `<html>` in `app/layout.tsx` (from `PLAN.md` §7).
4. **Delete the archetypes you are not using** and the signpost section at the
   bottom of `app/page.tsx`.
5. **Deploy.** Live URL by T+25.

```bash
npm run verify && git add -A && git commit -m "Spine + feature scaffolds" && git push
```

### What Dev 2 does between T+12 and T+15

Only three minutes, so do not start a feature. Instead: read `PLAN.md`, decide
which archetype your feature copies, and open a fresh Copilot Chat session with
the **feature** agent selected so the context is warm. If the product uses
runtime AI, rewrite the canned strings in `lib/ai-fallback.ts` for this topic —
it is an isolated file nobody else touches, and it is the cheapest demo
insurance in the repo.

**Step 3 is the highest-value ten minutes of the day.** Because every feature
folder and every nav link already exists, no feature owner ever needs to touch
the shell or routing — which removes the single largest source of merge
conflicts before it can happen.

Meanwhile, off-keyboard:

| Who | Doing |
| --- | --- |
| Demo Owner | Writes the demo script at the bottom of `PLAN.md` |
| Content owner | Real seed data in `data/seed.json` via GitHub's web editor **on a phone** |
| Agent Wrangler | Files issues 1, 2 and 6 from `docs/AGENT-ISSUES.md`, assigns to Copilot |
| Timekeeper | Starts the clock, reads the checkpoint scripts below |

## T+25 → T+90 · Build the queue

Both laptops now build features. **Features are a queue, not an assignment.**

- Take the top unclaimed row of `PLAN.md` §4. Write your name in Owner.
- Build only inside `app/(feature)/<your-feature>/`. Never outside it.
- When done, mark it, push, take the next unclaimed row.
- Typically Dev 1 lands features 2 and 4 while Dev 2 lands 1
  and 3. Nobody is idle and nobody is blocked waiting for an assignment.

**Per-feature loop.** Open a **fresh chat session** for each feature, then pick
**feature** from the agent dropdown and give it the feature name and its
one-line scope from `PLAN.md`. (No dropdown? Use `/new-page` instead.)

Fresh session per feature is not hygiene, it is load-bearing: after roughly ten
turns a session starts contradicting its own earlier decisions and breaking
things that already worked. Old context does not accumulate into wisdom.

Then read what it produced before committing. That is the navigator's job.

**Every 25 minutes, rotate driver and navigator.** Timekeeper calls it, not the
driver. Four rotations cycles four people through the keyboards. Each rotation
is also the integration checkpoint:

```bash
git pull --rebase && npm run verify && git push
```

…then click the golden path once, end to end. Announce pushes out loud:
*"pushing, pull in thirty."*

### What Dev 1 is doing besides features

Three standing duties, interrupt-driven, maybe 15 minutes total across the
whole window:

- **Types amendments.** Someone says "I need a `dueDate` on `Item`." Dev 1 adds
  it and pushes inside a minute. Expect this five to ten times. It is the
  normal path.
- **Merging cloud-agent PRs** — squashed, into a green `main`, only files no
  feature owner holds.
- **Nav and route additions** the plan did not anticipate.

So Dev 1's day is: spine (13 min) → roughly half the features → integration
duty throughout. Not supervision.

### Checkpoints — Timekeeper reads these verbatim

**T+45** — *"Can we click all three golden-path steps right now, even on fake
data? If no, we cut from the ladder immediately."*

**T+70** — *"Everything not in the three steps stops now. Name what you are
still building. If it is not in `PLAN.md`, close the file."*

**T+90** — *"Feature freeze. Nothing new. Polish, seed data, empty states only.
Demo Owner starts recording."*

**T+105** — *"Both laptops stop pushing. Rehearsal one starts now."*

### The cut ladder — decided now so cuts are unemotional later

Drop in this order. The Timekeeper has authority to invoke it, including on Dev 1's own work.

1. Authentication or login — never build it, not even a fake screen
2. Settings, admin, profile — nobody demos settings
3. The last feature in the queue, then the second-last
4. Edit and delete (keep create and read — a demo rarely edits)
5. Mobile layout (the starter is already responsive, so usually free — keep it)
6. Real AI calls → switch to the canned answers in `lib/ai-fallback.ts`
7. Charts → fall back to a `DisplayStat` from `@/components/signature`
8. The third golden-path step — two steps done well beats three where one breaks

**Never cut:** the hero screen polish · golden-path steps 1 and 2 · seed-data
realism · the backup video · the T+90 freeze.

## T+90 · FEATURE FREEZE

Non-negotiable. Cannot be moved, only enforced.

Both laptops switch to polish. Run `/polish-ui` on the showpiece screen first,
then the hero screen.

## T+90 → T+105 · Backup video

Demo Owner records the full golden path against the **live URL** and saves the
file locally. Insurance against dead venue wifi during judging.

Skipping this to gain 15 minutes of build time is the highest-regret decision
available to you.

## T+105 → T+130 · Rehearse twice

Real machine, real network, real projector if you can reach it. Both laptops
stop pushing at T+105. Fix **only** demo-breaking bugs — a bug the judge will
never see does not exist.

## T+130 → T+140 · The Copilot story

Agent Wrangler collects, from the log kept throughout — a 10-minute collection
job, not a work block, because these artefacts already exist as a byproduct:

- `.github/copilot-instructions.md` — how we kept two AI sessions consistent
- `.github/prompts/*.prompt.md` — reusable prompts, not ad-hoc chat
- The cloud-agent PRs merged, with issue links
- One honest sentence on what was delegated vs. hand-written

**No slide deck.** A README section or three slides maximum — slides compete for
a laptop you do not have.

## T+140 → T+150 · Submit

Repo link · live URL · backup video · the Copilot story. Submit at T+145.

---

## Standing rules

- **Both laptops commit to `main` directly.** No branch protection, no reviews.
  At two stations, PR gates cost more than they catch. The only PRs are the
  cloud agent's; Dev 1 merges those.
- **`npm run verify` before every push.** A red `main` blocks the other
  developer — the most expensive thing that can happen.
- **Only Dev 1 writes `lib/types.ts`.** Everyone else asks. It takes a minute.
- **Never touch a folder you do not own.** Need a nav link or a route? Ask the
  Dev 1. Twenty seconds, and it prevents the worst conflict class there is.
- **Never add a dependency.**
- **Read Copilot output before committing it.** Navigator's job. Unreviewed
  generated code is how you end up debugging at T+130.
- **Fresh chat session per feature**, and one coherent slice per request. Never
  "build the whole feature" in one turn.
- **Never paste a token or credential into a prompt.** Prompts can be logged and
  retained — treat a pasted secret as a published one. The model token belongs
  in `.env.local` and in Vercel's env settings, nowhere else.
- **If Copilot is slow or rate-limited, write it by hand.** Never wait on a
  tool — there are seven developers in the room.

## Roles

| Role | Who | Keyboard |
| --- | --- | --- |
| Dev 1 — spine, then features, plus integration | | laptop 1 |
| Dev 2 — features off the queue | | laptop 2 |
| Navigator ×2 | | no — writes the next prompt, reviews output |
| Timekeeper / Scope Cop | | no — owns the clock, **can cut Dev 1's work** |
| Demo Owner / QA | | phone — tests the live URL, owns the demo script, speaks |
| Content / Seed data | | phone — owns `data/seed.json` alone |
| Agent Wrangler | | phone — files and reviews cloud-agent issues |

Navigators and drivers swap every 25 minutes, so four people touch the
keyboards. Pick the Timekeeper deliberately: Dev 1 is coding, so the clock
must belong to someone willing to interrupt them.
