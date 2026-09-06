# Cloud-agent issue library

**Owner: the Agent Wrangler. File these between T+10 and T+20, from a phone.**

Why this file exists: you have 2 laptops and 8 people. The Copilot coding agent
runs in its own cloud sandbox, so it does **not** consume a laptop — it is
effectively your third through eighth machine. With a ~$100 credit budget per
seat you can afford to run this hard (a complex task is roughly 20–50 premium
requests).

Every issue below is deliberately **peripheral**: none of it is on the demo
golden path, so nothing breaks if an agent is slow or produces a bad PR. Each
one also touches only files neither developer owns, so they merge cleanly.

## How to file one

1. New issue → **Copilot task** template.
2. Paste the block below, replace `<TOPIC>` and any `<...>` with one line of
   detail from the actual topic.
3. Assign to **Copilot**.
4. When the draft PR appears, review the diff on your phone and flag it to the
   lead. **Only the lead merges**, and only into a green `main`.

Batch 1 (file at ~T+12): issues 1, 2, 6.
Batch 2 (file at ~T+45, once types are stable): issues 3, 4, 5.
Batch 3 (file at ~T+70, only if the first two batches landed clean): 7, 8.

---

## 1. Realistic seed data — highest value, file this first

> Replace the placeholder contents of `data/seed.json` with 22 realistic records
> for `<TOPIC>`, matching the shapes in `lib/types.ts` exactly.
>
> Realistic means: real-sounding full names reused across records so it reads as
> one organisation; specific concrete titles; one-to-two sentence descriptions
> that state impact and include a number; varied non-round values; ISO dates
> spread over the last eight weeks; unevenly distributed statuses.
>
> Never "Item 1", "Test", "Example" or lorem ipsum. Also set `appName` to
> something short and pronounceable and `appTagline` to one plain sentence.
>
> May touch: `data/seed.json` only.

## 2. Empty states everywhere

> Add a proper empty state to every list, table and data view in `app/(core)/`.
> Each one gets a lucide icon, a one-line explanation of why it is empty, and an
> action that either clears the filters or creates the first record. Follow the
> existing empty state in `app/(core)/requests/page.tsx` exactly.
>
> May touch: `app/(core)/**`. Must not touch `app/(feature)/**`.

## 3. Loading skeletons

> Add `<Skeleton />` loading states to every data view in `app/(core)/`, shaped
> like the real content — skeleton table rows for tables, skeleton cards for
> card grids. Never a spinner. Use the existing skeleton block in
> `app/(core)/assistant/page.tsx` as the reference.
>
> May touch: `app/(core)/**`.

## 4. About page

> Add `app/(core)/about/page.tsx` describing what this product does and who it
> is for, based on `PLAN.md`. Use `PageHeader` from
> `@/components/shell/app-shell`. Three short sections, no marketing language,
> no invented statistics. Print the nav entry for the lead to add — do not edit
> `components/shell/app-shell.tsx`.
>
> May touch: `app/(core)/about/**` only.

## 5. Settings page

> Add `app/(core)/settings/page.tsx` with a theme light/dark control, a "reset
> demo data" button wired to `reset()` in `lib/store.ts`, and a read-only
> summary of record counts. Use existing shadcn components. Print the nav entry
> rather than editing the shell.
>
> May touch: `app/(core)/settings/**` only.

## 6. README

> Rewrite `README.md` for `<TOPIC>`: what the product does, the three-step user
> journey from the demo script in `PLAN.md`, how to run it locally, the architecture in five
> bullets, and how GitHub Copilot was used to build it. Under 400 words. No
> badges, no emoji, no invented benchmarks.
>
> May touch: `README.md` only.

## 7. Keyboard and focus pass

> Make the app keyboard-navigable: visible focus rings on every interactive
> element, `aria-label` on every icon-only button, Enter/Space activating
> clickable table rows, and Escape closing the detail Sheet. Do not change any
> visual design beyond focus styling.
>
> May touch: `app/(core)/**`, `components/signature/**`. Must not touch `components/ui/**`.

## 8. Accessibility pass

> Fix accessibility issues across `app/(core)/`: form inputs associated with
> labels, alt text on images, correct heading order (one `h1` per page), and
> `aria-live` on the assistant response region. Report anything you cannot fix
> without a design change instead of guessing.
>
> May touch: `app/(core)/**`.

---

## What NOT to give an agent

- Anything on the demo golden path — you cannot wait 10 minutes for it.
- Anything requiring a `lib/types.ts` change.
- Anything in `app/(feature)/**` while a feature developer is working there.
- Vague quality requests ("make it better", "refactor this") — these produce
  huge unreviewable diffs.
- Adding a dependency. Ever.
