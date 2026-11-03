"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useLanguage } from "@/i18n";

export function AttendanceChart() {
  const { dict } = useLanguage();

  const chartData = React.useMemo(
    () => [
      { day: dict.dashboard.daySun, present: 815, absent: 25 },
      { day: dict.dashboard.dayMon, present: 828, absent: 12 },
      { day: dict.dashboard.dayTue, present: 795, absent: 45 },
      { day: dict.dashboard.dayWed, present: 832, absent: 8 },
      { day: dict.dashboard.dayThu, present: 810, absent: 30 },
    ],
    [dict]
  );

  const chartConfig = React.useMemo(
    () =>
      ({
        present: {
          label: dict.dashboard.presentLabel,
          color: "var(--chart-1)",
        },
        absent: {
          label: dict.dashboard.absentLabel,
          color: "var(--chart-2)",
        },
      } satisfies ChartConfig),
    [dict]
  );

  return (
    <div className="w-full max-w-full min-w-0 space-y-3">
      <ChartContainer
        config={chartConfig}
        className="h-[240px] sm:h-[260px] w-full max-w-full min-w-0 aspect-auto"
      >
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/60" />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={8}
            axisLine={false}
            className="text-[11px] sm:text-xs fill-muted-foreground font-medium"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            className="text-[11px] sm:text-xs fill-muted-foreground font-medium"
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="present" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} maxBarSize={32} />
          <Bar dataKey="absent" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} maxBarSize={32} />
        </BarChart>
      </ChartContainer>

      {/* Clear Visual Legend */}
      <div className="flex items-center justify-center gap-6 pt-2 border-t border-border/50 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--chart-1)]" />
          <span className="font-medium text-foreground">{dict.dashboard.presentAverage}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--chart-2)]" />
          <span className="font-medium text-foreground">{dict.dashboard.absentAverage}</span>
        </div>
      </div>
    </div>
  );
}

export default AttendanceChart;
