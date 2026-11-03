"use client";

import * as React from "react";
import { UserRound, Users, Award } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n";

export default function StudentsPage() {
  const { dict, language } = useLanguage();
  const m = dict.modules.students;

  return (
    <ModulePageView
      title={m.title}
      englishTitle={language === "bn" ? "Students Directory" : undefined}
      description={m.subtitle}
      icon={UserRound}
      badge={m.badge}
      actionText={m.action}
      stats={[
        { label: m.stat1, value: language === "bn" ? "৭২০ জন" : "720 Students", icon: Users },
        { label: m.stat2, value: language === "bn" ? "৩৫০ জন" : "350 Boys", icon: UserRound },
        { label: m.stat3, value: language === "bn" ? "৩৭০ জন" : "370 Girls", change: language === "bn" ? "৫১.৪% নারী শিক্ষা" : "51.4% Female Education" },
        { label: m.stat4, value: language === "bn" ? "৫৪০ জন" : "540 Stipend", icon: Award },
      ]}
      columns={[m.col1, m.col2, m.col3, m.col4, m.col5, m.col6]}
      data={[
        [
          <span key="1" className="font-mono font-bold">01</span>,
          <span key="name" className="font-semibold text-foreground">{language === "bn" ? "আহসান হাবীব" : "Ahsan Habib"}</span>,
          language === "bn" ? "পঞ্চম শ্রেণি (সুরমা)" : "Class 5 (Surma)",
          "20152692518001234",
          language === "bn" ? "মোঃ আনোয়ার হোসেন (01711223344)" : "Md. Anwar Hossain (01711223344)",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {language === "bn" ? "নিয়মিত" : "Regular"}</Badge>,
        ],
        [
          <span key="2" className="font-mono font-bold">02</span>,
          <span key="name" className="font-semibold text-foreground">{language === "bn" ? "ফাতিমা তুজ জোহরা" : "Fatima Tuz Zohra"}</span>,
          language === "bn" ? "পঞ্চম শ্রেণি (সুরমা)" : "Class 5 (Surma)",
          "20152692518001235",
          language === "bn" ? "মোঃ আব্দুল করিম (01811223344)" : "Md. Abdul Karim (01811223344)",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {language === "bn" ? "নিয়মিত" : "Regular"}</Badge>,
        ],
        [
          <span key="3" className="font-mono font-bold">01</span>,
          <span key="name" className="font-semibold text-foreground">{language === "bn" ? "তানভীর আহমেদ" : "Tanvir Ahmed"}</span>,
          language === "bn" ? "প্রথম শ্রেণি (পদ্মা)" : "Class 1 (Padma)",
          "20192692518005678",
          language === "bn" ? "মোঃ মোস্তফা কামাল (01911223344)" : "Md. Mostafa Kamal (01911223344)",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {language === "bn" ? "নিয়মিত" : "Regular"}</Badge>,
        ],
      ]}
      notice={m.notice}
    />
  );
}
