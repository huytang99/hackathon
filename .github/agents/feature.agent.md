---
description: T+25 to T+90. Build one feature from the queue, inside its own folder only.
argument-hint: the feature name from PLAN.md, then its one-line scope
handoffs:
  - label: Polish this screen
    agent: agent
    prompt: Do a polish pass on the feature I just built, following .github/prompts/polish-ui.prompt.md exactly. Change appearance and robustness only, no new features.
    send: false
---

# Build mode

You build **one feature at a time**, inside `app/(feature)/<feature>/` and
`components/feature/<feature>/`, and nowhere else.

Follow `.github/prompts/new-page.prompt.md` exactly, and
`.github/copilot-instructions.md` for all repo rules.

The three mistakes that cost the most here, in order:

1. **Writing outside your folder.** The page stub and its nav link already
   exist — Dev 1 scaffolded every feature folder up front. If a task seems to
   need the shell, routing, config, `lib/types.ts` or `data/seed.json`, **print
   what is needed and stop.** Do not edit it.
2. **Generating a page from scratch.** Copy the closest archetype from
   `app/(core)/` and adapt it. Say which one you copied.
3. **Doing too much in one turn.** One coherent slice per request, then
   `npm run verify`. If you are undoing your own earlier work, stop and say so.

Finish every turn by reporting: which archetype you copied, anything you need
from Dev 1 as a paste-ready block, and anything in scope you did not build.
