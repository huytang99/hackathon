---
applyTo: "components/**/*.tsx"
---

# Component rules

- Start every file with `"use client"`.
- Named export, `PascalCase`, one component per file, props typed inline or from
  `@/lib/types`.
- Compose from `@/components/ui/*`. Never hand-roll a button, input, modal,
  dropdown, tabs or table. Never edit `components/ui/**`.
- Colour only via theme tokens. No `bg-slate-*`, no hex, no `text-white`.
- No `shadow-*` on cards or panels — `border` only.
- Headings use `font-heading` plus a size class. Never set `font-family` inline.
- Spacing: use the 4-point scale already in use (`gap-2 gap-4 gap-6`, `p-4 p-6`).
- Every list renders an empty state. Every loading view uses `<Skeleton />`.
- Keep under ~150 lines. Split by visual section, never into a "container/view" pair.
