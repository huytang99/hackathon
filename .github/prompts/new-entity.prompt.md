---
mode: agent
description: Add a complete entity - type, seed data, list page and detail drawer - in one pass.
---

Add a new entity called `${input:entityName}` to this app, end to end.

Read `.github/copilot-instructions.md` first and obey every rule in it,
especially SPA mode, theme tokens only, and no new dependencies.

Do all of the following:

1. Read `lib/types.ts` to see the existing `Item` pattern. Propose the new
   interface and its `New${input:entityName}` payload type, but **do not edit
   `lib/types.ts` yourself** — print the exact block for the lead to paste, then
   continue assuming it exists.
2. Add store slice methods following the exact shape of `addItem`,
   `updateItem`, `removeItem` and `setStatus` in `lib/store.ts`.
3. Add 12 rows of realistic seed data to `data/seed.json` under a new key.
   Realistic means plausible names, believable numbers, real-sounding
   descriptions. Never "Item 1", never lorem ipsum.
4. Build the list page by copying `app/(core)/requests/page.tsx` and adapting
   it: search, status filter, table, detail Sheet, empty state.
5. Print the one-line nav entry for `components/shell/app-shell.tsx` for the
   lead to add. Do not edit that file.

Then run `npm run verify` and fix anything it reports.
