"use client";

import * as React from "react";
import { HeartHandshake, Phone, MessageSquare } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n";

export default function GuardiansPage() {
  const { dict, language } = useLanguage();
  const m = dict.modules.guardians;

  return (
    <ModulePageView
      title={m.title}
      englishTitle={language === "bn" ? "Guardians Directory" : undefined}
      description={m.subtitle}
      icon={HeartHandshake}
      badge={m.badge}
      actionText={m.action}
      stats={[
        { label: m.stat1, value: language === "bn" ? "৬৫০ জন" : "650 Guardians", icon: HeartHandshake },
        { label: m.stat2, value: language === "bn" ? "৬৫০ টি" : "650 Active", icon: Phone },
        { label: m.stat3, value: language === "bn" ? "১,২৫০ টি" : "1,250 SMS", icon: MessageSquare },
        { label: m.stat4, value: "88%", change: language === "bn" ? "সর্বশেষ সমাবেশ" : "Last Meeting" },
      ]}
      columns={[m.col1, m.col2, m.col3, m.col4, m.col5, m.col6]}
      data={[
        [
          <span key="1" className="font-semibold text-foreground">
            {language === "bn" ? "মোঃ আনোয়ার হোসেন" : "Md. Anwar Hossain"}
          </span>,
          language === "bn" ? "পিতা" : "Father",
          language === "bn" ? "আহসান হাবীব (পঞ্চম শ্রেণি)" : "Ahsan Habib (Class 5)",
          "01711223344",
          language === "bn" ? "ব্যবসায়ী, ধানমন্ডি আ/এ" : "Businessman, Dhanmondi",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.verified}</Badge>,
        ],
        [
          <span key="2" className="font-semibold text-foreground">
            {language === "bn" ? "মোসাঃ রাবেয়া বসরী" : "Rabeya Basri"}
          </span>,
          language === "bn" ? "মাতা" : "Mother",
          language === "bn" ? "ফাতিমা তুজ জোহরা (পঞ্চম শ্রেণি)" : "Fatima Tuz Zohra (Class 5)",
          "01811223344",
          language === "bn" ? "গৃহিণী, লালমাটিয়া" : "Homemaker, Lalmatia",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.verified}</Badge>,
        ],
        [
          <span key="3" className="font-semibold text-foreground">
            {language === "bn" ? "মোঃ মোস্তফা কামাল" : "Md. Mostafa Kamal"}
          </span>,
          language === "bn" ? "পিতা" : "Father",
          language === "bn" ? "তানভীর আহমেদ (প্রথম শ্রেণি)" : "Tanvir Ahmed (Class 1)",
          "01911223344",
          language === "bn" ? "চাকরিজীবী, কলাবাগান" : "Service, Kalabagan",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 {dict.common.verified}</Badge>,
        ],
      ]}
      notice={m.notice}
    />
  );
}
