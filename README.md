# hack-starter

A pre-built starter for a 2.5-hour GitHub Copilot hackathon, designed for a
specific shape of constraint: **2 laptops, 2 Copilot Business seats, 8 people,
topic announced at T+0.**

The repo's job is to **make minute 15 look like minute 90.** Everything
topic-agnostic is finished; everything topic-specific is left empty.

```bash
npm ci
npm run dev      # http://localhost:3000
npm run verify   # typecheck + build — run this before every push
```

## Read these, in this order

| When | File |
| --- | --- |
| Before the day | [`docs/PREP-CHECKLIST.md`](docs/PREP-CHECKLIST.md) — starts with the dress rehearsal, which matters more than this repo |
| T+0 | [`RUNBOOK.md`](RUNBOOK.md) — the 150-minute timeline and all 8 roles |
| T+5 | [`TOPIC-TRIAGE.md`](TOPIC-TRIAGE.md) — 4 questions, 3 minutes, architecture decided |
| T+8 | [`SPEC.md`](SPEC.md) — 10 lines, then stop |
| T+10 | [`DEMO.md`](DEMO.md) — the 3 golden-path steps, written now, not at T+120 |
| T+12 | [`docs/AGENT-ISSUES.md`](docs/AGENT-ISSUES.md) — 8 pre-written cloud-agent issues |
| T+45, T+70 | [`CUT-LADDER.md`](CUT-LADDER.md) — what to drop, in what order, decided in advance |
| If AI is needed | [`docs/AI-SETUP.md`](docs/AI-SETUP.md) — what a PAT is and whether you need one |

## What is in here

**Stack.** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 ·
shadcn/ui on Radix · lucide-react · recharts · zustand · zod · date-fns ·
sonner · Vercel AI SDK. Everything plausible is pre-installed so the
no-new-dependencies rule holds on the day.

**`.github/copilot-instructions.md`** — the highest-leverage file here. It locks
the app into SPA mode (no server actions, no server-component fetching — which
removes most of the ways App Router eats 20 minutes), forbids raw colour classes,
forbids new dependencies, and encodes the file-ownership map. This is what makes
two independent Copilot sessions produce code that actually integrates.

**`lib/types.ts`** — the contract. The lead fills it in at T+8 before anyone
writes a feature. A shared prose plan does not prevent two Copilot sessions
inventing divergent API shapes; a committed types file does.

**Four page archetypes**, as real working routes so they run out of the box and
Copilot has working examples to pattern-match:

| Route | Archetype | Use for |
| --- | --- | --- |
| `/requests` | list + detail | browsing, triaging, managing records |
| `/insights` | dashboard | trends, totals, health |
| `/assistant` | chat | conversational or AI-assisted |
| `/submit` | form wizard | intake, applications, configuration |

Somewhere around 80–90% of hackathon topics reduce to one of these. Copy the
closest into `app/(feature)/` and adapt; do not generate a page from scratch.

**Three theme presets** (`theme-ember`, `theme-tidal`, `theme-graphite`) in
`app/globals.css`, switched by one class on `<html>`. Default shadcn — neutral
grey, Geist, `0.625rem` radius, shadowed cards — *is* the recognisable
"AI-generated app" look. These move colour, font and radius off the defaults
together, which is what actually reads as designed. Chart colours follow the
theme automatically.

**`.github/prompts/*.prompt.md`** — six reusable prompts (`new-entity`,
`new-page`, `seed-data`, `add-chart`, `polish-ui`, `fix-build`) so the
navigators have a known-good starting point instead of improvising.

**`app/api/ai/route.ts`** — the only server file, existing purely to keep a model
token off the client. It never throws: on a missing token, rate limit or network
failure it falls back to a canned answer from `lib/ai-fallback.ts` and the UI
marks it quietly. A generic answer on stage costs almost nothing; a stack trace
costs the demo.

**`escape-hatch/app.py`** — a Streamlit fallback for a genuinely data/ML-centric
topic, where pandas beats React decisively.

## Deliberate omissions

No authentication. No database, ORM or migrations. No Docker. No tests. No CI.
Data is client-side in `lib/store.ts`, hydrated from `data/seed.json` — server
in-memory state resets on serverless cold starts, which in practice means it
resets during the demo.

## Ownership map

Two people generating code at AI speed must never write the same file. Also in
`CODEOWNERS` and in the instructions file.

| Owner | Directories |
| --- | --- |
| Station A (lead) | `app/layout.tsx`, `app/page.tsx`, `app/(core)/**`, `lib/**`, `data/**`, `components/shell/**`, config |
| Station B | `app/(feature)/**`, `components/feature/**` |
| Shared, read-only | `components/ui/**`, and `lib/types.ts` (lead writes) |
