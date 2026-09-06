---
name: Copilot task
about: A fenced, self-contained task to assign to the Copilot coding agent
title: "[agent] "
labels: ["copilot-agent"]
---

<!--
  This template exists because cloud-agent success depends almost entirely on
  issue quality. A vague issue produces a PR you have to throw away, and on
  contest day you cannot afford that.

  Golden rule: only assign PERIPHERAL work. Never the demo golden path — you
  cannot afford to wait on it.
-->

## What to do

<!-- One paragraph. Concrete and observable. -->

## Acceptance criteria

<!-- A checklist someone can verify from a phone in 30 seconds. -->

- [ ]
- [ ]
- [ ] `npm run verify` passes

## Files you MAY touch

<!-- Be explicit. This is what keeps the agent out of the two developers' way. -->

-

## Files you MUST NOT touch

- `lib/types.ts` — the shared contract, owned by the lead
- `app/layout.tsx` and `components/shell/**` — the shell, owned by the lead
- `components/ui/**` — vendored shadcn components
- `package.json` — never add a dependency
- Anything under `app/(feature)/**` — owned by a feature developer, in active use

## Rules

Read `.github/copilot-instructions.md` and follow it exactly. In particular:
SPA mode (`"use client"`, no server actions), theme tokens only (no
`bg-slate-*`, no hex, no `shadow-*` on cards), reuse `components/ui/**`, and do
not add dependencies.

Keep the diff small and reviewable — it will be reviewed on a phone.
