# hack-starter

A working Next.js application skeleton for a **150-minute build** by a team of
eight sharing two Copilot seats and two laptops.

Its job is to make minute 15 look like minute 90: the shell, the component
shelf, the theme system, the data layer and four page archetypes are already
built and verified, so the time goes into the product instead of the scaffold.

```bash
npm ci
npm run dev      # http://localhost:3000
npm run verify   # lint + typecheck + build — run this before every push
```

## Two files matter

| File | What it is |
| --- | --- |
| **[RUNBOOK.md](RUNBOOK.md)** | The 150-minute timeline, the eight roles, the checkpoints, the cut ladder. The only thing anyone *reads*. |
| **[PLAN.md](PLAN.md)** | The only thing anyone *fills in*. Generated at T+5 by one prompt, then corrected by hand. |

Everything else is for Copilot — it reads it, you don't.

Reference, when you need it: [docs/AGENT-ISSUES.md](docs/AGENT-ISSUES.md)
(eight ready-to-file cloud-agent issues) ·
[docs/AI-SETUP.md](docs/AI-SETUP.md) (runtime model access, if the product
needs it).

## How the build runs

1. **T+0–5** — topic drops, 3 minutes silent idea writing, Dev 1 picks one. If
   the room has not converged by T+5, move on and let the plan agent choose.
2. **T+5–14** — pick the **plan** agent in Copilot Chat and give it the topic.
   An idea is optional: with none, it interrogates the problem, states what most
   teams will build, generates three candidates at different risk levels, scores
   them on demoability and buildability, and picks one. It fills in `PLAN.md`:
   the angle, three golden-path steps, a 3–5 feature queue, the shared types
   block. **The team reads it aloud and fixes it by hand** — that review is
   where the value is. Dev 1 pastes the types and pushes.
3. **T+14–25** — Dev 1 builds the spine alone: scaffold Dev 2 first, then theme,
   and scaffold a stub page plus nav link for *every* planned feature. Deploy.
   Live URL by T+25.
4. **T+25–90** — both laptops pull features off the queue. One owner per folder.
   Rotate driver and navigator every 25 minutes.
5. **T+90** — feature freeze. Polish, then record the backup video.
6. **T+105–130** — rehearse the demo twice. Fix only demo-breaking bugs.

Step 3 carries the most weight: because every feature folder and nav link
already exists, no feature owner ever touches the shell or routing, which
removes the largest source of merge conflicts before it can occur.

## What is in here

**Stack.** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 ·
shadcn/ui on Radix · lucide-react · recharts · zustand · zod · date-fns ·
sonner · Vercel AI SDK. Everything plausible is already installed so the
no-new-dependencies rule holds under time pressure.

**[.github/copilot-instructions.md](.github/copilot-instructions.md)** — the
highest-leverage file here, and the single source of truth for agents. It locks
the app into SPA mode (no server actions, no server-component fetching, which
removes most of the ways App Router eats twenty minutes), bans raw colour
classes, bans new dependencies, and encodes the folder-ownership map. This is
what makes two independent Copilot sessions produce code that fits together.

**`lib/types.ts`** — shared types *only*: the shapes more than one feature
touches, usually about fifteen lines. Feature-local types live in the feature's
own folder, because domain models emerge while coding. Only Dev 1 writes this
file, and amendments during the build are the normal path, not a failure.

**Four archetypes**, as real working routes so they run out of the box and
Copilot has working examples to pattern-match:

| Route | Archetype | Use for |
| --- | --- | --- |
| `/requests` | list + detail | browsing, triaging, managing records |
| `/insights` | dashboard | trends, totals, health |
| `/assistant` | chat | conversational or AI-assisted |
| `/submit` | form wizard | intake, applications, configuration |

Most topics reduce to one of these. Copy the closest into `app/(feature)/` and
adapt it; never generate a page from scratch.

**Three theme presets** (`theme-ember`, `theme-tidal`, `theme-graphite`) in
`app/globals.css`, switched by one class on `<html>`. Default shadcn — neutral
grey, Geist, `0.625rem` radius, shadowed cards — is an instantly recognisable
look. These move colour, font and radius off the defaults together, which is
what reads as designed. Chart colours follow automatically.

**Two custom agents** in `.github/agents/`, picked from the agent dropdown in
Copilot Chat so nobody has to remember a command: **plan** (cannot write
application code, only `PLAN.md`, so the model can't start building while the
team is still deciding) and **feature** (builds one feature inside its own
folder). Each has a handoff button to the next step. They reference the prompt
files rather than restating them, so there is nothing to drift — and if your
VS Code predates custom agents, the prompts still work.

**Five prompt files** in `.github/prompts/`: `kickoff` (produces the plan),
`new-page` (build one feature end to end), `seed-data`, `polish-ui`, `fix-build`.

**Executable guardrails** in `eslint.config.mjs`. Instructions are requests a
model can ignore; lint rules are not. `npm run verify` runs `eslint .` first, so
a raw Tailwind colour class (`bg-slate-100`, `text-white`), a shadow utility on
a card, or a `next/headers` import **fails the build** — in string literals and
template literals alike. The theme-token and SPA-mode rules therefore hold
whether or not anyone read the instructions file. `components/ui/**` is exempt
as vendored code.

**`app/api/ai/route.ts`** — the only server file, existing purely to keep a model
token off the client. Provider-agnostic: set `AI_BASE_URL`, `AI_TOKEN` and
`AI_MODEL` for any OpenAI-compatible endpoint. It never throws — on a missing
token, rate limit or network failure it falls back to a canned answer from
`lib/ai-fallback.ts` and the UI marks it quietly. A generic answer on stage
costs almost nothing; a stack trace costs the demo.

**`escape-hatch/app.py`** — a Streamlit fallback for a genuinely data/ML-centric
topic, where pandas beats React decisively.

**GitHub Spec Kit** (`.specify/`, plus ten `speckit-*` skills in
`.github/skills/`) is installed. We use two of its steps for real, at T+14:
`/speckit-constitution` to record engineering principles and `/speckit-specify`
for the baseline spec. We deliberately do **not** run `/speckit-implement` —
in a 150-minute window, iterating against a committed types contract is faster,
and the full spec-driven loop is widely reported as overkill below roughly two
days of work. Rule 7 of the instructions file stops an agent wandering into the
expensive steps mid-build.

## Deliberate omissions

No authentication. No database, ORM or migrations. No Docker. No tests. No CI.
Data is client-side in `lib/store.ts`, hydrated from `data/seed.json` — server
in-memory state resets on serverless cold starts, which in practice means it
resets mid-demo.

## Folder ownership

Two people generating code at AI speed must never write the same file. The full
map is Rule 6 of the instructions file.

| Owner | Directories |
| --- | --- |
| Dev 1 | `app/layout.tsx`, `app/page.tsx`, `app/(core)/**`, `lib/**`, `data/**`, `components/shell/**`, config |
| Feature owner | `app/(feature)/<feature>/**`, `components/feature/<feature>/**` |
| Shared, read-only | `components/ui/**` |
| Dev 1 writes, all read | `lib/types.ts` |
