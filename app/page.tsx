"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DisplayStat, MeshBackdrop } from "@/components/signature";
import { useStore } from "@/lib/store";

/**
 * THE HERO SCREEN. This is the one a judge screenshots, so it gets polished
 * first and most. Uses exactly one signature element (MeshBackdrop).
 */

const ARCHETYPES = [
  {
    href: "/requests",
    name: "List + detail",
    when: "Anything about browsing or managing records.",
  },
  { href: "/insights", name: "Dashboard", when: "Anything about trends, totals or health." },
  { href: "/assistant", name: "Chat", when: "Anything conversational or AI-assisted." },
  {
    href: "/submit",
    name: "Form wizard",
    when: "Anything about intake, applications or setup.",
  },
];

export default function HomePage() {
  const { appName, appTagline, metrics } = useStore();

  return (
    <div className="space-y-16">
      <section className="relative -mx-6 -mt-10 overflow-hidden px-6 pt-20 pb-16">
        <MeshBackdrop />
        <div className="relative max-w-2xl space-y-5">
          <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase">{appName}</p>
          <h1 className="text-5xl leading-[1.05] text-balance">{appTagline}</h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Requests arrive from six depots and three back-office teams. Every one gets an
            owner, a status and a clock on it — so nothing waits nine days for a signature
            again.
          </p>
          <div className="flex gap-3 pt-2">
            <Button asChild>
              <Link href="/requests">
                Open the queue <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/insights">See the numbers</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-border grid gap-10 border-y py-10 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <DisplayStat
            key={metric.id}
            value={metric.value}
            unit={metric.unit}
            label={metric.label}
          />
        ))}
      </section>

      {/*
        DELETE THIS SECTION AT ~T+12 ON CONTEST DAY.
        It is a signpost for the team, not part of any product.
      */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg">Starter archetypes</h2>
          <p className="text-muted-foreground text-sm">
            Copy the closest one into <code className="font-mono text-xs">app/(feature)/</code>{" "}
            and adapt it. Delete the rest, and delete this section.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {ARCHETYPES.map((archetype) => (
            <Link
              key={archetype.href}
              href={archetype.href}
              className="border-border hover:bg-accent/40 group flex items-start justify-between gap-4 border p-4 transition-colors"
            >
              <div className="space-y-0.5">
                <p className="text-sm font-medium">{archetype.name}</p>
                <p className="text-muted-foreground text-xs">{archetype.when}</p>
              </div>
              <ArrowRight className="text-muted-foreground mt-0.5 size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
