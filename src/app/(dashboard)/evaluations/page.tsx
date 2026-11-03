"use client";

import * as React from "react";
import { Award, FileText, CheckCircle2, TrendingUp } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n";

export default function EvaluationsPage() {
  const { dict, language } = useLanguage();
  const m = dict.modules.evaluations;

  return (
    <ModulePageView
      title={m.title}
      englishTitle={language === "bn" ? "Evaluations & Results" : undefined}
      description={m.subtitle}
      icon={Award}
      badge={m.badge}
      actionText={m.action}
      stats={[
        { label: m.stat1, value: language === "bn" ? "ধারাবাহিক ও সামষ্টিক" : "Formative & Summative", icon: Award },
        { label: m.stat2, value: language === "bn" ? "৭২০ টি" : "720 Cards", change: "100%", icon: FileText },
        { label: m.stat3, value: dict.common.active, icon: CheckCircle2 },
        { label: m.stat4, value: "89%", change: "+4%", icon: TrendingUp },
      ]}
      columns={[m.col1, m.col2, m.col3, m.col4, m.col5, m.col6]}
      data={[
        [
          <span key="1" className="font-semibold text-foreground">
            {language === "bn" ? "১ম প্রান্তিক মূল্যায়ন ২০২৬" : "1st Terminal Evaluation 2026"}
          </span>,
          language === "bn" ? "২০২৬ শিক্ষাবর্ষ" : "Academic Year 2026",
          language === "bn" ? "সকল শ্রেণি (১ম - ৫ম)" : "All Classes (1-5)",
          language === "bn" ? "১৫ এপ্রিল ২০২৬" : "15 Apr 2026",
          language === "bn" ? "২৫ এপ্রিল ২০২৬" : "25 Apr 2026",
          <Badge key="status" className="bg-amber-500/10 text-amber-600 border-amber-500/20">🟡 {language === "bn" ? "নির্ধারিত" : "Scheduled"}</Badge>,
        ],
        [
          <span key="2" className="font-semibold text-foreground">
            {language === "bn" ? "সামষ্টিক চূড়ান্ত মূল্যায়ন ২০২৫" : "Summative Final Evaluation 2025"}
          </span>,
          language === "bn" ? "২০২৫ শিক্ষাবর্ষ" : "Academic Year 2025",
          language === "bn" ? "সকল শ্রেণি (১ম - ৫ম)" : "All Classes (1-5)",
          language === "bn" ? "২০ নভেম্বর ২০২৫" : "20 Nov 2025",
          language === "bn" ? "১০ ডিসেম্বর ২০২৫" : "10 Dec 2025",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {language === "bn" ? "সমাপ্ত ও প্রকাশিত" : "Published"}</Badge>,
        ],
      ]}
      notice={m.notice}
    />
  );
}
