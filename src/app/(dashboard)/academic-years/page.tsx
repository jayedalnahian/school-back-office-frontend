"use client";

import * as React from "react";
import { Calendar, CheckCircle2, Clock } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";

export default function AcademicYearsPage() {
  return (
    <ModulePageView
      title="শিক্ষাবর্ষ ও সেশন ব্যবস্থাপনা"
      englishTitle="Academic Years Management"
      description="প্রাথমিক বিদ্যালয়ের শিক্ষাবর্ষ, মেয়াদের ব্যাপ্তি ও ক্যালেন্ডার কনফিগারেশন"
      icon={Calendar}
      badge="একাডেমিক সেটআপ"
      actionText="নতুন শিক্ষাবর্ষ যুক্ত করুন"
      stats={[
        { label: "চলতি শিক্ষাবর্ষ", value: "২০২৬", change: "চলমান সেশন", icon: Calendar },
        { label: "মোট কার্যদিবস", value: "২৪২ দিন", icon: Clock },
        { label: "নিবন্ধিত শিক্ষাবর্ষ", value: "৩ টি", icon: CheckCircle2 },
        { label: "সিস্টেম স্থিতি", value: "সক্রিয়", change: "অনবোর্ডকৃত" },
      ]}
      columns={["শিক্ষাবর্ষ", "শুরুর তারিখ", "সমাপ্তির তারিখ", "মোট কার্যদিবস", "অবস্থা"]}
      data={[
        [
          <span key="1" className="font-semibold text-foreground">২০২৬ শিক্ষাবর্ষ</span>,
          "০১ জানুয়ারি ২০২৬",
          "৩১ ডিসেম্বর ২০২৬",
          "২৪২ দিন",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 চলমান ও সক্রিয়</Badge>,
        ],
        [
          <span key="2" className="font-semibold text-foreground">২০২৫ শিক্ষাবর্ষ</span>,
          "০১ জানুয়ারি ২০২৫",
          "৩১ ডিসেম্বর ২০২৫",
          "২৩৮ দিন",
          <Badge key="status" variant="outline" className="text-muted-foreground">⚪ সমাপ্ত</Badge>,
        ],
        [
          <span key="3" className="font-semibold text-foreground">২০২৪ শিক্ষাবর্ষ</span>,
          "০১ জানুয়ারি ২০২৪",
          "৩১ ডিসেম্বর ২০২৪",
          "২৩৫ দিন",
          <Badge key="status" variant="outline" className="text-muted-foreground">⚪ আর্কাইভড</Badge>,
        ],
      ]}
      searchPlaceholder="শিক্ষাবর্ষ বা তারিখ দিয়ে খুঁজুন..."
      notice="জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) এবং প্রাথমিক শিক্ষা অধিদপ্তরের বাৎসরিক একাডেমিক ক্যালেন্ডার অনুযায়ী প্রতিটি শিক্ষাবর্ষের কার্যদিবস ও ছুটির তালিকা পরিচালিত হবে।"
    />
  );
}

