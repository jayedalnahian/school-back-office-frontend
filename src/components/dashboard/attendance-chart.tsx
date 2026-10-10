"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { day: "রবিবার", present: 815, absent: 25 },
  { day: "সোমবার", present: 828, absent: 12 },
  { day: "মঙ্গলবার", present: 795, absent: 45 },
  { day: "বুধবার", present: 832, absent: 8 },
  { day: "বৃহস্পতিবার", present: 810, absent: 30 },
];

const chartConfig = {
  present: {
    label: "উপস্থিত",
    color: "var(--chart-1)",
  },
  absent: {
    label: "অনুপস্থিত",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function AttendanceChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[260px] w-full">
      <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted/50" />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          className="text-xs fill-muted-foreground font-medium"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          className="text-xs fill-muted-foreground font-medium"
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="present" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="absent" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}

export default AttendanceChart;
