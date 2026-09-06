# hack-starter

A pre-built starter for a 2.5-hour GitHub Copilot hackathon, built for a
specific constraint shape: **2 laptops, 2 Copilot Business seats, 8 people,
topic announced at T+0.**

The repo's job is to **make minute 15 look like minute 90.** Everything
topic-agnostic is finished; everything topic-specific is left empty.

```bash
npm ci
npm run dev      # http://localhost:3000
npm run verify   # typecheck + build — run this before every push
```

## Only two files matter on the day

| File | What it is |
| --- | --- |
| **[RUNBOOK.md](RUNBOOK.md)** | The 150-minute timeline, the roles, the checkpoints, the cut ladder. The only thing anyone *reads*. |
| **[PLAN.md](PLAN.md)** | The only thing anyone *fills in*. Generated at T+5 by one prompt, then corrected by hand. |

Everything else is either for Copilot (it reads it, you don't) or for the prep
week (you read it once, before the day).

**Prep week:** [docs/PREP-CHECKLIST.md](docs/PREP-CHECKLIST.md) —
starts with the dress rehearsal, which is worth more than this whole repo ·
[docs/AGENT-ISSUES.md](docs/AGENT-ISSUES.md) — 8 pre-written cloud-agent issues ·
[docs/AI-SETUP.md](docs/AI-SETUP.md) — what a PAT is and whether you need one.

## How the day actually runs

1. **T+0–5** — topic drops, 3 minutes silent idea writing, lead picks one.
2. **T+5–12** — pick the **plan** agent in Copilot Chat, give it the topic and
   the idea. It fills in `PLAN.md`: three golden-path steps, a 3–5 feature
   queue, and the shared types block. **The team reads it aloud and fixes it by
   hand** — that review is where the value is. Lead pastes the types and pushes.
3. **T+12–25** — lead builds the spine alone: theme, delete unused archetypes,
   and scaffold a stub page plus nav link for *every* planned feature. Deploy.
   Live URL by T+25.
4. **T+25–90** — both laptops pull features off the queue. One owner per folder.
   Rotate driver and navigator every 25 minutes.
5. **T+90** — feature freeze. Polish, then record the backup video.
6. **T+105–130** — rehearse the demo twice. Fix only demo-breaking bugs.

Step 3 is the highest-leverage part: because every feature folder and nav link
already exists, no feature owner ever touches the shell or routing, which
removes the largest source of merge conflicts before it can occur.

## What is in here

**Stack.** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 ·
shadcn/ui on Radix · lucide-react · recharts · zustand · zod · date-fns ·
sonner · Vercel AI SDK. Everything plausible is pre-installed so the
no-new-dependencies rule holds on the day.

**[.github/copilot-instructions.md](.github/copilot-instructions.md)** — the
highest-leverage file here, and the single source of truth for agents. It locks
the app into SPA mode (no server actions, no server-component fetching, which
removes most of the ways App Router eats 20 minutes), bans raw colour classes,
bans new dependencies, and encodes the folder-ownership map. This is what makes
two independent Copilot sessions produce code that fits together.

**`lib/types.ts`** — shared types *only*: the types more than one feature
touches, usually about 15 lines. Feature-local types live in the feature's own
folder, because domain models emerge while coding. Only the lead writes this
file, and amendments during the build are the normal path, not a failure.

**Four archetypes**, as real working routes so they run out of the box and
Copilot has working examples to pattern-match:

| Route | Archetype | Use for |
| --- | --- | --- |
| `/requests` | list + detail | browsing, triaging, managing records |
| `/insights` | dashboard | trends, totals, health |
| `/assistant` | chat | conversational or AI-assisted |
| `/submit` | form wizard | intake, applications, configuration |

Roughly 80–90% of hackathon topics reduce to one of these. Copy the closest into
`app/(feature)/` and adapt; never generate a page from scratch.

**Three theme presets** (`theme-ember`, `theme-tidal`, `theme-graphite`) in
`app/globals.css`, switched by one class on `<html>`. Default shadcn — neutral
grey, Geist, `0.625rem` radius, shadowed cards — *is* the recognisable
"AI-generated app" look. These move colour, font and radius off the defaults
together, which is what reads as designed. Chart colours follow automatically.

**Two custom agents** in `.github/agents/`, picked from the agent dropdown in
Copilot Chat so nobody has to remember a command: **plan** (T+5 — cannot write
application code, only `PLAN.md`, so the model can't start building while you're
still deciding) and **feature** (T+25–90 — builds one feature inside its own
folder). Each has a handoff button to the next step. They're thin wrappers that
*reference* the prompt files rather than restating them, so there's nothing to
drift, and if your VS Code predates custom agents the prompts still work.

**Five prompt files** in `.github/prompts/`: `kickoff` (produces the plan),
`new-page` (build one feature end to end), `seed-data`, `polish-ui`, `fix-build`.

**`app/api/ai/route.ts`** — the only server file, existing purely to keep a model
token off the client. It never throws: on a missing token, rate limit or network
failure it falls back to a canned answer from `lib/ai-fallback.ts` and the UI
marks it quietly. A generic answer on stage costs almost nothing; a stack trace
costs the demo.

**`escape-hatch/app.py`** — a Streamlit fallback for a genuinely data/ML-centric
topic, where pandas beats React decisively.

## Deliberate omissions

No authentication. No database, ORM or migrations. No Docker. No tests. No CI.
No spec-driven-development toolchain on the critical path. Data is client-side in
`lib/store.ts`, hydrated from `data/seed.json` — server in-memory state resets on
serverless cold starts, which in practice means it resets during the demo.

## Folder ownership

Two people generating code at AI speed must never write the same file. The full
map is Rule 6 of the instructions file.

| Owner | Directories |
| --- | --- |
| Lead | `app/layout.tsx`, `app/page.tsx`, `app/(core)/**`, `lib/**`, `data/**`, `components/shell/**`, config |
| Feature owner | `app/(feature)/<feature>/**`, `components/feature/<feature>/**` |
| Shared, read-only | `components/ui/**` |
| Lead writes, all read | `lib/types.ts` |
