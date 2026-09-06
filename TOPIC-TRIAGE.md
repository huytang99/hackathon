# Topic triage — 4 questions, 3 minutes, done

**Run this at T+5, immediately after picking the idea. Lead answers out loud,
Navigator A writes the answers here and commits.**

The point is to stop architecture being discussed. All four answers are already
decided by the starter; you are only confirming which parts you keep.

---

## 1. What is the primary user action?

This picks your archetype. Copy it, do not write a page from scratch.

| If the user mainly… | Archetype | Copy from |
| --- | --- | --- |
| browses / triages / manages records | **list-detail** | `app/(core)/requests/page.tsx` |
| looks at trends, totals, health | **dashboard** | `app/(core)/insights/page.tsx` |
| asks questions, converses | **chat** | `app/(core)/assistant/page.tsx` |
| submits, applies, configures | **form-wizard** | `app/(core)/submit/page.tsx` |

> Answer: ...................

Two archetypes is the realistic maximum for 150 minutes. Three is a loss.

## 2. Must data survive a page refresh?

Almost always **no** — and no is the right answer for a demo, because a refresh
should return the app to a known-good state rather than to whatever the last
person clicked.

- **No** → change nothing. The client store already works.
- **Yes** → wrap the store creator in zustand `persist`. Instructions are in the
  comment at the bottom of `lib/store.ts`. One-line change.
- **Never** a database, ORM or migration. Not once, not for any topic.

> Answer: ...................

## 3. Does the app itself need to call an LLM at runtime?

Note this is nothing to do with your Copilot licence — see `docs/AI-SETUP.md`.

- **Yes** → keep `app/api/ai/route.ts`, set `GITHUB_MODELS_TOKEN` in Vercel, and
  **rewrite the canned answers in `lib/ai-fallback.ts` at ~T+20**. Ten minutes
  there buys immunity from rate limits and dead wifi.
- **No** → delete `app/api/ai/route.ts`, `lib/ai.ts`, `lib/ai-fallback.ts` and
  `app/(core)/assistant/`. Takes 20 seconds and removes a whole failure class.

> Answer: ...................

## 4. What is the ONE screen a judge will screenshot?

That is your hero screen. Build it first, polish it most, and open the demo on
it. Everything else is supporting cast.

> Answer: ...................

---

## Then, immediately

- [ ] Pick the theme class in `app/layout.tsx`: `theme-ember` (warm, serif,
      editorial), `theme-tidal` (cool, geometric, round), `theme-graphite`
      (mono + acid lime, very sharp). Match the topic mood. **Decide once.**
- [ ] Fill in `SPEC.md` — 10 lines, 5 minutes.
- [ ] Write the 3 golden-path steps in `DEMO.md`.
- [ ] Lead writes all of `lib/types.ts` and pushes. **Nothing else starts first.**
- [ ] Delete the archetypes you are not using, and the signpost section at the
      bottom of `app/page.tsx`.
