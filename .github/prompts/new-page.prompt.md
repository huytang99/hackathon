---
mode: agent
description: Build one feature from the queue, end to end, inside its own folder.
---

Build the feature `${input:feature}` at `app/(feature)/${input:feature}/`.

Its scope, from `PLAN.md`: ${input:purpose}

Read `.github/copilot-instructions.md` and `PLAN.md` first. Obey every rule,
especially SPA mode, theme tokens only, no new dependencies, and the folder
ownership map.

## Steps

1. **Pick the archetype** from the table in the instructions file and say which
   one you picked and why. Copy that file, then adapt it. **Do not write a page
   from scratch** — the archetypes already handle search, filtering, tables,
   detail drawers, empty states and validation.

2. **Types.** Read `lib/types.ts` for the shared shapes and use them as-is.
   - Types **only this feature** uses go in
     `app/(feature)/${input:feature}/types.ts`. That is the normal case.
   - If you genuinely need a change to a **shared** type, print the exact block
     and stop. Do not edit `lib/types.ts`.

3. **Data.** Read and mutate only through `useStore` from `@/lib/store`. Never
   import `data/seed.json` directly. If this feature needs new seed records,
   print them for the Content owner rather than editing `data/seed.json`.

4. **Build the page.** Use `PageHeader` from `@/components/shell/app-shell` for
   the title block so spacing matches every other page. Include an empty state
   and a `<Skeleton />` loading state.

5. **Verify.** Run `npm run verify` and fix anything it reports.

## Boundaries

Write only inside `app/(feature)/${input:feature}/` and
`components/feature/${input:feature}/`.

The page shell and its nav link already exist — Dev 1 scaffolded them. If
this task appears to need anything outside your folder (routing, the nav, the
shell, config, shared types, seed data), **print what is needed and stop.**

## Report back

- Which archetype you copied
- Anything you need from Dev 1, as a paste-ready block
- Anything in the scope you deliberately did not build
