"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Info,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SchoolCreateForm } from "@/components/schools";

export default function SchoolOnboardPage() {
  const router = useRouter();

  const handleBack = React.useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/schools");
    }
  }, [router]);

  const handleForward = React.useCallback(() => {
    if (typeof window !== "undefined") {
      router.forward();
    }
  }, [router]);

  return (
    <div className="w-full min-w-0 space-y-6 pb-12">
      {/* ---------------- Top Navigation & Official Header ---------------- */}
      <div className="flex flex-col gap-4 border-b border-border/80 pb-4 sm:flex-row sm:items-center sm:justify-between -mt-5">
        <div className="flex items-center gap-3">
          {/* Browser-style Navigation Buttons */}
          <div className="flex items-center gap-1 rounded-lg border border-border/70 bg-card/60 p-0.5 shadow-2xs">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="h-8 w-8 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
              title="পূর্ববর্তী পৃষ্ঠায় ফিরে যান (Back)"
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleForward}
              className="h-8 w-8 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
              title="পরবর্তী পৃষ্ঠায় এগিয়ে যান (Forward)"
              aria-label="Forward"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="h-5 w-px bg-border/80 hidden sm:block" />

          {/* Page Title & Seal */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary border border-primary/20">
                <Building2 className="h-4 w-4" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground font-sans tracking-tight">
                নতুন বিদ্যালয় অনবোর্ডিং ও নিবন্ধন
              </h1>
              <Badge variant="outline" className="hidden sm:inline-flex text-[11px] font-medium bg-muted/30">
                অনবোর্ডিং ফরম
              </Badge>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
              জাতীয় প্রাথমিক বিদ্যালয় তথ্যভাণ্ডারে নতুন শিক্ষাপ্রতিষ্ঠান ও প্রধান অ্যাডমিনের তথ্য প্রাতিষ্ঠানিকভাবে যুক্ত করুন
            </p>
          </div>
        </div>

        {/* Action: Return to Table */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="h-9 gap-1.5 text-xs font-medium border-border/80 hover:bg-accent shadow-2xs"
          >
            <Link href="/schools">
              <ArrowLeft className="h-3.5 w-3.5" />
              বিদ্যালয় তালিকায় ফিরে যান
            </Link>
          </Button>
        </div>
      </div>

      {/* ---------------- Formal Informational Banner ---------------- */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 mt-0.5">
            <Info className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-foreground text-xs sm:text-sm">
              প্রাতিষ্ঠানিক অনবোর্ডিং নির্দেশনা ও প্রোটোকল
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              সঠিক তথ্যাদি যাচাইপূর্বক ফরমটি পূরণ করুন। জিপিএস কোড অবশ্যই শিক্ষা অধিদপ্তর কর্তৃক অনুমোদিত ৮ ডিজিটের ইউনিক কোড হতে হবে। বিদ্যালয় প্রধানের সঠিক ফোন নম্বর প্রদান করুন, যা লগইন আইডি হিসেবে ব্যবহৃত হবে।
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-foreground shadow-2xs">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            যাচাইকৃত ব্যাক-অফিস সিস্টেম
          </span>
        </div>
      </div>

      {/* ---------------- Full-Page Form ---------------- */}
      <div className="mx-auto max-w-5xl">
        <SchoolCreateForm
          onSuccess={() => {
            // Return to schools table on successful creation
            router.push("/schools");
          }}
          onCancel={() => {
            router.push("/schools");
          }}
        />
      </div>
    </div>
  );
}
