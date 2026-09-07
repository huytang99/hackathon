import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * EXECUTABLE GUARDRAILS.
 *
 * The rules in .github/copilot-instructions.md are requests — a model can
 * ignore them, and under time pressure with a fresh session it will. The rules
 * below are the same constraints expressed as build failures, so they hold
 * whether or not anyone read the instructions.
 *
 * Error messages are written to be read by an agent: each one says what to do
 * instead, not just what went wrong.
 */

// Tailwind palette names that must never appear — colour comes from theme
// tokens in app/globals.css so a theme switch restyles everything at once.
const PALETTE =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";

const COLOR_PREFIX =
  "bg|text|border|ring|from|via|to|fill|stroke|divide|outline|placeholder|caret|decoration";

// e.g. bg-slate-100, text-blue-600, border-gray-200
const RAW_PALETTE = String.raw`\b(?:${COLOR_PREFIX})-(?:${PALETTE})-(?:50|[1-9]00|950)\b`;

// e.g. bg-white, text-black
const RAW_BW = String.raw`\b(?:${COLOR_PREFIX})-(?:white|black)\b`;

// shadow-sm ... shadow-2xl. shadow-none is fine.
const SHADOW = String.raw`\bshadow-(?:xs|sm|md|lg|xl|2xl)\b`;

const COLOR_MESSAGE =
  "Raw Tailwind colour class. Use a theme token instead (bg-background, bg-card, bg-primary, bg-muted, bg-accent, text-foreground, text-muted-foreground, border-border, text-destructive, bg-chart-1..5). Raw palette classes do not follow the theme, so switching theme leaves them behind.";

const SHADOW_MESSAGE =
  "Shadow utility. Use `border` instead. Shadowed cards and panels are the clearest visual tell of generated UI, so they are banned outside components/ui.";

function restrict(pattern, message) {
  return [
    { selector: `Literal[value=/${pattern}/]`, message },
    { selector: `TemplateElement[value.raw=/${pattern}/]`, message },
  ];
}

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),

  {
    name: "hack-starter/guardrails",
    files: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}"],
    rules: {
      // Rule 4 — theme tokens only.
      "no-restricted-syntax": [
        "error",
        ...restrict(RAW_PALETTE, COLOR_MESSAGE),
        ...restrict(RAW_BW, COLOR_MESSAGE),
        ...restrict(SHADOW, SHADOW_MESSAGE),
      ],

      // Rule 1 — SPA mode. These imports only work in server components and
      // are the main way App Router burns time in a short build.
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/headers",
              message:
                "SPA mode: this app has no server components with logic. Read data from lib/store.ts on the client instead.",
            },
            {
              name: "next/cache",
              message:
                "SPA mode: no revalidatePath/revalidateTag. State lives in the client store (lib/store.ts), so there is no server cache to invalidate.",
            },
          ],
        },
      ],
    },
  },

  {
    // Vendored shadcn components. Not ours to restyle, and they legitimately
    // use shadow utilities.
    name: "hack-starter/vendored-ui",
    files: ["components/ui/**"],
    rules: {
      "no-restricted-syntax": "off",
    },
  },
]);

export default eslintConfig;
