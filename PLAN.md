# PLAN

**The only file the team fills in on contest day.** Generated at T+5 by running
the `kickoff` prompt, then corrected by humans. Both Copilot sessions read it,
so keep it short — a long plan dilutes the context rather than enriching it.

Everything below is placeholder until the kickoff prompt fills it in.

---

## 1. The product

**One sentence:** ...

**Who uses it:** ...

**The problem:** ...

## 2. Golden path — exactly three steps

Everything we build serves these three clicks. **Not one of these three → not
built.** This is the sentence the Timekeeper enforces at T+45 and T+70.

1. ...
2. ...
3. ...

## 3. Screens and archetypes

| Screen | Archetype | Copy from |
| --- | --- | --- |
| | | |

## 4. Feature queue

Features are a **queue, not an assignment**. Whoever frees up takes the next
unclaimed row. One owner per folder at a time; the owner is the only person who
writes in it.

| # | Feature | Folder | Serves step | Owner | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | | `app/(feature)/` | | | |
| 2 | | `app/(feature)/` | | | |
| 3 | | `app/(feature)/` | | | |
| 4 | | `app/(feature)/` | | | |

**The showpiece feature:** ..... ← polish this one most

Ordering rule: features 1 and 2 alone must still produce a working demo.
Everything after that is upside.

## 5. Shared types

Paste the block from the kickoff prompt into `lib/types.ts`. **Shared types
only** — anything one feature owns lives in that feature's folder.

Deliberately left out of `lib/types.ts` (feature-local):

- ...

Amendments during the build (lead pastes, then pushes — expect several):

- [ ] ...

## 6. Runtime AI

Needed: **yes / no**

If no, delete: `app/api/ai/route.ts`, `lib/ai.ts`, `lib/ai-fallback.ts`,
`app/(core)/assistant/`.

If yes, rewrite the canned answers in `lib/ai-fallback.ts` at ~T+30 so they read
like real output for this topic. See `docs/AI-SETUP.md`.

## 7. Theme

Chosen: `theme-......` — set on `<html>` in `app/layout.tsx`. Decide once.

## 8. The screenshot

The one screen a judge will capture: .....

Built by feature #....., polished from T+90.

## 9. Out of scope

Auth. Persistence beyond the browser session. Multi-user. Editing and deleting.
Settings. Admin. Anything outside the three golden-path steps.

Plus: ...

---

# DEMO SCRIPT

Owned by the Demo Owner. Written at T+15, not T+120.

**Opening line** (15 seconds, memorised — no agenda slide, no architecture
diagram, no introductions; open on the hero screen with real data loaded):

> Today, [who] has to [painful thing], which takes [time]. We built [name],
> which does it in [much less]. Here it is working.

**Step 1** — say: ..... · click: ..... · they notice: .....

**Step 2** — say: ..... · click: ..... · they notice: .....

**Step 3** — say: ..... · click: ..... · they notice: .....

**Closing line:**

> That is running live at [URL] right now, built in two and a half hours with
> GitHub Copilot doing [the specific thing]. Happy to take questions.

## Pre-demo checklist — run at T+105 and again at T+130

- [ ] Live URL loads from a **cold** browser profile (no cache, not logged in)
- [ ] Loads on a **phone on mobile data**, not just the venue wifi
- [ ] Zoom 100%, bookmarks hidden, notifications silenced, light mode
- [ ] Demo tab is the only tab open — no localhost tab anywhere
- [ ] No placeholder data visible on the hero screen
- [ ] All three steps work, twice in a row
- [ ] **Backup video recorded and saved locally** (not streaming from cloud)
- [ ] Someone other than the Demo Owner has run the path once

## If it breaks live

Do not debug on stage. Do not open devtools. Say *"that is the live build — let
me show you the recorded run"*, play the backup video, keep talking. Under ten
seconds. Rehearse this too.

**Backup video:** recorded at T+..... by ..... → local path .....
