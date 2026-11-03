"use client";

import * as React from "react";
import { Award, FileText, CheckCircle2, TrendingUp } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";

export default function EvaluationsPage() {
  return (
    <ModulePageView
      title="মূল্যায়ন, ট্রান্সক্রিপ্ট ও প্রগ্রেস রিপোর্ট"
      englishTitle="Evaluations & Results"
      description="ধারাবাহিক শিখনকালীন মূল্যায়ন এবং প্রান্তিক সামষ্টিক মূল্যায়ন ও রিপোর্ট কার্ড"
      icon={Award}
      badge="মূল্যায়ন"
      actionText="নতুন মূল্যায়ন সেশন শুরু"
      stats={[
        { label: "মূল্যায়ন ধরন", value: "ধারাবাহিক ও সামষ্টিক", icon: Award },
        { label: "প্রগ্রেস কার্ড প্রস্তুত", value: "৭২০ টি", change: "১০০% কভার্ড", icon: FileText },
        { label: "চলতি সেশনের অবস্থা", value: "চলমান", icon: CheckCircle2 },
        { label: "সর্বোচ্চ যোগ্যতা অর্জন", value: "৮৯%", change: "+৪% অগ্রগতি", icon: TrendingUp },
      ]}
      columns={["মূল্যায়নের নাম", "শিক্ষাবর্ষ ও সেশন", "শ্রেণি", "শুরুর তারিখ", "ফলাফল প্রকাশের তারিখ", "অবস্থা"]}
      data={[
        [
          <span key="1" className="font-semibold text-foreground">১ম প্রান্তিক মূল্যায়ন ২০২৬</span>,
          "২০২৬ শিক্ষাবর্ষ",
          "সকল শ্রেণি (১ম - ৫ম)",
          "১৫ এপ্রিল ২০২৬",
          "২৫ এপ্রিল ২০২৬",
          <Badge key="status" className="bg-amber-500/10 text-amber-600 border-amber-500/20">🟡 নির্ধারিত</Badge>,
        ],
        [
          <span key="2" className="font-semibold text-foreground">সামষ্টিক চূড়ান্ত মূল্যায়ন ২০২৫</span>,
          "২০২৫ শিক্ষাবর্ষ",
          "সকল শ্রেণি (১ম - ৫ম)",
          "২০ নভেম্বর ২০২৫",
          "১০ ডিসেম্বর ২০২৫",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 সমাপ্ত ও প্রকাশিত</Badge>,
        ],
        [
          <span key="3" className="font-semibold text-foreground">দৈনিক শিখনকালীন মূল্যায়ন</span>,
          "২০২৬ শিক্ষাবর্ষ",
          "সকল শ্রেণি",
          "চলমান",
          "প্রতি মাসান্তে",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 চলমান</Badge>,
        ],
      ]}
      searchPlaceholder="মূল্যায়ন বা সেশনের নাম দিয়ে খুঁজুন..."
      notice="মূল্যায়ন ফলাফল চূড়ান্ত অনুমোদনের পূর্বে সংশ্লিষ্ট শ্রেণি শিক্ষক ও প্রধান শিক্ষকের যৌথ স্বাক্ষর ও ডিজিটাল অনুমোদন সম্পন্ন করতে হবে।"
    />
  );
}

