"use client";

import * as React from "react";
import { ClipboardList, UserPlus, CheckCircle2, FileText } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";

export default function EnrollmentsPage() {
  return (
    <ModulePageView
      title="ভর্তি, রোল ও রেজিস্ট্রেশন"
      englishTitle="Enrollments & Registration"
      description="নতুন শিক্ষাবর্ষে শিক্ষার্থী ভর্তি, রোল নম্বর বরাদ্দ ও ছাড়পত্র (TC) ব্যবস্থাপনা"
      icon={ClipboardList}
      badge="দৈনন্দিন কার্যক্রম"
      actionText="নতুন শিক্ষার্থী ভর্তি করুন"
      stats={[
        { label: "চলতি বছরে মোট ভর্তি", value: "১৬৫ জন", icon: UserPlus },
        { label: "প্রাক-প্রাথমিক ভর্তি", value: "৯৫ জন", change: "নতুন ব্যাচ" },
        { label: "ছাড়পত্র (TC) এন্ট্রি", value: "১২ জন", icon: FileText },
        { label: "অনুমোদনের অপেক্ষায়", value: "৫ টি", icon: CheckCircle2 },
      ]}
      columns={["ভর্তি আইডি", "শিক্ষার্থীর নাম", "ভর্তিকৃত শ্রেণি", "ভর্তির তারিখ", "পূর্ববর্তী বিদ্যালয়", "অবস্থা"]}
      data={[
        [
          <span key="1" className="font-mono font-bold text-foreground">ENR-2026-001</span>,
          "আহসান হাবীব",
          "পঞ্চম শ্রেণি",
          "০১ জানুয়ারি ২০২৬",
          "আদর্শ সরকারি প্রাথমিক বিদ্যালয়",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 অনুমোদিত</Badge>,
        ],
        [
          <span key="2" className="font-mono font-bold text-foreground">ENR-2026-002</span>,
          "ফাতিমা তুজ জোহরা",
          "পঞ্চম শ্রেণি",
          "০১ জানুয়ারি ২০২৬",
          "আদর্শ সরকারি প্রাথমিক বিদ্যালয়",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 অনুমোদিত</Badge>,
        ],
        [
          <span key="3" className="font-mono font-bold text-foreground">ENR-2026-003</span>,
          "তানভীর আহমেদ",
          "প্রথম শ্রেণি",
          "০৫ জানুয়ারি ২০২৬",
          "নতুন শিক্ষার্থী (সরাসরি ভর্তি)",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 অনুমোদিত</Badge>,
        ],
        [
          <span key="4" className="font-mono font-bold text-foreground">ENR-2026-004</span>,
          "আরিফুল ইসলাম",
          "চতুর্থ শ্রেণি",
          "১০ জানুয়ারি ২০২৬",
          "মিরপুর মডেল সরকারি প্রাথমিক বিদ্যালয় (TC)",
          <Badge key="status" className="bg-amber-500/10 text-amber-600 border-amber-500/20">🟡 যাচাইাধীন</Badge>,
        ],
      ]}
      searchPlaceholder="ভর্তি আইডি, শিক্ষার্থীর নাম বা শ্রেণি দিয়ে খুঁজুন..."
      notice="সরকারি নীতিমালা অনুসারে প্রাথমিক বিদ্যালয়ে ভর্তির ক্ষেত্রে কোনো প্রকার পরীক্ষা গ্রহণ করা যাবে না এবং ৫+ বছর বয়সী সকল শিশুর ভর্তি নিশ্চিত করতে হবে।"
    />
  );
}

