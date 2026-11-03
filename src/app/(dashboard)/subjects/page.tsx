"use client";

import * as React from "react";
import { BookOpen, CheckCircle2, FileText, Layers } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n";

export default function SubjectsPage() {
  const { dict, language } = useLanguage();
  const m = dict.modules.subjects;

  return (
    <ModulePageView
      title={m.title}
      englishTitle={language === "bn" ? "Subjects & Curriculum Management" : undefined}
      description={m.subtitle}
      icon={BookOpen}
      badge={m.badge}
      actionText={m.action}
      stats={[
        { label: m.stat1, value: language === "bn" ? "১০ টি" : "10 Subjects", icon: BookOpen },
        { label: m.stat2, value: language === "bn" ? "৬ টি" : "6 Subjects", change: language === "bn" ? "১ম - ৫ম শ্রেণি" : "Class 1-5", icon: CheckCircle2 },
        { label: m.stat3, value: language === "bn" ? "৪ টি" : "4 Subjects", icon: FileText },
        { label: m.stat4, value: "NCTB 2026", icon: Layers },
      ]}
      columns={[m.col1, m.col2, m.col3, m.col4, m.col5, m.col6]}
      data={[
        [
          <span key="1" className="font-semibold text-foreground">
            {language === "bn" ? "আমার বাংলা বই" : "Amar Bangla Boi (Bangla)"}
          </span>,
          "BAN-101",
          language === "bn" ? "১ম - ৫ম শ্রেণি" : "Class 1-5",
          "100",
          language === "bn" ? "৬ টি পিরিয়ড" : "6 Periods/week",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {language === "bn" ? "আবশ্যিক" : "Compulsory"}</Badge>,
        ],
        [
          <span key="2" className="font-semibold text-foreground">
            English for Today
          </span>,
          "ENG-102",
          language === "bn" ? "১ম - ৫ম শ্রেণি" : "Class 1-5",
          "100",
          language === "bn" ? "৬ টি পিরিয়ড" : "6 Periods/week",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {language === "bn" ? "আবশ্যিক" : "Compulsory"}</Badge>,
        ],
        [
          <span key="3" className="font-semibold text-foreground">
            {language === "bn" ? "প্রাথমিক গণিত" : "Elementary Mathematics"}
          </span>,
          "MAT-103",
          language === "bn" ? "১ম - ৫ম শ্রেণি" : "Class 1-5",
          "100",
          language === "bn" ? "৬ টি পিরিয়ড" : "6 Periods/week",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {language === "bn" ? "আবশ্যিক" : "Compulsory"}</Badge>,
        ],
        [
          <span key="4" className="font-semibold text-foreground">
            {language === "bn" ? "প্রাথমিক বিজ্ঞান" : "Elementary Science"}
          </span>,
          "SCI-104",
          language === "bn" ? "৩য় - ৫ম শ্রেণি" : "Class 3-5",
          "100",
          language === "bn" ? "৫ টি পিরিয়ড" : "5 Periods/week",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {language === "bn" ? "আবশ্যিক" : "Compulsory"}</Badge>,
        ],
        [
          <span key="5" className="font-semibold text-foreground">
            {language === "bn" ? "বাংলাদেশ ও বিশ্বপরিচয়" : "Bangladesh & Global Studies"}
          </span>,
          "BGS-105",
          language === "bn" ? "৩য় - ৫ম শ্রেণি" : "Class 3-5",
          "100",
          language === "bn" ? "৫ টি পিরিয়ড" : "5 Periods/week",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {language === "bn" ? "আবশ্যিক" : "Compulsory"}</Badge>,
        ],
      ]}
      notice={m.notice}
    />
  );
}
