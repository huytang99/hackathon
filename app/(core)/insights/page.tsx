"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/shell/app-shell";
import { RuledPanel } from "@/components/signature";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useStore } from "@/lib/store";
import type { Status } from "@/lib/types";
import { STATUSES } from "@/lib/types";

/**
 * ARCHETYPE: DASHBOARD
 * Use for any topic about trends, totals, throughput or health.
 * Covers: metric tiles with deltas, an area chart, a breakdown bar.
 *
 * Chart colours come from --chart-1..5 in globals.css, so they follow the theme.
 * Never hard-code a colour in a chart.
 */

const chartConfig = {
  value: { label: "Raised", color: "var(--chart-1)" },
  secondary: { label: "Closed", color: "var(--chart-3)" },
} satisfies ChartConfig;

export default function InsightsPage() {
  const { metrics, series, items } = useStore();

  const byStatus = STATUSES.map((status) => ({
    status,
    count: items.filter((item) => item.status === status).length,
  }));

  return (
    <>
      <PageHeader
        title="Insights"
        description="Throughput and ageing across the last seven months."
      />

      <div className="border-border mb-8 grid divide-y border sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
        {metrics.map((metric) => {
          const improving = metric.delta < 0 === metric.label.toLowerCase().includes("time");
          const Icon = metric.delta >= 0 ? TrendingUp : TrendingDown;

          return (
            <div key={metric.id} className="space-y-2 p-5">
              <p className="text-muted-foreground text-xs tracking-wide uppercase">
                {metric.label}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-4xl leading-none tabular-nums">
                  {metric.value}
                </span>
                {metric.unit ? (
                  <span className="text-muted-foreground text-lg">{metric.unit}</span>
                ) : null}
              </div>
              <p
                className={
                  improving
                    ? "text-muted-foreground flex items-center gap-1 text-xs"
                    : "text-destructive flex items-center gap-1 text-xs"
                }
              >
                <Icon className="size-3" />
                {Math.abs(metric.delta)}% vs last month
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <RuledPanel
          title="Raised vs closed"
          className="lg:col-span-2"
          aside={<Badge variant="outline">7 months</Badge>}
        >
          <ChartContainer config={chartConfig} className="h-[280px] w-full">
            <AreaChart data={series} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={10} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                dataKey="value"
                type="monotone"
                fill="var(--color-value)"
                fillOpacity={0.18}
                stroke="var(--color-value)"
                strokeWidth={2}
              />
              <Area
                dataKey="secondary"
                type="monotone"
                fill="var(--color-secondary)"
                fillOpacity={0.12}
                stroke="var(--color-secondary)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </RuledPanel>

        <RuledPanel title="By status">
          <ul className="space-y-4">
            {byStatus.map(({ status, count }) => {
              const share = items.length === 0 ? 0 : Math.round((count / items.length) * 100);

              return (
                <li key={status} className="space-y-1.5">
                  <div className="flex items-baseline justify-between text-sm">
                    <span>{status}</span>
                    <span className="text-muted-foreground tabular-nums">
                      {count} · {share}%
                    </span>
                  </div>
                  <div className="bg-muted h-1.5 w-full overflow-hidden">
                    <div
                      className={barTone(status)}
                      style={{ width: `${Math.max(share, 2)}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </RuledPanel>
      </div>
    </>
  );
}

function barTone(status: Status): string {
  const tones: Record<Status, string> = {
    new: "h-full bg-chart-3",
    active: "h-full bg-chart-1",
    blocked: "h-full bg-destructive",
    done: "h-full bg-chart-4",
  };
  return tones[status];
}
