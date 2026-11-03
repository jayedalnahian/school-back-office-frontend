"use client";

import * as React from "react";
import { HeartHandshake, Phone, MessageSquare } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";

export default function GuardiansPage() {
  return (
    <ModulePageView
      title="অভিভাবকবৃন্দ ও জরুরি যোগাযোগ"
      englishTitle="Guardians Directory"
      description="শিক্ষার্থীদের পিতা, মাতা ও দায়িত্বপ্রাপ্ত স্থানীয় অভিভাবকদের ডিরেক্টরি"
      icon={HeartHandshake}
      badge="স্টেকহোল্ডার"
      actionText="নতুন অভিভাবক এন্ট্রি"
      stats={[
        { label: "নিবন্ধিত অভিভাবক", value: "৬৫০ জন", icon: HeartHandshake },
        { label: "সক্রিয় মোবাইল সংযোগ", value: "৬৫০ টি", icon: Phone },
        { label: "এসএমএস বিজ্ঞপ্তি প্রেরিত", value: "১,২৫০ টি", icon: MessageSquare },
        { label: "অভিভাবক সমাবেশ হার", value: "৮৮%", change: "সর্বশেষ সমাবেশ" },
      ]}
      columns={["অভিভাবকের নাম", "সম্পর্ক", "শিক্ষার্থীর নাম ও শ্রেণি", "মোবাইল নম্বর", "পেশা ও ঠিকানা", "যাচাই স্ট্যাটাস"]}
      data={[
        [
          <span key="1" className="font-semibold text-foreground">মোঃ আনোয়ার হোসেন</span>,
          "পিতা",
          "আহসান হাবীব (পঞ্চম শ্রেণি)",
          "01711223344",
          "ব্যবসায়ী, ধানমন্ডি আ/এ",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 ভেরিফাইড</Badge>,
        ],
        [
          <span key="2" className="font-semibold text-foreground">মোসাঃ রাবেয়া বসরী</span>,
          "মাতা",
          "ফাতিমা তুজ জোহরা (পঞ্চম শ্রেণি)",
          "01811223344",
          "গৃহিণী, লালমাটিয়া",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 ভেরিফাইড</Badge>,
        ],
        [
          <span key="3" className="font-semibold text-foreground">মোঃ মোস্তফা কামাল</span>,
          "পিতা",
          "তানভীর আহমেদ (প্রথম শ্রেণি)",
          "01911223344",
          "চাকরিজীবী, কলাবাগান",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 ভেরিফাইড</Badge>,
        ],
      ]}
      searchPlaceholder="অভিভাবকের নাম বা মোবাইল নম্বর দিয়ে খুঁজুন..."
      notice="শিক্ষার্থীর অনুপস্থিতি, জরুরি ছুটি বা পরীক্ষার ফলাফল সংক্রান্ত সকল অফিশিয়াল নোটিফিকেশন এই মোবাইল নম্বরে স্বয়ংক্রিয়ভাবে প্রেরিত হবে।"
    />
  );
}
