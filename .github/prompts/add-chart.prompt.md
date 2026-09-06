---
mode: agent
description: Add a chart that follows the theme instead of fighting it.
---

Add a chart to `${input:file}` showing: ${input:whatItShows}

Read `.github/copilot-instructions.md` first.

Rules specific to charts in this repo:

- Use the shadcn wrapper, not raw recharts: `ChartContainer`, `ChartTooltip`,
  `ChartTooltipContent` from `@/components/ui/chart`, with a `ChartConfig`.
  `app/(core)/insights/page.tsx` is a working example — copy its structure.
- **Colours come from `var(--color-<key>)`** defined by your `ChartConfig`,
  which maps to `--chart-1` … `--chart-5` in `app/globals.css`. Never pass a
  hex code or a Tailwind colour to a recharts prop. This is what keeps charts
  in step when the theme changes.
- Pick the simplest form that answers the question: trend over time is an area
  or line chart, comparison across categories is a bar chart, part-to-whole
  under 6 categories is a labelled bar list — not a pie or donut.
- Axes: `tickLine={false}` and `axisLine={false}`. Grid: horizontal only,
  `strokeDasharray="3 3"`. No 3D, no gradients, no drop shadows.
- Always give `ChartContainer` an explicit height class such as `h-[280px]`,
  otherwise it collapses to zero height.
- Label the axes only when the unit is not obvious from the numbers.
- Wrap it in `RuledPanel` from `@/components/signature` so it matches the app.

Then run `npm run verify`.
