# Prep checklist — do this in the week before

Ordered by consequence. The first section is the one that actually decides the
outcome; the rest is hygiene.

---

## 1. The dress rehearsal — higher value than this repo

Do it once. Twice if you can. Nothing else on this list comes close.

Pick a fake topic ("an internal tool for booking meeting rooms"), set a
**90-minute** timer, and run `RUNBOOK.md` for real — real roles, real laptops,
real deploy, real phones.

Success criteria:

- [ ] Live URL deployed within **15 minutes** of the fake topic drop
- [ ] Golden path clickable end to end by the T+45 equivalent
- [ ] At least one cloud-agent PR filed, reviewed **from a phone**, merged clean
- [ ] Both stations' code integrated with **zero type conflicts** — this is the
      thing being tested; it validates `copilot-instructions.md` and the
      ownership map
- [ ] The result does not look like default shadcn (hold it next to a stock
      shadcn screenshot and check honestly)
- [ ] Backup video recorded before time expired
- [ ] Driver rotation happened, and the Timekeeper actually interrupted the lead

Then a 15-minute retro, and fix what broke — in this repo, in the instructions
file, in the runbook. Every problem the rehearsal surfaces is one you would
otherwise pay for at 3x cost on the day.

## 2. Ask the organisers

1. **Is the Copilot coding agent enabled on the org policy?** Highest-value
   answer on this list — it is your third through eighth machine. It ships with
   Business but an admin has to switch it on.
2. Does the company provide an internal LLM / Azure OpenAI endpoint you may use?
   Is GitHub Models permitted on your accounts?
3. Judging rubric and weights? Demo length? Is a live URL acceptable, or must it
   run locally?
4. Submission format and the hard stop time?
5. Is collaboration structure scored — and why 8–9 members for 2 seats?

## 3. Machines (both laptops, not just one)

- [ ] Clone this repo, `npm ci`, confirm `npm run dev` cold-starts under 60s
- [ ] Confirm `npm run verify` passes from a clean clone
- [ ] VS Code + Copilot signed in on **both** seats; confirm agent mode works
- [ ] Check the AI credit balance on both seats and pick default models
- [ ] Node 24 on both machines (`.nvmrc` is committed)
- [ ] Prettier format-on-save enabled on both — prevents whole-file diff churn
- [ ] Git identity configured; push access to the repo proven on both

## 4. Deploy path

- [ ] Vercel project connected to this repo
- [ ] `git push` → live URL proven, and note how long it takes
- [ ] `GITHUB_MODELS_TOKEN` added to Vercel env (see `docs/AI-SETUP.md`)
- [ ] Confirm the deployed URL loads on a **phone on mobile data**

## 5. The Copilot cloud agent — test it for real

- [ ] File one throwaway issue using the **Copilot task** template
- [ ] Assign it to Copilot; confirm a draft PR appears
- [ ] Review that PR **from a phone** and merge it

Do not discover on the day that the policy is off. This is the single most
common way this plan degrades.

## 6. People

- [ ] All 8 added as repo collaborators
- [ ] All 8 roles assigned **by name** in `RUNBOOK.md`
- [ ] Everyone has read `RUNBOOK.md` and `CUT-LADDER.md`
- [ ] Timekeeper appointed deliberately — someone willing to interrupt the lead
- [ ] Both navigators walked through `.github/prompts/` so they know what exists
- [ ] Content owner has used the GitHub web editor on their phone once
- [ ] Someone has recorded a screen video once, so the tool is known

## 7. Design decisions to pre-make

- [ ] Screenshot all three themes side by side; agree which suits which kind of
      topic, so T+10 is a 10-second decision
- [ ] Agree the default theme
- [ ] Rewrite the canned answers in `lib/ai-fallback.ts` to something closer to
      your company's domain, so T+20 is a smaller edit

## 8. Optional

- [ ] Streamlit escape hatch proven: `pip install streamlit pandas altair` and
      `streamlit run escape-hatch/app.py`
- [ ] If you want Spec Kit visible for Copilot-workflow points, install it and
      practise using it on **one narrow non-critical slice**. Never on the
      critical path — the full loop is measured up to 10x slower than iterative
      prompting and is widely reported as overkill below two days of work.

---

## Not worth preparing

- A slide deck template. You will not have a spare laptop for slides.
- Auth, a database layer, Docker, or CI. All banned by the instructions file.
- More than three themes. Choice costs time at T+10.
- Test infrastructure. There is no time to maintain it, and nobody scores it.
