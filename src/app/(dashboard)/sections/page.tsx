"use client";

import * as React from "react";
import { Layers, UserCheck, Users, School } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n";

export default function SectionsPage() {
  const { dict, language } = useLanguage();
  const m = dict.modules.sections;

  return (
    <ModulePageView
      title={m.title}
      englishTitle={language === "bn" ? "Sections & Streams Management" : undefined}
      description={m.subtitle}
      icon={Layers}
      badge={m.badge}
      actionText={m.action}
      stats={[
        { label: m.stat1, value: language === "bn" ? "১৬ টি" : "16 Sections", icon: Layers },
        { label: m.stat2, value: language === "bn" ? "৪৫ জন" : "45 Avg", icon: Users },
        { label: m.stat3, value: language === "bn" ? "১৬ জন" : "16 Assigned", change: language === "bn" ? "১০০% কভার্ড" : "100% Assigned", icon: UserCheck },
        { label: m.stat4, value: language === "bn" ? "১৬ টি" : "16 Rooms", icon: School },
      ]}
      columns={[m.col1, m.col2, m.col3, m.col4, m.col5, m.col6]}
      data={[
        [
          <span key="1" className="font-semibold text-foreground">
            {language === "bn" ? "শাখা ক (পদ্মা)" : "Section A (Padma)"}
          </span>,
          language === "bn" ? "প্রথম শ্রেণি" : "Class 1",
          language === "bn" ? "মোসাঃ শামীমা নাসরীন" : "Shamima Nasreen",
          language === "bn" ? "কক্ষ ১০১" : "Room 101",
          language === "bn" ? "৪৮ জন" : "48 Students",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.active}</Badge>,
        ],
        [
          <span key="2" className="font-semibold text-foreground">
            {language === "bn" ? "শাখা খ (মেঘনা)" : "Section B (Meghna)"}
          </span>,
          language === "bn" ? "প্রথম শ্রেণি" : "Class 1",
          language === "bn" ? "জনাব আব্দুর রহমান" : "Abdur Rahman",
          language === "bn" ? "কক্ষ ১০২" : "Room 102",
          language === "bn" ? "৪৭ জন" : "47 Students",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.active}</Badge>,
        ],
        [
          <span key="3" className="font-semibold text-foreground">
            {language === "bn" ? "শাখা ক (যমুনা)" : "Section A (Jamuna)"}
          </span>,
          language === "bn" ? "দ্বিতীয় শ্রেণি" : "Class 2",
          language === "bn" ? "মোসাঃ ফারহানা হক" : "Farhana Haque",
          language === "bn" ? "কক্ষ ২০১" : "Room 201",
          language === "bn" ? "৪৬ জন" : "46 Students",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.active}</Badge>,
        ],
        [
          <span key="4" className="font-semibold text-foreground">
            {language === "bn" ? "শাখা ক (সুরমা)" : "Section A (Surma)"}
          </span>,
          language === "bn" ? "পঞ্চম শ্রেণি" : "Class 5",
          language === "bn" ? "জনাব শফিকুল ইসলাম" : "Shafiqul Islam",
          language === "bn" ? "কক্ষ ৩০১" : "Room 301",
          language === "bn" ? "৩৫ জন" : "35 Students",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.active}</Badge>,
        ],
      ]}
      notice={m.notice}
    />
  );
}
