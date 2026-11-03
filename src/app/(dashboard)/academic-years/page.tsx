"use client";

import * as React from "react";
import { Calendar, CheckCircle2, Clock } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n";

export default function AcademicYearsPage() {
  const { dict, language } = useLanguage();
  const m = dict.modules.academicYears;

  return (
    <ModulePageView
      title={m.title}
      englishTitle={language === "bn" ? "Academic Years Management" : undefined}
      description={m.subtitle}
      icon={Calendar}
      badge={m.badge}
      actionText={m.action}
      stats={[
        { label: m.stat1, value: language === "bn" ? "২০২৬" : "2026", change: language === "bn" ? "চলমান সেশন" : "Active Session", icon: Calendar },
        { label: m.stat2, value: language === "bn" ? "২৪২ দিন" : "242 Days", icon: Clock },
        { label: m.stat3, value: language === "bn" ? "৩ টি" : "3 Years", icon: CheckCircle2 },
        { label: m.stat4, value: dict.common.active, change: dict.common.verified, icon: CheckCircle2 },
      ]}
      columns={[m.col1, m.col2, m.col3, m.col4, m.col5]}
      data={[
        [
          <span key="1" className="font-semibold text-foreground">{language === "bn" ? "২০২৬ শিক্ষাবর্ষ" : "Academic Year 2026"}</span>,
          language === "bn" ? "০১ জানুয়ারি ২০২৬" : "01 Jan 2026",
          language === "bn" ? "৩১ ডিসেম্বর ২০২৬" : "31 Dec 2026",
          language === "bn" ? "২৪২ দিন" : "242 Days",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.active}</Badge>,
        ],
        [
          <span key="2" className="font-semibold text-foreground">{language === "bn" ? "২০২৫ শিক্ষাবর্ষ" : "Academic Year 2025"}</span>,
          language === "bn" ? "০১ জানুয়ারি ২০২৫" : "01 Jan 2025",
          language === "bn" ? "৩১ ডিসেম্বর ২০২৫" : "31 Dec 2025",
          language === "bn" ? "২৩৮ দিন" : "238 Days",
          <Badge key="status" variant="outline" className="text-muted-foreground">⚪ {language === "bn" ? "সমাপ্ত" : "Completed"}</Badge>,
        ],
        [
          <span key="3" className="font-semibold text-foreground">{language === "bn" ? "২০২৪ শিক্ষাবর্ষ" : "Academic Year 2024"}</span>,
          language === "bn" ? "০১ জানুয়ারি ২০২৪" : "01 Jan 2024",
          language === "bn" ? "৩১ ডিসেম্বর ২০২৪" : "31 Dec 2024",
          language === "bn" ? "২৩৫ দিন" : "235 Days",
          <Badge key="status" variant="outline" className="text-muted-foreground">⚪ {language === "bn" ? "আর্কাইভড" : "Archived"}</Badge>,
        ],
      ]}
      notice={m.notice}
    />
  );
}
