import * as React from "react";
import Link from "next/link";
import {
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
    <div className="space-y-8">
      {/* Page Title & Welcome Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            স্বাগতম, অ্যাডমিন
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            বিদ্যালয়ের সার্বিক একাডেমিক অগ্রগতি, শিক্ষার্থী হাজিরা এবং প্রশাসনিক তথ্য সংক্ষেপ
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1 text-xs font-semibold bg-muted/50 border-border">
            শিক্ষাবর্ষ: ২০২৬
          </Badge>
          <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
            আজকের তারিখ: ১০ অক্টোবর ২০২৬
          </Badge>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1: Total Students */}
        <Card className="border-border shadow-xs hover:shadow-sm transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              মোট শিক্ষার্থী
            </CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <GraduationCap className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">৮৪০ জন</div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                <TrendingUp className="mr-0.5 h-3.5 w-3.5" /> +৪.৫%
              </span>
              <span>গত শিক্ষাবর্ষের তুলনায়</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 2: Teachers & Staff */}
        <Card className="border-border shadow-xs hover:shadow-sm transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              শিক্ষক ও কর্মী
            </CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <UserCheck className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">৩৬ জন</div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">৩২ জন</span>
              <span>আজ উপস্থিত আছেন</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 3: Today's Attendance */}
        <Card className="border-border shadow-xs hover:shadow-sm transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              আজকের হাজিরা
            </CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">৯৬.২%</div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="text-foreground font-semibold">৮০৮ জন</span>
              <span>শিক্ষার্থী উপস্থিত</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 4: Active Sections */}
        <Card className="border-border shadow-xs hover:shadow-sm transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              সক্রিয় শাখা
            </CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Layers className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">১৮ টি</div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>১ম থেকে ৫ম শ্রেণি পর্যন্ত</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Bar */}
      <Card className="border-border bg-card/60 backdrop-blur-xs">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">দ্রুত কার্যক্রম (Quick Actions)</CardTitle>
          <CardDescription>দৈনন্দিন নিয়মিত কার্যক্রম দ্রুত সম্পাদন করুন</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Button
              asChild
              variant="outline"
              className="h-auto flex-col items-center justify-center gap-2 p-4 text-xs font-medium hover:border-primary hover:bg-primary/5"
            >
              <Link href="/enrollments">
                <UserPlus className="h-5 w-5 text-sky-500" />
                <span>নতুন ভর্তি</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto flex-col items-center justify-center gap-2 p-4 text-xs font-medium hover:border-primary hover:bg-primary/5"
            >
              <Link href="/attendances">
                <CalendarCheck className="h-5 w-5 text-emerald-500" />
                <span>হাজিরা গ্রহণ</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto flex-col items-center justify-center gap-2 p-4 text-xs font-medium hover:border-primary hover:bg-primary/5"
            >
              <Link href="/routines">
                <CalendarDays className="h-5 w-5 text-indigo-500" />
                <span>ক্লাস রুটিন</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto flex-col items-center justify-center gap-2 p-4 text-xs font-medium hover:border-primary hover:bg-primary/5"
            >
              <Link href="/evaluations">
                <Award className="h-5 w-5 text-amber-500" />
                <span>মূল্যায়ন ও রেজাল্ট</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Charts & Highlights Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Attendance Chart (4 columns on lg) */}
        <Card className="border-border lg:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">
                  সাপ্তাহিক উপস্থিতি চিত্র
                </CardTitle>
                <CardDescription>
                  চলতি সপ্তাহের কার্যদিবস অনুযায়ী উপস্থিতি ও অনুপস্থিতির তুলনামূলক গ্রাফ
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-xs font-mono">
                রবি - বৃহস্পতি
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <AttendanceChart />
          </CardContent>
        </Card>

        {/* Notices & Activities Card (3 columns on lg) */}
        <Card className="border-border lg:col-span-3 flex flex-col justify-between">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">
                  সর্বশেষ নোটিশ ও কার্যক্রম
                </CardTitle>
                <CardDescription>
                  বিদ্যালয়ের সাম্প্রতিক প্রাতিষ্ঠানিক আপডেট
                </CardDescription>
              </div>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-border/80 bg-muted/30 p-3 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <Badge variant="secondary" className="text-[10px] py-0">একাডেমিক</Badge>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> আজ সকাল ০৯:৩০
                </span>
              </div>
              <p className="text-sm font-medium text-foreground">
                প্রথম প্রান্তিক মূল্যায়নের প্রস্তুতি সভা অনুষ্ঠিত হবে।
              </p>
              <p className="text-xs text-muted-foreground">
                সকল সহকারী শিক্ষককে প্রধান শিক্ষকের কক্ষে উপস্থিত থাকার জন্য অনুরোধ করা যাচ্ছে।
              </p>
            </div>

            <div className="rounded-lg border border-border/80 bg-muted/30 p-3 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <Badge variant="outline" className="text-[10px] py-0">ভর্তি কার্যক্রম</Badge>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> গতকাল
                </span>
              </div>
              <p className="text-sm font-medium text-foreground">
                নতুন ভর্তি শিক্ষার্থীদের তথ্য ও রোল নম্বর যাচাইকরণ সম্পন্ন।
              </p>
              <p className="text-xs text-muted-foreground">
                ১ম থেকে ৪র্থ শ্রেণির চূড়ান্ত তালিকা প্রকাশ করা হয়েছে।
              </p>
            </div>
          </CardContent>
          <div className="p-6 pt-0">
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
