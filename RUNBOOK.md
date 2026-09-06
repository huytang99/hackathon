# Contest-day runbook — 150 minutes

**Everyone reads this before the day. The Timekeeper runs it on the day.**

Constraints this is built around: **2 laptops, 2 Copilot Business seats
(~$100 credits each), 8 people, open internet, public deploy allowed.**

The binding constraint is **keyboards, not licences and not credits**. Every
decision below either (a) keeps both keyboards generating code, or (b) moves
work off a keyboard entirely — onto the cloud coding agent, onto phones, or onto
a person's head.

Organising principle: **feature freeze at T+90**, which is 60% of the clock.
Losing the demo costs more than shipping one fewer feature.

---

## T+0 → T+8 · Converge (all 8)

- Topic drops. **3 minutes of silent individual writing** on paper or phones.
  No discussion. This is deliberate: it gets eight brains contributing in a room
  with two keyboards, and stops the loudest voice from setting direction.
- Lead reads all eight, picks **one**. Not a vote — a decision.
- Run `TOPIC-TRIAGE.md` out loud. Four questions, three minutes.
- Write the **three golden-path steps** into `DEMO.md`.

Rule from here on: **not in the three steps → not built.**

## T+8 → T+15 · Lock the contract, get a URL live

Everything in this window happens in parallel.

| Who | Does |
| --- | --- |
| **Lead (Station A)** | Writes **all** of `lib/types.ts` — every entity, every signature both stations need, stubs returning seed data. Pushes. This is the single most important action of the day. |
| **Lead, then** | Picks the theme class in `app/layout.tsx`. Deploys. **Live URL by T+15.** |
| **Station B** | Clones, `npm ci`, confirms `npm run dev`. Reads `SPEC.md`. Does **not** start coding until types land. |
| **Content owner** | Starts real seed data in `data/seed.json` via the GitHub web editor **on a phone**. |
| **Agent Wrangler** | Files batch 1 from `docs/AGENT-ISSUES.md` (issues 1, 2, 6) and assigns them to Copilot. |
| **Demo Owner** | Fills in `DEMO.md`, including the opening line. |
| **Timekeeper** | Starts the clock. Announces every checkpoint from `CUT-LADDER.md`. |

Why types before code: it is what makes two independent Copilot sessions
produce code that fits together. A shared prose plan does not do this — nothing
stops the model inventing divergent shapes. A committed types file does.

## T+15 → T+90 · Build

Two stations. **Rotate driver and navigator every 25 minutes** — the Timekeeper
calls it, not the driver. Four rotations cycles four people through the
keyboards and prevents tunnel vision.

Each rotation is also an **integration checkpoint**:

```
git pull --rebase && npm run verify && git push
```

…then click the golden path once, end to end. Four cheap checks beat one
expensive merge at T+100.

- **T+45 checkpoint.** Golden path clickable end to end, even on fake data? If
  no, cut rungs 1–2 of the ladder now.
- **T+70 checkpoint.** Everything outside the three steps stops.
- Lead merges cloud-agent PRs as they land — squashed, into a green `main` only.
- Agent Wrangler files batch 2 at ~T+45 once types are stable.

## T+90 · FEATURE FREEZE

Timekeeper calls it. Non-negotiable, and cannot be moved.

Both stations switch to polish only: realistic seed data, empty states, loading
skeletons, spacing, and the hero screen. Run the `polish-ui` prompt file on the
hero screen first.

## T+90 → T+105 · Backup video

Demo Owner records the full golden path against the **live URL**, and downloads
the file locally. This is insurance against dead conference wifi during judging.

Skipping this to gain 15 minutes of build time is the highest-regret decision
available to you.

## T+105 → T+130 · Rehearse twice

On the actual machine, on the actual network, with the actual projector if you
can get to it. Both stations stop pushing at T+105.

Fix **only** demo-breaking bugs. Nothing else. A bug the judge will never see
does not exist.

## T+130 → T+140 · The Copilot story

Agent Wrangler assembles it from the log kept throughout — this is a 10-minute
collection job, not a work block, because the artefacts already exist as a
byproduct of how you worked:

- `.github/copilot-instructions.md` and the scoped `instructions/` files
- `.github/prompts/*.prompt.md` — reusable prompts, not ad-hoc chat
- The cloud-agent PRs merged, with issue links
- One honest sentence on what was delegated to Copilot vs. written by hand

**No slide deck.** A README section or three slides maximum — slides compete for
a laptop you do not have.

## T+140 → T+150 · Buffer and submit

Repo link · live URL · backup video · the Copilot story. Submit at T+145, not
T+150.

---

## Standing rules

- **Both stations commit to `main` directly.** No branch protection, no required
  reviews. At two stations, PR gates cost more than they catch. The only PRs are
  the cloud agent's, and the lead merges those.
- **`npm run verify` before every push.** A red `main` blocks the other station,
  which is the most expensive thing that can happen.
- **`lib/types.ts` is the lead's alone.** Need a change? Say it out loud; it is
  pushed in 30 seconds. Never let two agents edit types.
- **Need a nav link or a route?** Ask Station A. Do not add it yourself. Costs
  20 seconds, prevents the worst conflict class there is.
- **Never add a dependency.** Everything plausible is pre-installed.
- **Read Copilot output before committing it.** The navigator's job. Unreviewed
  generated code is how you end up debugging at T+130.
- **If Copilot is slow or rate-limited, write it by hand.** Never wait on a
  tool — there are seven developers in the room.
- **Announce pushes out loud.** "Pushing, pull in thirty."

## Roles

| Role | Who | Keyboard? |
| --- | --- | --- |
| Station A driver — the Spine | (lead) | yes |
| Station B driver — the Hook | | yes |
| Navigator A | | no — writes the next prompt, reviews output |
| Navigator B | | no — same |
| Timekeeper / Scope Cop | | no — owns the clock, **can cut the lead's features** |
| Demo Owner / QA | | phone — tests live URL, owns `DEMO.md`, speaks |
| Content / Seed Data | | phone — owns `data/seed.json` alone |
| Agent Wrangler | | phone — files and reviews cloud-agent issues |

Pick the Timekeeper deliberately: it must be someone willing to interrupt the
lead. The lead is holding a Copilot seat and coding, so the clock has to belong
to someone else.
