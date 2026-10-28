import Link from "next/link";
import { ArrowLeft, Home, School, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center text-center">
        {/* Institutional emblem */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs ring-4 ring-primary/5">
          <School className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>৪০৪ - পাতাটি খুঁজে পাওয়া যায়নি</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-normal text-foreground font-sans">
            অনুরোধকৃত মডিউল প্রস্তুত হচ্ছে
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            আপনি যে পাতা বা মডিউলটিতে প্রবেশ করতে চেয়েছেন তা বর্তমানে সিস্টেমে বিদ্যমান নেই অথবা প্রক্রিয়াধীন রয়েছে।
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link href="/dashboard">
            <Button size="sm" className="h-9 gap-2 text-xs font-semibold shadow-xs bg-primary hover:bg-primary/90 text-primary-foreground">
              <Home className="h-4 w-4" />
              মূল ড্যাশবোর্ডে ফিরুন
            </Button>
          </Link>
          <Link href="/schools">
            <Button variant="outline" size="sm" className="h-9 gap-2 text-xs font-medium border-border/80">
              <ArrowLeft className="h-4 w-4" />
              বিদ্যালয় তালিকা
            </Button>
          </Link>
        </div>

        <div className="mt-12 text-[11px] text-muted-foreground/80">
          গণপ্রজাতন্ত্রী বাংলাদেশ সরকার • প্রাথমিক ও গণশিক্ষা মন্ত্রণালয়
        </div>
      </div>
    </div>
  );
}
