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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AttendanceChart } from "@/components/dashboard/attendance-chart";

export default function DashboardPage() {
  return (
    <div className="space-y-6 sm:space-y-7 w-full min-w-0 max-w-full overflow-hidden">
      {/* 1. Page Title & Executive Welcome Banner */}
      <div className="relative rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-primary/5 p-5 sm:p-7 shadow-xs overflow-hidden">
        {/* Subtle decorative background watermarks */}
        <div className="pointer-events-none absolute -right-6 -bottom-6 h-40 w-40 rounded-full bg-primary/5 blur-2xl" />
        
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
              <span className="text-xs font-semibold tracking-wide uppercase text-primary dark:text-sky-400">
                প্রাতিষ্ঠানিক নিয়ন্ত্রণ কক্ষ • Executive Dashboard
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground font-sans leading-tight">
              স্বাগতম, প্রধান শিক্ষক ও অ্যাডমিন
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
              বিদ্যালয়ের সার্বিক একাডেমিক অগ্রগতি, শিক্ষার্থী হাজিরা এবং প্রাতিষ্ঠানিক প্রশাসনিক তথ্য পর্যবেক্ষণ করুন
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-1 lg:pt-0">
            <Link href="/schools">
              <Button
                size="sm"
                className="h-9.5 gap-2 text-xs font-semibold shadow-xs bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Building2 className="h-4 w-4" />
                বিদ্যালয় তালিকা ও অনবোর্ডিং
              </Button>
            </Link>
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-background/90 px-3 py-2 text-xs font-medium text-foreground shadow-2xs">
              <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
              <span>১০ অক্টোবর ২০২৬</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Metric KPI Cards Grid */}
      <div className="grid gap-3.5 sm:gap-4.5 sm:grid-cols-2 lg:grid-cols-4 min-w-0">
        {/* Metric 1: Total Students */}
        <Card className="border-border/80 shadow-xs hover:shadow-md hover:border-sky-500/40 transition-all duration-200 min-w-0 overflow-hidden bg-card relative">
          <div className="absolute top-0 inset-x-0 h-1 bg-sky-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-4 sm:p-5">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
              মোট শিক্ষার্থী
            </CardTitle>
            <div className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 ring-1 ring-sky-500/20">
              <GraduationCap className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 pt-0 sm:pt-0">
            <div className="text-2xl sm:text-3xl font-bold text-foreground font-sans tracking-normal">৮৪০ জন</div>
            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <span className="inline-flex items-center text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full text-[11px]">
                <TrendingUp className="mr-0.5 h-3 w-3 shrink-0" /> +৪.৫%
              </span>
              <span>গত শিক্ষাবর্ষের তুলনায়</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 2: Teachers & Staff */}
        <Card className="border-border/80 shadow-xs hover:shadow-md hover:border-indigo-500/40 transition-all duration-200 min-w-0 overflow-hidden bg-card relative">
          <div className="absolute top-0 inset-x-0 h-1 bg-indigo-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-4 sm:p-5">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
              শিক্ষক ও কর্মী
            </CardTitle>
            <div className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-500/20">
              <UserCheck className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 pt-0 sm:pt-0">
            <div className="text-2xl sm:text-3xl font-bold text-foreground font-sans tracking-normal">৩৬ জন</div>
            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <span className="inline-flex items-center text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full text-[11px]">
                ৩২ জন
              </span>
              <span>আজ উপস্থিত আছেন</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 3: Today's Attendance */}
        <Card className="border-border/80 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all duration-200 min-w-0 overflow-hidden bg-card relative">
          <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-4 sm:p-5">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
              আজকের সামগ্রিক হাজিরা
            </CardTitle>
            <div className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 pt-0 sm:pt-0">
            <div className="text-2xl sm:text-3xl font-bold text-foreground font-sans tracking-normal">৯৬.২%</div>
            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <span className="text-foreground font-semibold">৮০৮ জন</span>
              <span>শিক্ষার্থী উপস্থিত</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 4: Active Sections */}
        <Card className="border-border/80 shadow-xs hover:shadow-md hover:border-amber-500/40 transition-all duration-200 min-w-0 overflow-hidden bg-card relative">
          <div className="absolute top-0 inset-x-0 h-1 bg-amber-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-4 sm:p-5">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
              সক্রিয় একাডেমিক শাখা
            </CardTitle>
            <div className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20">
              <Layers className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 pt-0 sm:pt-0">
            <div className="text-2xl sm:text-3xl font-bold text-foreground font-sans tracking-normal">১৮ টি</div>
            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <span>১ম থেকে ৫ম শ্রেণি পর্যন্ত</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Quick Actions Bar */}
      <Card className="border-border/80 bg-card shadow-xs min-w-0 overflow-hidden">
        <CardHeader className="p-4 sm:p-5 pb-3 border-b border-border/70 bg-muted/20">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm sm:text-base font-bold text-foreground">
                দ্রুত কার্যক্রম (Quick Actions)
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                দৈনন্দিন নিয়মিত প্রাতিষ্ঠানিক কার্যক্রম দ্রুত সম্পাদন করুন
              </CardDescription>
            </div>
            <span className="hidden sm:inline-block text-[11px] font-medium text-muted-foreground bg-background px-2.5 py-1 rounded-md border border-border/70">
              ৪টি অ্যাকশন উপলব্ধ
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-5">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
            <Button
              asChild
              variant="outline"
              className="h-auto flex-col items-center justify-center gap-2.5 p-4 text-xs font-semibold hover:border-sky-500/50 hover:bg-sky-500/5 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-150 min-w-0 rounded-xl border-border/80 bg-background/60"
            >
              <Link href="/enrollments" className="w-full truncate text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 ring-1 ring-sky-500/20">
                  <UserPlus className="h-5 w-5" />
                </div>
                <span className="truncate font-semibold text-foreground">নতুন ভর্তি</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto flex-col items-center justify-center gap-2.5 p-4 text-xs font-semibold hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-150 min-w-0 rounded-xl border-border/80 bg-background/60"
            >
              <Link href="/attendances" className="w-full truncate text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20">
                  <CalendarCheck className="h-5 w-5" />
                </div>
                <span className="truncate font-semibold text-foreground">হাজিরা গ্রহণ</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto flex-col items-center justify-center gap-2.5 p-4 text-xs font-semibold hover:border-indigo-500/50 hover:bg-indigo-500/5 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-150 min-w-0 rounded-xl border-border/80 bg-background/60"
            >
              <Link href="/routines" className="w-full truncate text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-500/20">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <span className="truncate font-semibold text-foreground">ক্লাস রুটিন</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto flex-col items-center justify-center gap-2.5 p-4 text-xs font-semibold hover:border-amber-500/50 hover:bg-amber-500/5 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-150 min-w-0 rounded-xl border-border/80 bg-background/60"
            >
              <Link href="/evaluations" className="w-full truncate text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20">
                  <Award className="h-5 w-5" />
                </div>
                <span className="truncate font-semibold text-foreground">মূল্যায়ন ও রেজাল্ট</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 4. Charts & Highlights Grid */}
      <div className="grid gap-6 lg:grid-cols-7 min-w-0">
        {/* Attendance Chart (4 columns on lg) */}
        <Card className="border-border/80 lg:col-span-4 min-w-0 overflow-hidden bg-card shadow-xs">
          <CardHeader className="p-4 sm:p-6 pb-3 border-b border-border/70 bg-muted/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="min-w-0">
                <CardTitle className="text-sm sm:text-base font-bold text-foreground">
                  সাপ্তাহিক উপস্থিতি চিত্র
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  চলতি সপ্তাহের কার্যদিবস অনুযায়ী উপস্থিতি ও অনুপস্থিতির তুলনামূলক গ্রাফ
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-xs font-mono w-fit shrink-0 bg-background/80">
                রবি - বৃহস্পতি
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-4 min-w-0 overflow-hidden">
            <AttendanceChart />
          </CardContent>
        </Card>

        {/* Notices & Activities Card (3 columns on lg) */}
        <Card className="border-border/80 lg:col-span-3 flex flex-col justify-between min-w-0 overflow-hidden bg-card shadow-xs">
          <CardHeader className="p-4 sm:p-6 pb-3 border-b border-border/70 bg-muted/10">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <CardTitle className="text-sm sm:text-base font-bold text-foreground">
                  সর্বশেষ নোটিশ ও কার্যক্রম
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  বিদ্যালয়ের সাম্প্রতিক প্রাতিষ্ঠানিক আপডেট
                </CardDescription>
              </div>
              <Bell className="h-4 w-4 shrink-0 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3 p-4 sm:p-6 pt-4">
            <div className="rounded-xl border border-border/80 border-l-4 border-l-sky-500 bg-muted/30 p-3.5 space-y-1.5 hover:bg-muted/50 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
                <Badge variant="info" className="text-[10px] py-0 font-medium">একাডেমিক</Badge>
                <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                  <Clock className="h-3 w-3" /> আজ সকাল ০৯:৩০
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-foreground leading-snug">
                প্রথম প্রান্তিক মূল্যায়নের প্রস্তুতি সভা অনুষ্ঠিত হবে।
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                সকল সহকারী শিক্ষককে প্রধান শিক্ষকের কক্ষে উপস্থিত থাকার জন্য অনুরোধ করা যাচ্ছে।
              </p>
            </div>

            <div className="rounded-xl border border-border/80 border-l-4 border-l-emerald-500 bg-muted/30 p-3.5 space-y-1.5 hover:bg-muted/50 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
                <Badge variant="success" className="text-[10px] py-0 font-medium">ভর্তি কার্যক্রম</Badge>
                <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                  <Clock className="h-3 w-3" /> গতকাল
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-foreground leading-snug">
                নতুন ভর্তি শিক্ষার্থীদের তথ্য ও রোল নম্বর যাচাইকরণ সম্পন্ন।
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                ১ম থেকে ৪র্থ শ্রেণির চূড়ান্ত তালিকা প্রকাশ করা হয়েছে।
              </p>
            </div>
          </CardContent>
          <div className="p-4 sm:p-6 pt-0 border-t border-border/70 bg-muted/5">
            <Button
              variant="ghost"
              className="w-full justify-between text-xs font-semibold text-primary hover:text-primary hover:bg-primary/5 h-9"
            >
              <span>সকল নোটিশ ও আদেশপত্র দেখুন</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
