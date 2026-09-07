# Feature folders live here

One folder per feature from the queue in `PLAN.md`, and **one named owner per
folder at a time**. The owner is the only person who writes in it. That single
rule is what keeps two Copilot sessions from colliding at AI speed.

Dev 1 scaffolds every planned feature folder and its nav link at ~T+15, so
by the time you pick a feature off the queue, your page stub and nav entry
already exist. You should never need to touch the shell or routing.

To build one, run the `new-page` prompt with your feature name and the one-line
scope from `PLAN.md`. It copies the closest archetype from `app/(core)/` rather
than generating a page from scratch.

Types only your feature uses go in `app/(feature)/<feature>/types.ts` — not in
`lib/types.ts`, which is for shared shapes only.
