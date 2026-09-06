# SPEC — fill in at T+8, ten lines, then stop

This replaces a full spec-driven-development toolchain on purpose. A one-page
hand-written spec committed to the repo gives Copilot ~90% of the context
benefit at ~10% of the time cost. Running `/speckit.specify` → `.plan` →
`.tasks` → `.implement` in a 150-minute window means ~40 minutes of markdown
before any code runs, and practitioners measure the full loop at up to 10x
slower than iterative prompting. Do not do it here.

Keep this file short. Both Copilot sessions read it, and a long spec dilutes it.

---

**Product, one sentence**
> ...

**Who uses it**
> ...

**The problem, one sentence**
> ...

**The three golden-path steps** (also go in `DEMO.md`; nothing outside these gets built)
> 1. ...
> 2. ...
> 3. ...

**Entities** (these become `lib/types.ts` — lead writes it immediately after this)
> ...

**Explicitly out of scope**
> Authentication. Persistence beyond the browser session. Multi-user. Mobile
> layout. Editing and deleting. Settings. Anything not in the three steps above.

**The one screen a judge screenshots**
> ...

---

## Station assignments

| | Owner | Building | Directories |
| --- | --- | --- | --- |
| Station A | (lead) | the spine: shell, routing, types, data, integration, deploy | `app/layout.tsx`, `app/(core)/**`, `lib/**`, `data/**`, `components/shell/**` |
| Station B | | the hook: the one feature that makes the demo impressive | `app/(feature)/**`, `components/feature/**` |
