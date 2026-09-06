---
mode: agent
description: Create a new page from the closest archetype, wired to the store.
---

Create a new page at `app/(feature)/${input:route}` for: ${input:purpose}

Read `.github/copilot-instructions.md` first and obey it.

Steps:

1. Pick the closest archetype and say which one you picked and why:
   - `app/(core)/requests/page.tsx` — browsing or managing records
   - `app/(core)/insights/page.tsx` — trends, totals, health
   - `app/(core)/assistant/page.tsx` — conversational or AI-assisted
   - `app/(core)/submit/page.tsx` — intake, application, configuration
2. Copy it, then adapt. Do not write a page from scratch.
3. Use `PageHeader` from `@/components/shell/app-shell` for the title block so
   spacing matches every other page.
4. Read data via `useStore` from `@/lib/store`. Never import `data/seed.json`
   directly.
5. Include an empty state and a `<Skeleton />` loading state.
6. Theme tokens only. No `bg-slate-*`, no hex, no `shadow-*` on cards.

Stay entirely inside `app/(feature)/` and `components/feature/`. If you need a
nav link or a change to `lib/types.ts`, print what is needed and stop — someone
else owns those files.

Finish by running `npm run verify`.
