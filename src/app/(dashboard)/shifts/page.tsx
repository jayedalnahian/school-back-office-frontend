"use client";

import * as React from "react";
import { Clock, Sun, Moon } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";

export default function ShiftsPage() {
  return (
    <ModulePageView
      title="শিফট ও সময়সূচি ব্যবস্থাপনা"
      englishTitle="Shifts & Timing Management"
      description="বিদ্যালয়ের প্রভাতী ও দিবা শিফটের সময়সীমা ও শ্রেণিভিত্তিক বরাদ্দ"
      icon={Clock}
      badge="একাডেমিক কাঠামো"
      actionText="নতুন শিফট কনফিগার করুন"
      stats={[
        { label: "মোট সক্রিয় শিফট", value: "২ টি", icon: Clock },
        { label: "প্রভাতী শিফট সময়", value: "০৭:০০ - ১১:৪৫", icon: Sun },
        { label: "দিবা শিফট সময়", value: "১২:০০ - ০৪:৩০", icon: Moon },
        { label: "মোট শিক্ষার্থী কাভারেজ", value: "১০০%", change: "সর্বোচ্চ আসন" },
      ]}
      columns={["শিফটের নাম", "শুরুর সময়", "সমাপ্তির সময়", "অন্তর্ভুক্ত শ্রেণিসমূহ", "শিক্ষার্থী ধারণক্ষমতা", "অবস্থা"]}
      data={[
        [
          <span key="1" className="font-semibold text-foreground">প্রভাতী শিফট (Morning Shift)</span>,
          "০৭:০০ পূর্বাহ্ণ",
          "১১:৪৫ পূর্বাহ্ণ",
          "প্রাক-প্রাথমিক, ১ম ও ২য় শ্রেণি",
          "৩৫০ জন",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 সক্রিয়</Badge>,
        ],
        [
          <span key="2" className="font-semibold text-foreground">দিবা শিফট (Day Shift)</span>,
          "১২:০০ অপরাহ্ন",
          "০৪:৩০ অপরাহ্ন",
          "৩য়, ৪র্থ ও ৫ম শ্রেণি",
          "৪৫০ জন",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 সক্রিয়</Badge>,
        ],
      ]}
      searchPlaceholder="শিফটের নাম বা শ্রেণি দিয়ে খুঁজুন..."
      notice="সরকারি প্রাথমিক বিদ্যালয়ের নীতি অনুযায়ী দুই শিফটে পরিচালিত বিদ্যালয়গুলোতে জাতীয় সংগীত ও প্রাত্যহিক সমাবেশের জন্য প্রতি শিফটে ১৫ মিনিট বরাদ্দ রাখতে হবে।"
    />
  );
}

