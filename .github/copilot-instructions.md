# Copilot instructions — hack-starter

A 2.5-hour hackathon app. Optimise for **a working, polished demo**, not for
production robustness. Prefer the boring, working option every time.

This is the single source of truth. There are no other instruction files.

## Stack (already installed — do not change)

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
shadcn/ui (Radix primitives) · lucide-react · recharts · zustand · zod ·
date-fns · sonner · Vercel AI SDK.

## Rule 1 — This app runs in SPA mode

The most important rule here. Next.js server features are the main source of
lost time in a hackathon, so they are banned.

- Every `page.tsx` and every interactive component starts with `"use client"`.
- All data comes from `lib/store.ts` (a client-side zustand store).
- **Never** use server actions, `next/headers`, `cookies()`, `revalidatePath`,
  `revalidateTag`, or data fetching inside a server component.
- **Never** add `async` to a page or layout component.
- The ONLY server-side file is `app/api/ai/route.ts`. Do not create other route
  handlers unless a secret key must be kept off the client.
- Exception: `app/layout.tsx` stays a server component so it can export
  `metadata`. Never add `"use client"` to it, never put logic in it.

## Rule 2 — `lib/types.ts` holds SHARED types only

Its job is narrow: stop two developers' Copilot sessions inventing two
different shapes for the same thing. It is **not** a model of the whole domain,
and it is **not** finished early.

- It contains only types that **more than one feature touches** — the core
  entity, its status union, and the store surface. Usually about 15 lines.
- **Types used by only one feature belong in that feature's own folder**, e.g.
  `app/(feature)/triage/types.ts`. Do not push them into `lib/types.ts`.
  Domain models emerge while coding; that is expected and fine.
- **Never edit `lib/types.ts` yourself.** If a shared type needs to change or
  be added, print the exact block you need and stop. The lead pastes it and
  pushes within a minute. This happens many times during a build — it is the
  normal path, not a failure.
- **Never** redeclare or locally shadow a type that already exists there.
- Import with `import type { X } from "@/lib/types"`.

## Rule 3 — Never add a dependency

Everything needed is installed. Do not run `npm install`, do not edit
`package.json`, do not suggest a library. If something seems to need one,
implement it by hand in ~20 lines or say it is not possible.

**Known trap:** `lib/utils.ts` re-exports `cn` from the `cn` package. That is
correct for this shadcn version. Do NOT rewrite it to the older
`clsx` + `tailwind-merge` form you may have seen elsewhere — neither package is
installed and the build will break.

## Rule 4 — Theme tokens only, never raw colours

The app must not look like default shadcn. Colour lives entirely in
`app/globals.css`.

- Use ONLY semantic tokens: `bg-background`, `text-foreground`, `bg-card`,
  `bg-primary`, `text-primary-foreground`, `bg-muted`, `text-muted-foreground`,
  `bg-accent`, `border-border`, `text-destructive`, `bg-chart-1` … `bg-chart-5`.
- **Never** raw Tailwind colour classes: no `bg-slate-100`, `text-gray-500`,
  `bg-blue-600`, `text-white`, `bg-black`. No hex. No `oklch()` outside
  `app/globals.css`.
- **Never** `shadow-*` on a card or panel. Use `border` only. Shadowed cards are
  the clearest tell of generated UI.
- Headings use `font-heading`. Body inherits `font-sans`. Never set fonts inline.

**Charts:** use the shadcn wrapper (`ChartContainer`, `ChartTooltip`,
`ChartTooltipContent` + a `ChartConfig`), never raw recharts. Colours come from
`var(--color-<yourConfigKey>)`, which resolves to `--chart-1…5` — never pass a
hex or Tailwind colour to a recharts prop. Give `ChartContainer` an explicit
height (`h-[280px]`) or it collapses to zero. `app/(core)/insights/page.tsx` is
a working example; copy its structure.

## Rule 5 — Reuse the component shelf

- 22 shadcn components exist in `components/ui/`. Always import them
  (`@/components/ui/button`, `card`, `table`, `dialog`, `sheet`, `tabs`, …).
- **Never** edit `components/ui/**`. Never hand-roll a button, input, modal,
  dropdown or table.
- Icons: `lucide-react`. Toasts: `sonner` (`import { toast } from "sonner"`).
- Use `PageHeader` from `@/components/shell/app-shell` for every page title
  block, so spacing matches across pages.
- **Before writing a new page, copy the closest archetype from `app/(core)/`
  and adapt it.** Do not generate a page from scratch.

| Archetype | Copy from | Use for |
| --- | --- | --- |
| list + detail | `app/(core)/requests/page.tsx` | browsing, triaging, managing records |
| dashboard | `app/(core)/insights/page.tsx` | trends, totals, health |
| chat | `app/(core)/assistant/page.tsx` | conversational or AI-assisted |
| form wizard | `app/(core)/submit/page.tsx` | intake, applications, configuration |

## Rule 6 — Stay inside the folder you were given

Two people generate code at AI speed into one repo. Writing a file someone else
owns is the most expensive mistake available here.

| Owner | Directories |
| --- | --- |
| **Lead** | `app/layout.tsx`, `app/page.tsx`, `app/(core)/**`, `lib/**`, `data/**`, `components/shell/**`, `components/signature/**`, all config |
| **Feature owner** | `app/(feature)/<feature>/**` and `components/feature/<feature>/**` — one named owner per feature folder |
| Shared, read-only | `components/ui/**` |
| Lead writes, everyone reads | `lib/types.ts` |

Every task names the feature folder you own. **Write only inside it.** If the
task seems to need a file outside it — a nav link, a route, a shared type, a
config change — **print what is needed and stop.** Do not edit it yourself.

## Rule 7 — Do not build these

No authentication or login. No database, ORM, Prisma, SQL or migrations. No
Docker. No tests unless asked. No i18n. No error-boundary scaffolding. No
`README` rewrites. No abstraction layers "for later" — there is no later.

## Data conventions

- Seed data is `data/seed.json`, typed by `lib/types.ts`. A human owns it: read
  the shapes, do not overwrite the file.
- Read and mutate data only through `useStore` in `lib/store.ts`.
- IDs are strings. Dates are ISO strings (`"2026-09-06"`), formatted with
  `date-fns`. Money is whole currency units — never floats for cents.

## Code conventions

- **Filenames are kebab-case** (`app-shell.tsx`, `request-table.tsx`).
  Component *names* are PascalCase. Hooks: `use-thing.ts`.
- Pages use a default export. All other components use named exports.
- Prefer plain functions and `useState` over abstractions. No custom generics.
- Keep components under ~150 lines; split by visual section, never into a
  container/view pair.
- Every list view needs an empty state. Every async view needs a `<Skeleton />`.
- No comments explaining what the code does. No `try/catch` unless it can fail.

## API route rules (`app/api/ai/**` only)

- It exists solely to keep the model token off the client. Never read a secret
  with `process.env` anywhere else.
- **Never let it throw.** Wrap the upstream call and fall back to
  `lib/ai-fallback.ts`. A rate limit during the demo must degrade to a
  plausible answer, not a stack trace.
- Validate the body with `zod`, return 400 on failure. No auth, no rate
  limiting, no logging middleware, no caching.

## Definition of done

`npm run verify` passes (typecheck + build). If it fails, fix that before
suggesting anything else.
