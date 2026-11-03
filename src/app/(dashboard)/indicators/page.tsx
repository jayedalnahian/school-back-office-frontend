"use client";

import * as React from "react";
import { Target, Award, CheckCircle2, BookOpen } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n";

export default function IndicatorsPage() {
  const { dict, language } = useLanguage();
  const m = dict.modules.indicators;

  return (
    <ModulePageView
      title={m.title}
      englishTitle={language === "bn" ? "Competency Indicators (PI & BI)" : undefined}
      description={m.subtitle}
      icon={Target}
      badge={m.badge}
      actionText={m.action}
      stats={[
        { label: m.stat1, value: language === "bn" ? "৪৫ টি" : "45 PI", icon: Target },
        { label: m.stat2, value: language === "bn" ? "১০ টি" : "10 BI", icon: Award },
        { label: m.stat3, value: language === "bn" ? "৩ টি" : "3 Levels", change: "▲ ■ ●", icon: CheckCircle2 },
        { label: m.stat4, value: "NCTB", icon: BookOpen },
      ]}
      columns={[m.col1, m.col2, m.col3, m.col4, m.col5, m.col6]}
      data={[
        [
          <span key="1" className="font-mono font-bold text-foreground">PI-05.01.01</span>,
          language === "bn" ? "বাংলা (৫ম শ্রেণি)" : "Bangla (Class 5)",
          language === "bn" ? "প্রমিত উচ্চারণে বক্তব্য উপস্থাপন" : "Standard pronunciation",
          language === "bn" ? "পাঠ্যবিষয় ও প্রাসঙ্গিক বিষয়ে স্পষ্ট মতামত ব্যক্ত করতে পারা" : "Express opinions clearly on curriculum topics",
          "▲ / ● / ■",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.active}</Badge>,
        ],
        [
          <span key="2" className="font-mono font-bold text-foreground">PI-05.02.01</span>,
          language === "bn" ? "ইংরেজি (৫ম শ্রেণি)" : "English (Class 5)",
          "Daily situation communication",
          "Can greet, thank and respond politely in English",
          "▲ / ● / ■",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.active}</Badge>,
        ],
        [
          <span key="3" className="font-mono font-bold text-foreground">PI-05.03.01</span>,
          language === "bn" ? "গণিত (৫ম শ্রেণি)" : "Mathematics (Class 5)",
          language === "bn" ? "গাণিতিক সমস্যা সমাধান" : "Problem Solving",
          language === "bn" ? "চার প্রক্রিয়া সংশ্লিষ্ট বাস্তব জীবনের সমস্যার সমাধান করতে পারা" : "Solve four operations real life problems",
          "▲ / ● / ■",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.active}</Badge>,
        ],
      ]}
      notice={m.notice}
    />
  );
}
