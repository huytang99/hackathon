# AGENTS.md

All agent instructions for this repository live in **`.github/copilot-instructions.md`**.
Read that file first and follow it exactly. It is the single source of truth for
the stack, the SPA-mode rule, the theme-token rule, the no-new-dependencies rule,
and the file-ownership map between the two developers working in parallel.

Quick summary for cloud agents picking up an issue:

- Everything is client-side. `"use client"` at the top of every page. No server
  actions, no server-component data fetching. The only server file is `app/api/ai/route.ts`.
- Shared types live in `lib/types.ts`. Read them; never edit them.
- Never add a dependency. Everything you need is installed.
- Colours come from theme tokens only (`bg-background`, `bg-primary`, `text-muted-foreground`).
  Never `bg-slate-*`, never hex, never `shadow-*` on a card.
- Reuse `components/ui/**` (22 shadcn components). Never edit them.
- Stay inside the directories the issue names. Do not touch files it excludes.
- Done means `npm run verify` passes.
