"use client";

import * as React from "react";
import { CalendarDays, Clock, BookOpen, Layers } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { useLanguage } from "@/i18n";

export default function RoutinesPage() {
  const { dict, language } = useLanguage();
  const m = dict.modules.routines;

  return (
    <ModulePageView
      title={m.title}
      englishTitle={language === "bn" ? "Class Routines Management" : undefined}
      description={m.subtitle}
      icon={CalendarDays}
      badge={m.badge}
      actionText={m.action}
      stats={[
        { label: m.stat1, value: language === "bn" ? "৬ টি" : "6 Routines", icon: CalendarDays },
        { label: m.stat2, value: language === "bn" ? "৭ টি" : "7 Periods", icon: Clock },
        { label: m.stat3, value: language === "bn" ? "১৯২ টি" : "192 Classes", icon: BookOpen },
        { label: m.stat4, value: dict.dashboard.weekdaysRange, icon: Layers },
      ]}
      columns={[m.col1, m.col2, m.col3, m.col4, m.col5, m.col6, m.col7, m.col8]}
      data={[
        [
          <span key="1" className="font-semibold text-foreground">
            {language === "bn" ? "পঞ্চম শ্রেণি (সুরমা)" : "Class 5 (Surma)"}
          </span>,
          dict.dashboard.daySun,
          language === "bn" ? "বাংলা (শামীমা)" : "Bangla (Shamima)",
          language === "bn" ? "ইংরেজি (ফারহানা)" : "English (Farhana)",
          language === "bn" ? "গণিত (রহমান)" : "Math (Rahman)",
          language === "bn" ? "বিজ্ঞান (শফিকুল)" : "Science (Shafiqul)",
          <span key="brk" className="text-muted-foreground font-mono">{language === "bn" ? "টিফিন" : "Recess"}</span>,
          language === "bn" ? "বাবেপ, ধর্ম ও শিল্পকলা" : "BGS, Religion & Arts",
        ],
        [
          <span key="2" className="font-semibold text-foreground">
            {language === "bn" ? "পঞ্চম শ্রেণি (সুরমা)" : "Class 5 (Surma)"}
          </span>,
          dict.dashboard.dayMon,
          language === "bn" ? "গণিত (রহমান)" : "Math (Rahman)",
          language === "bn" ? "বাংলা (শামীমা)" : "Bangla (Shamima)",
          language === "bn" ? "ইংরেজি (ফারহানা)" : "English (Farhana)",
          language === "bn" ? "বাবেপ (শফিকুল)" : "BGS (Shafiqul)",
          <span key="brk2" className="text-muted-foreground font-mono">{language === "bn" ? "টিফিন" : "Recess"}</span>,
          language === "bn" ? "বিজ্ঞান ও শারীরিক শিক্ষা" : "Science & Physical Ed",
        ],
        [
          <span key="3" className="font-semibold text-foreground">
            {language === "bn" ? "প্রথম শ্রেণি (পদ্মা)" : "Class 1 (Padma)"}
          </span>,
          dict.dashboard.daySun,
          language === "bn" ? "আমার বাংলা বই" : "Amar Bangla Boi",
          "English for Today",
          language === "bn" ? "প্রাথমিক গণিত" : "Elementary Math",
          "-",
          <span key="brk3" className="text-muted-foreground font-mono">{language === "bn" ? "টিফিন" : "Recess"}</span>,
          language === "bn" ? "খেলাধুলা ও সঙ্গীত" : "Games & Music",
        ],
      ]}
      notice={m.notice}
    />
  );
}
