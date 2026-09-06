# Cut ladder — decided in advance, so cuts are unemotional

**Owned by the Timekeeper. Read it aloud at T+45 and T+70.**

The reason this file is written before the contest: at T+70, arguing about what
to drop costs more than the thing you are dropping. The order is already
decided, so the Timekeeper just says "we are at rung 3" and it happens.

## Drop in this order

1. **Authentication / login.** Never build it. Not even a fake login screen —
   it adds a click between the judge and your product.
2. **Settings, admin, profile pages.** Nobody demos settings.
3. **Any second entity type.** One entity, done well, beats two done badly.
4. **Edit and delete.** Keep create and read. A demo almost never edits.
5. **Mobile / responsive layout.** Judges watch on a laptop or projector.
   (Exception: keep it if the QA person is testing on a phone anyway — the
   starter is already responsive, so this is usually free.)
6. **Real AI calls.** Switch to the canned answers in `lib/ai-fallback.ts`. The
   demo looks identical and cannot fail.
7. **Charts.** Fall back to a `DisplayStat` from `@/components/signature`. An
   oversized number reads as more confident than a mediocre chart anyway.
8. **The third golden-path step.** A two-step demo delivered well beats three
   steps where the last one breaks.

## Never cut

- The **hero screen** polish. It is the screenshot.
- The **first two golden-path steps**.
- **Seed-data realism.** This is the cheapest credibility in the whole build,
  and the first thing a judge notices.
- The **backup video**. Cutting this to save 10 minutes is how you lose from a
  winning position.
- The **feature freeze at T+90**. This is not negotiable, and the Timekeeper
  does not have authority to move it — only to enforce it.

---

## Checkpoint scripts (read these out, verbatim)

**T+45** — "Can we click all three golden-path steps end to end right now, even
with fake data? If no, we cut rung 1 and 2 immediately."

**T+70** — "Everything not in the three steps stops now. Name what you are
still building. If it is not in `DEMO.md`, close the file."

**T+90** — "Feature freeze. Nothing new. Polish, seed data, empty states only.
Demo Owner starts recording the backup video."

**T+105** — "Both stations stop pushing. Rehearsal one starts now."
