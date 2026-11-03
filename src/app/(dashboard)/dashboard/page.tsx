"use client";

import * as React from "react";
import Link from "next/link";
import {
  Building2,
  GraduationCap,
  UserCheck,
  CheckCircle2,
  Layers,
  TrendingUp,
  UserPlus,
  CalendarCheck,
  CalendarDays,
  Award,
  ArrowRight,
  Bell,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AttendanceChart } from "@/components/dashboard/attendance-chart";
import { useLanguage } from "@/i18n";

export default function DashboardPage() {
  const { dict } = useLanguage();

  return (
    <div className="space-y-5 sm:space-y-6 w-full min-w-0 max-w-full overflow-hidden">
      {/* 1. Page Title & Executive Header Banner */}
      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              <span className="text-xs font-semibold text-primary dark:text-sky-400">
                {dict.dashboard.badge}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground font-sans tracking-normal">
              {dict.dashboard.title}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              {dict.dashboard.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-1 lg:pt-0">
            <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground">
              <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{dict.dashboard.todayDate}</span>
            </div>
            <Link href="/schools">
              <Button
                size="sm"
                className="gap-2 text-xs font-semibold shadow-xs"
              >
                <Building2 className="h-3.5 w-3.5" />
                {dict.dashboard.schoolDirectoryButton}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Metric KPI Cards Grid */}
      <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4 min-w-0">
        {/* Metric 1: Total Students */}
        <div className="rounded-lg border border-border bg-card p-4 sm:p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-0.5 bg-blue-600 dark:bg-blue-500" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              {dict.dashboard.totalStudents}
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/60">
              <GraduationCap className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-foreground font-sans">
              {dict.dashboard.totalStudentsCount}
            </div>
            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="inline-flex items-center font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded text-[11px]">
                <TrendingUp className="mr-0.5 h-3 w-3" /> {dict.dashboard.growthRate}
              </span>
              <span>{dict.dashboard.comparedToLastYear}</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Teachers & Staff */}
        <div className="rounded-lg border border-border bg-card p-4 sm:p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-0.5 bg-indigo-600 dark:bg-indigo-500" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              {dict.dashboard.teachersStaff}
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-900/60">
              <UserCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-foreground font-sans">
              {dict.dashboard.teachersStaffCount}
            </div>
            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="inline-flex items-center font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded text-[11px]">
                {dict.dashboard.teachersPresentToday}
              </span>
            </div>
          </div>
        </div>

        {/* Metric 3: Today's Attendance */}
        <div className="rounded-lg border border-border bg-card p-4 sm:p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-0.5 bg-emerald-600 dark:bg-emerald-500" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              {dict.dashboard.todayAttendance}
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/60">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-foreground font-sans">
              {dict.dashboard.todayAttendanceRate}
            </div>
            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>{dict.dashboard.attendancePresentDetail}</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Active Sections */}
        <div className="rounded-lg border border-border bg-card p-4 sm:p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-0.5 bg-amber-600 dark:bg-amber-500" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              {dict.dashboard.activeSections}
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/60">
              <Layers className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-foreground font-sans">
              {dict.dashboard.activeSectionsCount}
            </div>
            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>{dict.dashboard.classesRange}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Quick Actions */}
      <div className="rounded-lg border border-border bg-card shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-border bg-muted/20 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-foreground">
              {dict.dashboard.quickActions}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {dict.dashboard.quickActionsSub}
            </p>
          </div>
          <span className="hidden sm:inline-block text-[11px] font-medium text-muted-foreground bg-background px-2 py-0.5 rounded border border-border">
            {dict.dashboard.quickActionsCount}
          </span>
        </div>
        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Link
              href="/enrollments"
              className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-md border border-border bg-background hover:bg-muted/40 hover:border-primary/40 transition-colors text-center group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/60">
                <UserPlus className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                {dict.dashboard.newAdmission}
              </span>
            </Link>

            <Link
              href="/attendances"
              className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-md border border-border bg-background hover:bg-muted/40 hover:border-primary/40 transition-colors text-center group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/60">
                <CalendarCheck className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                {dict.dashboard.takeAttendance}
              </span>
            </Link>

            <Link
              href="/routines"
              className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-md border border-border bg-background hover:bg-muted/40 hover:border-primary/40 transition-colors text-center group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-900/60">
                <CalendarDays className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                {dict.dashboard.classRoutine}
              </span>
            </Link>

            <Link
              href="/evaluations"
              className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-md border border-border bg-background hover:bg-muted/40 hover:border-primary/40 transition-colors text-center group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/60">
                <Award className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                {dict.dashboard.evaluationsResults}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Charts & Notice Board Grid */}
      <div className="grid gap-5 lg:grid-cols-7 min-w-0">
        {/* Attendance Chart (4 columns on lg) */}
        <div className="rounded-lg border border-border bg-card shadow-xs lg:col-span-4 min-w-0 overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-foreground">
                {dict.dashboard.weeklyAttendanceReport}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {dict.dashboard.weeklyAttendanceReportSub}
              </p>
            </div>
            <span className="text-[11px] font-medium text-muted-foreground bg-background px-2 py-0.5 rounded border border-border w-fit">
              {dict.dashboard.weekdaysRange}
            </span>
          </div>
          <div className="p-4 sm:p-5">
            <AttendanceChart />
          </div>
        </div>

        {/* Notices & Activities Card (3 columns on lg) */}
        <div className="rounded-lg border border-border bg-card shadow-xs lg:col-span-3 flex flex-col justify-between min-w-0 overflow-hidden">
          <div>
            <div className="p-4 sm:p-5 border-b border-border bg-muted/20 flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-bold text-foreground">
                  {dict.dashboard.latestNotices}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {dict.dashboard.latestNoticesSub}
                </p>
              </div>
              <Bell className="h-4 w-4 text-muted-foreground shrink-0" />
            </div>

            <div className="p-4 sm:p-5 space-y-3">
              <div className="rounded-md border border-border border-l-2 border-l-blue-600 bg-muted/20 p-3 space-y-1">
                <div className="flex items-center justify-between gap-1 text-xs">
                  <span className="text-[10px] font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-1.5 py-0.5 rounded">
                    {dict.dashboard.academicTag}
                  </span>
                  <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                    <Clock className="h-3 w-3" /> {dict.dashboard.timeToday}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-foreground leading-snug">
                  {dict.dashboard.notice1Title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {dict.dashboard.notice1Desc}
                </p>
              </div>

              <div className="rounded-md border border-border border-l-2 border-l-emerald-600 bg-muted/20 p-3 space-y-1">
                <div className="flex items-center justify-between gap-1 text-xs">
                  <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded">
                    {dict.dashboard.admissionTag}
                  </span>
                  <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                    <Clock className="h-3 w-3" /> {dict.dashboard.timeYesterday}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-foreground leading-snug">
                  {dict.dashboard.notice2Title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {dict.dashboard.notice2Desc}
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 border-t border-border bg-muted/10">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-between text-xs font-semibold text-primary hover:text-primary hover:bg-primary/5 h-8"
            >
              <span>{dict.dashboard.viewAllNotices}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
