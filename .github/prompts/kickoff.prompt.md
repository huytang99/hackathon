---
mode: agent
description: T+5. Turn the topic and the chosen idea into a filled PLAN.md and the shared types block.
---

The topic is: **${input:topic}**

The idea our team picked is: **${input:idea}**

You have ~150 minutes total, 2 developers with Copilot on 2 laptops, and 6 more
people without keyboards. Read `.github/copilot-instructions.md` and `PLAN.md`
first.

Rewrite `PLAN.md` in place, filling in every section. Do not create any other
file. Do not write any application code yet.

Decide and state, concretely:

1. **One-sentence product**, the user, and the problem. No marketing language.

2. **Exactly three golden-path demo steps.** These are three things a judge
   watches someone click, in order, that together tell the story. Everything we
   build for the next 80 minutes must serve these three steps.

3. **The archetype for each screen we need**, chosen from the table in the
   instructions file (list-detail / dashboard / chat / form-wizard). Say which
   file to copy for each. Two archetypes is our realistic maximum; if the idea
   seems to need three, say which one to drop and why.

4. **The feature queue.** Break the build into **3 to 5 features**, each one
   ownable by a single developer inside a single folder
   (`app/(feature)/<kebab-name>/`), and each independently demoable. Order them
   so that the first two, done alone, still produce a working demo. For each:
   name, folder, one-line scope, and which golden-path step it serves.
   Mark the one feature that most makes the demo impressive.

5. **The shared types block.** Print the TypeScript for `lib/types.ts` —
   **shared types only**, meaning types more than one feature touches. Usually
   one core entity, a status union, and the store surface. Aim for under 25
   lines. Explicitly list which types you are deliberately leaving out because
   they belong to a single feature. Do not edit `lib/types.ts` — print it for
   Dev 1 to paste.

6. **Runtime AI: yes or no.** Does the app itself need to call a model while a
   user is using it? If no, say which files to delete
   (`app/api/ai/route.ts`, `lib/ai.ts`, `lib/ai-fallback.ts`,
   `app/(core)/assistant/`).

7. **Theme.** Pick one: `theme-ember` (warm, serif, sharp — editorial,
   human, internal-tools), `theme-tidal` (cool, geometric, round — calm,
   technical, data), `theme-graphite` (near-black + acid lime, very sharp —
   dense, serious, high-contrast). One line of justification.

8. **The one screen a judge screenshots**, and which feature builds it.

9. **Out of scope.** Be aggressive. Auth, persistence, multi-user, editing and
   deleting, settings, and anything outside the three golden-path steps.

Constraints on your answer:

- Concrete over complete. A decision we can act on beats a survey of options.
- Never propose a database, auth, Docker, a second service, or a new dependency.
- If the topic is genuinely a data-analysis task (here is a dataset, find the
  insight) rather than a product, say so plainly and recommend
  `escape-hatch/app.py` instead.
