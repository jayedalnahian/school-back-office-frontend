"use client";

import * as React from "react";
import { UserCheck, ShieldCheck } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n";

export default function TeachersPage() {
  const { dict, language } = useLanguage();
  const m = dict.modules.teachers;

  return (
    <ModulePageView
      title={m.title}
      englishTitle={language === "bn" ? "Teachers Management" : undefined}
      description={m.subtitle}
      icon={UserCheck}
      badge={m.badge}
      actionText={m.action}
      stats={[
        { label: m.stat1, value: language === "bn" ? "১৮ জন" : "18 Teachers", icon: UserCheck },
        { label: m.stat2, value: language === "bn" ? "১ জন" : "1 Head Teacher", icon: ShieldCheck },
        { label: m.stat3, value: language === "bn" ? "১৭ জন" : "17 Assistants", change: language === "bn" ? "অনুমোদিত পদের ১০০%" : "100% Filled" },
        { label: m.stat4, value: "18/18", change: language === "bn" ? "১০০% উপস্থিত" : "100% Present" },
      ]}
      columns={[m.col1, m.col2, m.col3, m.col4, m.col5, m.col6]}
      data={[
        [
          <span key="1" className="font-semibold text-foreground">
            {language === "bn" ? "ড. মোহাম্মদ রফিকুল ইসলাম" : "Dr. Mohammad Rafiqul Islam"}
          </span>,
          language === "bn" ? "প্রধান শিক্ষক" : "Head Teacher",
          "01711002233",
          "head@school.edu.bd",
          language === "bn" ? "সার্বিক প্রশাসন ও ব্যবস্থাপনা" : "Overall Administration",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.active}</Badge>,
        ],
        [
          <span key="2" className="font-semibold text-foreground">
            {language === "bn" ? "মোসাঃ শামীমা নাসরীন" : "Shamima Nasreen"}
          </span>,
          language === "bn" ? "সহকারী শিক্ষক" : "Assistant Teacher",
          "01712334455",
          "shamima@school.edu.bd",
          language === "bn" ? "বাংলা ও সামাজিক বিজ্ঞান" : "Bangla & Social Science",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.active}</Badge>,
        ],
        [
          <span key="3" className="font-semibold text-foreground">
            {language === "bn" ? "জনাব আব্দুর রহমান" : "Abdur Rahman"}
          </span>,
          language === "bn" ? "সহকারী শিক্ষক" : "Assistant Teacher",
          "01812998877",
          "rahman@school.edu.bd",
          language === "bn" ? "গণিত ও বিজ্ঞান" : "Mathematics & Science",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.active}</Badge>,
        ],
        [
          <span key="4" className="font-semibold text-foreground">
            {language === "bn" ? "মোসাঃ ফারহানা হক" : "Farhana Haque"}
          </span>,
          language === "bn" ? "সহকারী শিক্ষক" : "Assistant Teacher",
          "01912445566",
          "farhana@school.edu.bd",
          language === "bn" ? "ইংরেজি ও চারু-কারুকলা" : "English & Arts",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.active}</Badge>,
        ],
      ]}
      notice={m.notice}
    />
  );
}
