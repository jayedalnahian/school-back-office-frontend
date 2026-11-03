"use client";

import * as React from "react";
import { GraduationCap, Users, Layers } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n";

export default function ClassesPage() {
  const { dict, language } = useLanguage();
  const m = dict.modules.classes;

  return (
    <ModulePageView
      title={m.title}
      englishTitle={language === "bn" ? "Classes & Capacity Management" : undefined}
      description={m.subtitle}
      icon={GraduationCap}
      badge={m.badge}
      actionText={m.action}
      stats={[
        { label: m.stat1, value: language === "bn" ? "৬ টি" : "6 Classes", icon: GraduationCap },
        { label: m.stat2, value: language === "bn" ? "৮০০ জন" : "800 Seats", icon: Users },
        { label: m.stat3, value: language === "bn" ? "৭২০ জন" : "720 Enrolled", change: language === "bn" ? "৯০% ভর্তি সম্পন্ন" : "90% Enrolled" },
        { label: m.stat4, value: language === "bn" ? "১৬ টি" : "16 Sections", icon: Layers },
      ]}
      columns={[m.col1, m.col2, m.col3, m.col4, m.col5, m.col6]}
      data={[
        [
          <span key="1" className="font-semibold text-foreground">
            {language === "bn" ? "প্রাক-প্রাথমিক (Pre-Primary)" : "Pre-Primary"}
          </span>,
          "CLS-00",
          language === "bn" ? "২ টি শাখা" : "2 Sections",
          language === "bn" ? "১০০ জন" : "100 Seats",
          language === "bn" ? "৯৫ জন" : "95 Enrolled",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.active}</Badge>,
        ],
        [
          <span key="2" className="font-semibold text-foreground">
            {language === "bn" ? "প্রথম শ্রেণি (Class 1)" : "Class 1"}
          </span>,
          "CLS-01",
          language === "bn" ? "৩ টি শাখা" : "3 Sections",
          language === "bn" ? "১৫০ জন" : "150 Seats",
          language === "bn" ? "১৪২ জন" : "142 Enrolled",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.active}</Badge>,
        ],
        [
          <span key="3" className="font-semibold text-foreground">
            {language === "bn" ? "দ্বিতীয় শ্রেণি (Class 2)" : "Class 2"}
          </span>,
          "CLS-02",
          language === "bn" ? "৩ টি শাখা" : "3 Sections",
          language === "bn" ? "১৫০ জন" : "150 Seats",
          language === "bn" ? "১৩৮ জন" : "138 Enrolled",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.active}</Badge>,
        ],
        [
          <span key="4" className="font-semibold text-foreground">
            {language === "bn" ? "তৃতীয় শ্রেণি (Class 3)" : "Class 3"}
          </span>,
          "CLS-03",
          language === "bn" ? "৩ টি শাখা" : "3 Sections",
          language === "bn" ? "১৫০ জন" : "150 Seats",
          language === "bn" ? "১৪৫ জন" : "145 Enrolled",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.active}</Badge>,
        ],
        [
          <span key="5" className="font-semibold text-foreground">
            {language === "bn" ? "চতুর্থ শ্রেণি (Class 4)" : "Class 4"}
          </span>,
          "CLS-04",
          language === "bn" ? "৩ টি শাখা" : "3 Sections",
          language === "bn" ? "১৫০ জন" : "150 Seats",
          language === "bn" ? "১৩০ জন" : "130 Enrolled",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.active}</Badge>,
        ],
        [
          <span key="6" className="font-semibold text-foreground">
            {language === "bn" ? "পঞ্চম শ্রেণি (Class 5)" : "Class 5"}
          </span>,
          "CLS-05",
          language === "bn" ? "২ টি শাখা" : "2 Sections",
          language === "bn" ? "১০০ জন" : "100 Seats",
          language === "bn" ? "৭০ জন" : "70 Enrolled",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.active}</Badge>,
        ],
      ]}
      notice={m.notice}
    />
  );
}
