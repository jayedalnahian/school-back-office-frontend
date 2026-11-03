"use client";

import * as React from "react";
import { CheckSquare, Users, AlertCircle, CheckCircle2 } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n";

export default function AttendancesPage() {
  const { dict, language } = useLanguage();
  const m = dict.modules.attendances;

  return (
    <ModulePageView
      title={m.title}
      englishTitle={language === "bn" ? "Attendances Management" : undefined}
      description={m.subtitle}
      icon={CheckSquare}
      badge={m.badge}
      actionText={m.action}
      stats={[
        { label: m.stat1, value: "94.2%", change: "+1.5%", icon: CheckSquare },
        { label: m.stat2, value: language === "bn" ? "৬৭৮ জন" : "678 Present", icon: Users },
        { label: m.stat3, value: language === "bn" ? "৪২ জন" : "42 Absent", icon: AlertCircle },
        { label: m.stat4, value: "100%", change: "18/18", icon: CheckCircle2 },
      ]}
      columns={[m.col1, m.col2, m.col3, m.col4, m.col5, m.col6, m.col7]}
      data={[
        [
          <span key="1" className="font-semibold text-foreground">{language === "bn" ? "আজকের দিন" : "Today"}</span>,
          language === "bn" ? "পঞ্চম শ্রেণি (সুরমা)" : "Class 5 (Surma)",
          language === "bn" ? "৩৫ জন" : "35",
          language === "bn" ? "৩৪ জন" : "34",
          language === "bn" ? "১ জন" : "1",
          <Badge key="pct" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-mono">97.1%</Badge>,
          language === "bn" ? "জনাব শফিকুল ইসলাম" : "Shafiqul Islam",
        ],
        [
          <span key="2" className="font-semibold text-foreground">{language === "bn" ? "আজকের দিন" : "Today"}</span>,
          language === "bn" ? "প্রথম শ্রেণি (পদ্মা)" : "Class 1 (Padma)",
          language === "bn" ? "৪৮ জন" : "48",
          language === "bn" ? "৪৬ জন" : "46",
          language === "bn" ? "২ জন" : "2",
          <Badge key="pct2" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-mono">95.8%</Badge>,
          language === "bn" ? "মোসাঃ শামীমা নাসরীন" : "Shamima Nasreen",
        ],
        [
          <span key="3" className="font-semibold text-foreground">{language === "bn" ? "আজকের দিন" : "Today"}</span>,
          language === "bn" ? "দ্বিতীয় শ্রেণি (ক)" : "Class 2 (A)",
          language === "bn" ? "৪৬ জন" : "46",
          language === "bn" ? "৪৩ জন" : "43",
          language === "bn" ? "৩ জন" : "3",
          <Badge key="pct3" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-mono">93.5%</Badge>,
          language === "bn" ? "মোসাঃ ফারহানা হক" : "Farhana Haque",
        ],
      ]}
      notice={m.notice}
    />
  );
}
