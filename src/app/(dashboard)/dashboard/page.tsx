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
    <div className="space-y-6 sm:space-y-8 w-full min-w-0 max-w-full overflow-hidden">
      {/* Page Title & Welcome Banner */}
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground truncate">
            স্বাগতম, অ্যাডমিন
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            বিদ্যালয়ের সার্বিক একাডেমিক অগ্রগতি, শিক্ষার্থী হাজিরা এবং প্রশাসনিক তথ্য সংক্ষেপ
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/schools">
            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1.5 text-xs font-semibold border-primary/30 hover:border-primary/60 hover:bg-primary/5 text-primary"
            >
              <Building2 className="h-3.5 w-3.5" />
              বিদ্যালয় তালিকা (DataTable টেস্ট করুন)
            </Button>
          </Link>
          <Badge variant="outline" className="px-2.5 py-1 text-xs font-semibold bg-muted/50 border-border">
            শিক্ষাবর্ষ: ২০২৬
          </Badge>
          <Badge variant="secondary" className="px-2.5 py-1 text-xs font-medium">
            আজকের তারিখ: ১০ অক্টোবর ২০২৬
          </Badge>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4 min-w-0">
        {/* Metric 1: Total Students */}
        <Card className="border-border shadow-xs hover:shadow-sm transition-shadow min-w-0 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-4 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
              মোট শিক্ষার্থী
            </CardTitle>
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">৮৪০ জন</div>
            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                <TrendingUp className="mr-0.5 h-3.5 w-3.5 shrink-0" /> +৪.৫%
              </span>
              <span>গত শিক্ষাবর্ষের তুলনায়</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 2: Teachers & Staff */}
        <Card className="border-border shadow-xs hover:shadow-sm transition-shadow min-w-0 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-4 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
              শিক্ষক ও কর্মী
            </CardTitle>
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <UserCheck className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">৩৬ জন</div>
            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">৩২ জন</span>
              <span>আজ উপস্থিত আছেন</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 3: Today's Attendance */}
        <Card className="border-border shadow-xs hover:shadow-sm transition-shadow min-w-0 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-4 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
              আজকের হাজিরা
            </CardTitle>
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">৯৬.২%</div>
            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <span className="text-foreground font-semibold">৮০৮ জন</span>
              <span>শিক্ষার্থী উপস্থিত</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 4: Active Sections */}
        <Card className="border-border shadow-xs hover:shadow-sm transition-shadow min-w-0 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-4 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
              সক্রিয় শাখা
            </CardTitle>
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Layers className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">১৮ টি</div>
            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <span>১ম থেকে ৫ম শ্রেণি পর্যন্ত</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Bar */}
      <Card className="border-border bg-card/60 backdrop-blur-xs min-w-0 overflow-hidden">
        <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
          <CardTitle className="text-sm sm:text-base font-semibold">দ্রুত কার্যক্রম (Quick Actions)</CardTitle>
          <CardDescription className="text-xs sm:text-sm">দৈনন্দিন নিয়মিত কার্যক্রম দ্রুত সম্পাদন করুন</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-2 sm:pt-3">
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-4">
            <Button
              asChild
              variant="outline"
              className="h-auto flex-col items-center justify-center gap-1.5 sm:gap-2 p-3 sm:p-4 text-xs font-medium hover:border-primary hover:bg-primary/5 min-w-0"
            >
              <Link href="/enrollments" className="w-full truncate text-center">
                <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500" />
                <span className="truncate">নতুন ভর্তি</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto flex-col items-center justify-center gap-1.5 sm:gap-2 p-3 sm:p-4 text-xs font-medium hover:border-primary hover:bg-primary/5 min-w-0"
            >
              <Link href="/attendances" className="w-full truncate text-center">
                <CalendarCheck className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
                <span className="truncate">হাজিরা গ্রহণ</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto flex-col items-center justify-center gap-1.5 sm:gap-2 p-3 sm:p-4 text-xs font-medium hover:border-primary hover:bg-primary/5 min-w-0"
            >
              <Link href="/routines" className="w-full truncate text-center">
                <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500" />
                <span className="truncate">ক্লাস রুটিন</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto flex-col items-center justify-center gap-1.5 sm:gap-2 p-3 sm:p-4 text-xs font-medium hover:border-primary hover:bg-primary/5 min-w-0"
            >
              <Link href="/evaluations" className="w-full truncate text-center">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
                <span className="truncate">মূল্যায়ন ও রেজাল্ট</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Charts & Highlights Grid */}
      <div className="grid gap-6 lg:grid-cols-7 min-w-0">
        {/* Attendance Chart (4 columns on lg) */}
        <Card className="border-border lg:col-span-4 min-w-0 overflow-hidden">
          <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="min-w-0">
                <CardTitle className="text-sm sm:text-base font-semibold">
                  সাপ্তাহিক উপস্থিতি চিত্র
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  চলতি সপ্তাহের কার্যদিবস অনুযায়ী উপস্থিতি ও অনুপস্থিতির তুলনামূলক গ্রাফ
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-xs font-mono w-fit shrink-0">
                রবি - বৃহস্পতি
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-2 sm:p-6 pt-2 sm:pt-2 min-w-0 overflow-hidden">
            <AttendanceChart />
          </CardContent>
        </Card>

        {/* Notices & Activities Card (3 columns on lg) */}
        <Card className="border-border lg:col-span-3 flex flex-col justify-between min-w-0 overflow-hidden">
          <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <CardTitle className="text-sm sm:text-base font-semibold">
                  সর্বশেষ নোটিশ ও কার্যক্রম
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  বিদ্যালয়ের সাম্প্রতিক প্রাতিষ্ঠানিক আপডেট
                </CardDescription>
              </div>
              <Bell className="h-4 w-4 shrink-0 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-2 sm:pt-2">
            <div className="rounded-lg border border-border/80 bg-muted/30 p-3 space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
                <Badge variant="secondary" className="text-[10px] py-0">একাডেমিক</Badge>
                <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                  <Clock className="h-3 w-3" /> আজ সকাল ০৯:৩০
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-foreground">
                প্রথম প্রান্তিক মূল্যায়নের প্রস্তুতি সভা অনুষ্ঠিত হবে।
              </p>
              <p className="text-xs text-muted-foreground">
                সকল সহকারী শিক্ষককে প্রধান শিক্ষকের কক্ষে উপস্থিত থাকার জন্য অনুরোধ করা যাচ্ছে।
              </p>
            </div>

            <div className="rounded-lg border border-border/80 bg-muted/30 p-3 space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
                <Badge variant="outline" className="text-[10px] py-0">ভর্তি কার্যক্রম</Badge>
                <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                  <Clock className="h-3 w-3" /> গতকাল
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-foreground">
                নতুন ভর্তি শিক্ষার্থীদের তথ্য ও রোল নম্বর যাচাইকরণ সম্পন্ন।
              </p>
              <p className="text-xs text-muted-foreground">
                ১ম থেকে ৪র্থ শ্রেণির চূড়ান্ত তালিকা প্রকাশ করা হয়েছে।
              </p>
            </div>
          </CardContent>
          <div className="p-4 sm:p-6 pt-0 sm:pt-0">
            <Button
              variant="ghost"
              className="w-full justify-between text-xs font-semibold text-primary hover:text-primary"
            >
              <span>সকল নোটিশ দেখুন</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
