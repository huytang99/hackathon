"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shell/theme-toggle";

/**
 * The app frame: wordmark, primary nav, theme toggle, content well.
 *
 * The lead owns this file. If a feature developer needs a nav entry, they ask — a
 * second person editing the nav is the most common merge conflict there is.
 *
 * On contest day: edit NAV to match the topic, delete the entries you are not
 * building, and change the wordmark in data/seed.json (appName).
 */

const NAV = [
  { href: "/", label: "Overview" },
  { href: "/requests", label: "Requests" },
  { href: "/insights", label: "Insights" },
  { href: "/assistant", label: "Assistant" },
  { href: "/submit", label: "Submit" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const appName = useStore((s) => s.appName);

  return (
    <div className="flex min-h-full flex-col">
      <header className="border-border bg-background/85 sticky top-0 z-40 border-b backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-6 px-6">
          <Link href="/" className="flex items-baseline gap-1.5">
            <span className="font-heading text-xl leading-none">{appName}</span>
            <span className="bg-primary size-1.5 translate-y-[-2px] rounded-full" />
          </Link>

          <nav className="flex items-center gap-1">
            {NAV.map((entry) => {
              const active =
                entry.href === "/" ? pathname === "/" : pathname.startsWith(entry.href);

              return (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className={cn(
                    "rounded-md px-2.5 py-1.5 text-sm transition-colors",
                    active
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {entry.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">{children}</main>

      <footer className="border-border border-t">
        <div className="text-muted-foreground mx-auto w-full max-w-6xl px-6 py-5 text-xs">
          Built with GitHub Copilot
        </div>
      </footer>
    </div>
  );
}

/** Standard page header. Use this on every page so spacing stays consistent. */
export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex items-start justify-between gap-6">
      <div className="space-y-1.5">
        <h1 className="text-3xl">{title}</h1>
        {description ? <p className="text-muted-foreground text-sm">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
