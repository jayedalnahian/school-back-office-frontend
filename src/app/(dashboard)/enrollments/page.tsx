"use client";

import * as React from "react";
import { ClipboardList, UserPlus, CheckCircle2, FileText } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n";

export default function EnrollmentsPage() {
  const { dict, language } = useLanguage();
  const m = dict.modules.enrollments;

  return (
    <ModulePageView
      title={m.title}
      englishTitle={language === "bn" ? "Enrollments & Registration" : undefined}
      description={m.subtitle}
      icon={ClipboardList}
      badge={m.badge}
      actionText={m.action}
      stats={[
        { label: m.stat1, value: language === "bn" ? "১৬৫ জন" : "165 Enrolled", icon: UserPlus },
        { label: m.stat2, value: language === "bn" ? "৯৫ জন" : "95 Pre-Primary", change: language === "bn" ? "নতুন ব্যাচ" : "New Batch" },
        { label: m.stat3, value: language === "bn" ? "১২ জন" : "12 TC", icon: FileText },
        { label: m.stat4, value: language === "bn" ? "৫ টি" : "5 Pending", icon: CheckCircle2 },
      ]}
      columns={[m.col1, m.col2, m.col3, m.col4, m.col5, m.col6]}
      data={[
        [
          <span key="1" className="font-mono font-bold text-foreground">ENR-2026-001</span>,
          language === "bn" ? "আহসান হাবীব" : "Ahsan Habib",
          language === "bn" ? "পঞ্চম শ্রেণি" : "Class 5",
          language === "bn" ? "০১ জানুয়ারি ২০২৬" : "01 Jan 2026",
          language === "bn" ? "আদর্শ সরকারি প্রাথমিক বিদ্যালয়" : "Adarsha Govt Primary School",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.verified}</Badge>,
        ],
        [
          <span key="2" className="font-mono font-bold text-foreground">ENR-2026-002</span>,
          language === "bn" ? "ফাতিমা তুজ জোহরা" : "Fatima Tuz Zohra",
          language === "bn" ? "পঞ্চম শ্রেণি" : "Class 5",
          language === "bn" ? "০১ জানুয়ারি ২০২৬" : "01 Jan 2026",
          language === "bn" ? "আদর্শ সরকারি প্রাথমিক বিদ্যালয়" : "Adarsha Govt Primary School",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.verified}</Badge>,
        ],
        [
          <span key="3" className="font-mono font-bold text-foreground">ENR-2026-003</span>,
          language === "bn" ? "তানভীর আহমেদ" : "Tanvir Ahmed",
          language === "bn" ? "প্রথম শ্রেণি" : "Class 1",
          language === "bn" ? "০৫ জানুয়ারি ২০২৬" : "05 Jan 2026",
          language === "bn" ? "নতুন শিক্ষার্থী (সরাসরি ভর্তি)" : "Direct Admission",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.verified}</Badge>,
        ],
        [
          <span key="4" className="font-mono font-bold text-foreground">ENR-2026-004</span>,
          language === "bn" ? "আরিফুল ইসলাম" : "Ariful Islam",
          language === "bn" ? "চতুর্থ শ্রেণি" : "Class 4",
          language === "bn" ? "১০ জানুয়ারি ২০২৬" : "10 Jan 2026",
          language === "bn" ? "মিরপুর মডেল সরকারি প্রাথমিক বিদ্যালয় (TC)" : "Mirpur Model GPS (TC)",
          <Badge key="status" className="bg-amber-500/10 text-amber-600 border-amber-500/20">🟡 {dict.dashboard.waitingForApproval}</Badge>,
        ],
      ]}
      notice={m.notice}
    />
  );
}
