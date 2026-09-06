# Copilot instructions — hack-starter

A 2.5-hour hackathon app. Optimise for **a working, polished demo**, not for
production robustness. Prefer the boring, working option every time.

## Stack (already installed — do not change)

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
shadcn/ui (Radix primitives) · lucide-react · recharts · zustand · zod ·
date-fns · sonner · Vercel AI SDK.

## Rule 1 — This app runs in SPA mode

This is the most important rule in this file. Next.js server features are the
main source of lost time in a hackathon, so they are banned.

- Every `page.tsx` and every interactive component starts with `"use client"`.
- All data comes from `lib/store.ts` (a client-side zustand store).
- **Never** use server actions, `next/headers`, `cookies()`, `revalidatePath`,
  `revalidateTag`, or data fetching inside a server component.
- **Never** add `async` to a page or layout component.
- The ONLY server-side file in this repo is `app/api/ai/route.ts`. Do not create
  other route handlers unless a secret key must be kept off the client.
- Exception: `app/layout.tsx` stays a server component so that it can export
  `metadata`. Never add "use client" to it, and never put logic in it.

## Rule 2 — `lib/types.ts` is the contract

- Every shared entity, prop shape and function signature lives in `lib/types.ts`.
- **Never** redeclare, duplicate or locally re-define a type that exists there.
- **Never** edit `lib/types.ts` unless explicitly asked to. If a change is needed,
  say so and stop — a human owns this file.
- Import types with `import type { X } from "@/lib/types"`.

## Rule 3 — Never add a dependency

Everything needed is already installed. Do not run `npm install`, do not add to
`package.json`, and do not suggest a new library. If something seems to need one,
implement it by hand in ~20 lines instead, or say it is not possible.

## Rule 4 — Use theme tokens, never raw colours

The app must not look like default shadcn. Colour is controlled entirely by
theme tokens in `app/globals.css`.

- Use ONLY semantic tokens: `bg-background`, `text-foreground`, `bg-card`,
  `bg-primary`, `text-primary-foreground`, `bg-muted`, `text-muted-foreground`,
  `bg-accent`, `border-border`, `text-destructive`, `bg-chart-1` … `bg-chart-5`.
- **Never** use raw Tailwind colour classes: no `bg-slate-100`, no `text-gray-500`,
  no `bg-blue-600`, no `text-white`, no `bg-black`. No hex codes. No `oklch()`
  outside `app/globals.css`.
- **Never** put `shadow-sm` / `shadow-md` on cards or panels. Use `border` only.
  Shadows on cards are the single clearest tell of generated UI.
- Headings use `font-heading`. Body text inherits `font-sans`. Do not set fonts inline.

## Rule 5 — Reuse the component shelf

- 22 shadcn components already exist in `components/ui/`. Always import and use
  them (`@/components/ui/button`, `card`, `table`, `dialog`, `sheet`, `tabs`, …).
- **Never** edit anything in `components/ui/` and never hand-roll a button,
  input, modal, dropdown or table from scratch.
- Icons come from `lucide-react`. Toasts come from `sonner` (`import { toast } from "sonner"`).
- Before building a new page, copy the closest archetype from `app/_templates/`
  (`list-detail`, `dashboard`, `chat`, `form-wizard`) and adapt it.

## Rule 6 — File ownership (two developers work in parallel)

Stay strictly inside the directory you were asked to work in. Editing a file
owned by the other station causes merge conflicts and is the most expensive
mistake you can make here.

| Owner | Directories |
| --- | --- |
| Station A ("Spine") | `app/layout.tsx`, `app/page.tsx`, `app/(core)/**`, `lib/**`, `data/**`, `components/shell/**`, all config files |
| Station B ("Hook") | `app/(feature)/**`, `components/feature/**` |
| Shared, read-only | `components/ui/**`, `lib/types.ts` |

If a task appears to require touching the other station's files (adding a nav
link, a route, or a shared type), **stop and say so** instead of editing.

## Rule 7 — Do not build these

No authentication or login. No database, ORM, Prisma, SQL or migrations.
No Docker. No tests unless explicitly asked. No i18n. No error-boundary
scaffolding. No `README` rewrites. No abstraction layers "for later" —
there is no later.

## Data conventions

- Seed data lives in `data/seed.json` and is typed by `lib/types.ts`.
  A human owns that file; read its shapes, do not overwrite it.
- Read and mutate data only through the `useStore` hook in `lib/store.ts`.
- IDs are strings. Dates are ISO strings (`"2026-09-06"`), formatted with `date-fns`.
- Money is a number of whole currency units. Never floats for cents.

## Code conventions

- Components: `PascalCase.tsx`, one component per file, named exports.
- Files/folders: `kebab-case`. Hooks: `use-thing.ts`.
- Prefer plain functions and `useState` over abstractions. No custom generics.
- Keep components under ~150 lines; split by section, not by layer.
- Every list view needs an empty state. Every async view needs a `<Skeleton />`.
- No comments explaining what the code does. No `try/catch` unless it can fail.

## Definition of done

`npm run verify` passes (typecheck + build). If it fails, fix it before
suggesting anything else.
