"use client";

import * as React from "react";
import { Clock, Sun, Moon } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n";

export default function ShiftsPage() {
  const { dict, language } = useLanguage();
  const m = dict.modules.shifts;

  return (
    <ModulePageView
      title={m.title}
      englishTitle={language === "bn" ? "Shifts & Timing Management" : undefined}
      description={m.subtitle}
      icon={Clock}
      badge={m.badge}
      actionText={m.action}
      stats={[
        { label: m.stat1, value: language === "bn" ? "২ টি" : "2 Shifts", icon: Clock },
        { label: m.stat2, value: "07:00 - 11:45", icon: Sun },
        { label: m.stat3, value: "12:00 - 04:30", icon: Moon },
        { label: m.stat4, value: "100%", change: language === "bn" ? "সর্বোচ্চ আসন" : "Full Capacity" },
      ]}
      columns={[m.col1, m.col2, m.col3, m.col4, m.col5, m.col6]}
      data={[
        [
          <span key="1" className="font-semibold text-foreground">
            {language === "bn" ? "প্রভাতী শিফট (Morning Shift)" : "Morning Shift"}
          </span>,
          language === "bn" ? "০৭:০০ পূর্বাহ্ণ" : "07:00 AM",
          language === "bn" ? "১১:৪৫ পূর্বাহ্ণ" : "11:45 AM",
          language === "bn" ? "প্রাক-প্রাথমিক, ১ম ও ২য় শ্রেণি" : "Pre-Primary, Class 1 & 2",
          language === "bn" ? "৩৫০ জন" : "350 Students",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
            🟢 {dict.common.active}
          </Badge>,
        ],
        [
          <span key="2" className="font-semibold text-foreground">
            {language === "bn" ? "দিবা শিফট (Day Shift)" : "Day Shift"}
          </span>,
          language === "bn" ? "১২:০০ অপরাহ্ন" : "12:00 PM",
          language === "bn" ? "০৪:৩০ অপরাহ্ন" : "04:30 PM",
          language === "bn" ? "৩য়, ৪র্থ ও ৫ম শ্রেণি" : "Class 3, 4 & 5",
          language === "bn" ? "৪৫০ জন" : "450 Students",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
            🟢 {dict.common.active}
          </Badge>,
        ],
      ]}
      notice={m.notice}
    />
  );
}
