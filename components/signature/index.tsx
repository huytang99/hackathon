"use client";

import { cn } from "@/lib/utils";

/**
 * SIGNATURE ELEMENTS — anti-slop layer, part two.
 *
 * A default shadcn app is a grid of white cards. One distinctive visual element
 * is what makes a judge remember your screen. Pick exactly ONE of these for the
 * hero screen and use it once. Using all three looks worse than using none.
 *
 * All three use theme tokens only, so they restyle themselves when you switch
 * theme class in app/layout.tsx.
 */

/* -------------------------------------------------------------------------- */
/* 1. MeshBackdrop — soft off-centre colour wash behind a hero.               */
/*    Best for: consumer-facing or "product landing" topics.                  */
/* -------------------------------------------------------------------------- */

export function MeshBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="bg-primary/25 absolute -top-32 -left-24 size-[28rem] rounded-full blur-[110px]" />
      <div className="bg-chart-3/25 absolute -top-16 right-0 size-[22rem] rounded-full blur-[100px]" />
      <div className="bg-accent/40 absolute bottom-0 left-1/3 size-[18rem] rounded-full blur-[90px]" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. DisplayStat — oversized numeral. Cheapest high-impact element there is.  */
/*    Best for: data, analytics, efficiency and "we saved X" topics.          */
/* -------------------------------------------------------------------------- */

export function DisplayStat({
  value,
  unit,
  label,
  className,
}: {
  value: string | number;
  unit?: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-baseline gap-1.5">
        <span className="font-heading text-6xl leading-none tabular-nums">{value}</span>
        {unit ? (
          <span className="text-muted-foreground text-2xl leading-none">{unit}</span>
        ) : null}
      </div>
      <p className="text-muted-foreground text-xs tracking-wide uppercase">{label}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. RuledPanel — bordered panel with a ruled header and no shadow.          */
/*    Best for: internal tools, dense data, "serious system" topics.          */
/*    Deliberately the opposite of a floating shadowed card.                  */
/* -------------------------------------------------------------------------- */

export function RuledPanel({
  title,
  aside,
  children,
  className,
}: {
  title: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-border bg-card border", className)}>
      <header className="border-border flex items-center justify-between gap-4 border-b px-5 py-3">
        <h2 className="text-sm font-medium tracking-wide uppercase">{title}</h2>
        {aside}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}
