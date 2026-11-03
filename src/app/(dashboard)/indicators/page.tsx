"use client";

import * as React from "react";
import { Target, Award, CheckCircle2, BookOpen } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";

export default function IndicatorsPage() {
  return (
    <ModulePageView
      title="পারদর্শিতা ও আচরণিক নির্দেশক"
      englishTitle="Competency Indicators (PI & BI)"
      description="নতুন যোগ্যতাভিত্তিক শিক্ষাক্রম অনুসারে পারদর্শিতা নির্দেশক (PI) ও আচরণিক নির্দেশক (BI)"
      icon={Target}
      badge="মূল্যায়ন"
      actionText="নতুন নির্দেশক যুক্ত করুন"
      stats={[
        { label: "পারদর্শিতা নির্দেশক (PI)", value: "৪৫ টি", icon: Target },
        { label: "আচরণিক নির্দেশক (BI)", value: "১০ টি", icon: Award },
        { label: "মূল্যায়ন মাত্রা", value: "৩ টি", change: "▲ ■ ●", icon: CheckCircle2 },
        { label: "কারিকুলাম ফ্রেমওয়ার্ক", value: "NCTB", icon: BookOpen },
      ]}
      columns={["নির্দেশক কোড", "বিষয় ও শ্রেণি", "শিখনফল / যোগ্যতা", "নির্দেশকের বিবরণ", "মূল্যায়ন স্তর", "অবস্থা"]}
      data={[
        [
          <span key="1" className="font-mono font-bold text-foreground">PI-05.01.01</span>,
          "বাংলা (৫ম শ্রেণি)",
          "প্রমিত উচ্চারণে বক্তব্য উপস্থাপন",
          "পাঠ্যবিষয় ও প্রাসঙ্গিক বিষয়ে স্পষ্ট মতামত ব্যক্ত করতে পারা",
          "ত্রিভুজ / বৃত্ত / চতুর্ভুজ",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 সক্রিয়</Badge>,
        ],
        [
          <span key="2" className="font-mono font-bold text-foreground">PI-05.02.01</span>,
          "English (Class 5)",
          "Daily situation communication",
          "Can greet, thank and respond politely in English",
          "ত্রিভুজ / বৃত্ত / চতুর্ভুজ",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 সক্রিয়</Badge>,
        ],
        [
          <span key="3" className="font-mono font-bold text-foreground">PI-05.03.01</span>,
          "গণিত (৫ম শ্রেণি)",
          "গাণিতিক সমস্যা সমাধান",
          "চার প্রক্রিয়া সংশ্লিষ্ট বাস্তব জীবনের সমস্যার সমাধান করতে পারা",
          "ত্রিভুজ / বৃত্ত / চতুর্ভুজ",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 সক্রিয়</Badge>,
        ],
        [
          <span key="4" className="font-mono font-bold text-foreground">BI-01</span>,
          "সার্বিক আচরণিক",
          "সততা ও পারস্পরিক শ্রদ্ধাবোধ",
          "শ্রেণিকক্ষে সততা বজায় রাখা এবং সহপাঠীদের মতামতের প্রতি শ্রদ্ধা প্রদর্শন",
          "ত্রিভুজ / বৃত্ত / চতুর্ভুজ",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 সক্রিয়</Badge>,
        ],
      ]}
      searchPlaceholder="নির্দেশক কোড, বিষয় বা শিখনফল দিয়ে খুঁজুন..."
      notice="শিক্ষার্থীদের শিখন অগ্রগতি মূল্যায়নে তিনটি সূচক ব্যবহার করা হয়: প্রারম্ভিক স্তর (চতুর্ভুজ ■), অন্তর্বর্তী স্তর (বৃত্ত ●) এবং পারদর্শী স্তর (ত্রিভুজ ▲)।"
    />
  );
}

