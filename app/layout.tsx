import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/shell/app-shell";
import { ThemeProvider } from "@/components/shell/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * The one server component in the app — it exists only to export `metadata`.
 * Keep it free of logic. Everything interactive lives in AppShell.
 *
 * THEME: change the `theme-*` class on <html> below to restyle the whole app.
 *   theme-ember     warm stone + burnt orange, serif headings, sharp corners
 *   theme-tidal     cool slate + deep teal, geometric headings, round corners
 *   theme-graphite  near-black + acid lime, geometric headings, very sharp
 * Do this once at ~T+10 based on the topic, then leave colour alone.
 */

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Relay — internal requests, tracked end to end",
  description:
    "Every internal request in one place, with an owner, a status and a clock on it.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`theme-ember ${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <TooltipProvider>
            <AppShell>{children}</AppShell>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
