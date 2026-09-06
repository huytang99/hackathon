"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Light/dark handling. `enableSystem` is deliberately off and the default is
 * light: on contest day you do not want the projector deciding whether your
 * demo is in dark mode.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
