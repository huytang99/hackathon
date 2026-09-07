---
mode: agent
description: Get main green again, with the smallest possible change.
---

`npm run verify` is failing. Get it passing again.

Run it, read the actual error, and fix the root cause with the **smallest
possible change**. Under time pressure the temptation is to refactor around a
type error — do not. A red `main` blocks Dev 2, so speed matters
more than elegance here.

Constraints:

- Never add a dependency to fix a build error.
- Never widen a type to `any` or add `@ts-expect-error` unless you say clearly
  that it is a deliberate stopgap.
- Never delete a feature to make the build pass. If a file is genuinely broken
  beyond quick repair, say so and stop rather than removing it.
- Never edit `lib/types.ts` — if the fix belongs there, print the change and stop.
- Do not reformat files you are not fixing. It makes the diff unreviewable and
  causes conflicts with the other station.

Report: what broke, the one-line cause, and what you changed.
