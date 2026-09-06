---
mode: agent
description: Generate realistic seed data. The single highest-value polish task.
---

Replace the contents of `data/seed.json` with realistic data for this domain:
${input:domain}

This matters more than it looks. Generic placeholder data is the clearest tell
that an app was generated, and realistic data is the cheapest way to make a
demo look like a product. Judges notice.

Rules:

- Match the shapes in `lib/types.ts` exactly. Run `npm run typecheck` after.
- 20 to 24 records. Enough to fill a table and make filters feel real.
- **Never** "Item 1", "Task 2", "Test", "Example", "Foo", or lorem ipsum.
- Names: real-sounding full names from a mix of backgrounds. Reuse the same
  6 to 8 people across records so it looks like one organisation.
- Titles: specific and concrete. "Warehouse scanner firmware rollback", not
  "Hardware issue".
- Descriptions: one or two sentences that state impact and frequency. Include a
  number where you can — "60+ tickets a month", "median wait was 11 days".
- Numbers: varied and non-round. 12,400 not 10,000. Never all the same magnitude.
- Dates: ISO strings spread over the last 8 weeks, not all the same day.
- Distribute statuses unevenly so charts and filters look natural.
- Also set `appName` to something short and pronounceable, and `appTagline` to
  one plain sentence a real user would recognise.

Do not touch any other file.
