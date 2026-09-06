---
mode: agent
description: Polish pass on one page. Run this after feature freeze, never before.
---

Do a polish pass on `${input:file}`. Change appearance and robustness only —
**do not add or change any feature.**

Read `.github/copilot-instructions.md` first.

Work through this checklist and report what you changed:

1. **Empty state.** Every list, table and data view has one, with an icon, a
   one-line explanation, and an action that clears filters or creates the first
   record.
2. **Loading state.** Every async view uses `<Skeleton />` shaped like the real
   content, not a spinner.
3. **Slop check.** Remove every `shadow-*` on a card or panel. Replace any raw
   Tailwind colour (`bg-slate-100`, `text-gray-500`, `text-white`, hex) with the
   right semantic token.
4. **Typography.** Headings use `font-heading`. Numeric columns use
   `tabular-nums`. Long text lines get `leading-relaxed`.
5. **Spacing.** Consistent with the other pages: `px-6`, `py-10`, `gap-4`/`gap-6`.
   No one-off values.
6. **Alignment.** Numbers right-aligned, text left-aligned, headers matching
   their column.
7. **Focus and hover.** Interactive rows get `cursor-pointer` and a visible
   hover. Icon-only buttons get an `aria-label`.
8. **One micro-interaction.** A single subtle transition — a hover translate, a
   colour fade. One, not five.

Then run `npm run verify`.
