"use client";

import * as React from "react";
import { UserCheck, ShieldCheck } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";

export default function TeachersPage() {
  return (
    <ModulePageView
      title="শিক্ষকমণ্ডলী তালিকা ও প্রোফাইল"
      englishTitle="Teachers Management"
      description="বিদ্যালয়ের প্রধান শিক্ষক, সহকারী শিক্ষক এবং বিষয়ভিত্তিক শিক্ষক তথ্যভাণ্ডার"
      icon={UserCheck}
      badge="স্টেকহোল্ডার"
      actionText="নতুন শিক্ষক নিয়োগ/যুক্ত করুন"
      stats={[
        { label: "মোট শিক্ষক সংখ্যা", value: "১৮ জন", icon: UserCheck },
        { label: "প্রধান শিক্ষক", value: "১ জন", icon: ShieldCheck },
        { label: "সহকারী শিক্ষক", value: "১৭ জন", change: "অনুমোদিত পদের ১০০%" },
        { label: "আজকের উপস্থিতি", value: "১৮/১৮ জন", change: "১০০% উপস্থিত" },
      ]}
      columns={["শিক্ষকের নাম", "পদবি", "মোবাইল নম্বর", "ইমেইল", "নিযুক্ত শ্রেণি/বিষয়", "অবস্থা"]}
      data={[
        [
          <span key="1" className="font-semibold text-foreground">ড. মোহাম্মদ রফিকুল ইসলাম</span>,
          "প্রধান শিক্ষক (Head Teacher)",
          "01711002233",
          "head@school.edu.bd",
          "সার্বিক প্রশাসন ও ব্যবস্থাপনা",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 কর্মরত</Badge>,
        ],
        [
          <span key="2" className="font-semibold text-foreground">মোসাঃ শামীমা নাসরীন</span>,
          "সহকারী শিক্ষক (Assistant Teacher)",
          "01712334455",
          "shamima@school.edu.bd",
          "বাংলা ও সামাজিক বিজ্ঞান",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 কর্মরত</Badge>,
        ],
        [
          <span key="3" className="font-semibold text-foreground">জনাব আব্দুর রহমান</span>,
          "সহকারী শিক্ষক (Assistant Teacher)",
          "01812998877",
          "rahman@school.edu.bd",
          "গণিত ও বিজ্ঞান",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 কর্মরত</Badge>,
        ],
        [
          <span key="4" className="font-semibold text-foreground">মোসাঃ ফারহানা হক</span>,
          "সহকারী শিক্ষক (Assistant Teacher)",
          "01912445566",
          "farhana@school.edu.bd",
          "ইংরেজি ও চারু-কারুকলা",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 কর্মরত</Badge>,
        ],
      ]}
      searchPlaceholder="শিক্ষকের নাম, মোবাইল বা বিষয় দিয়ে খুঁজুন..."
      notice="শিক্ষকদের বাৎসরিক পারফরম্যান্স মূল্যায়ন (ACR) এবং ডিজিটাল হাজিরা রিপোর্ট প্রাথমিক শিক্ষা অধিদপ্তরের সার্ভারে স্বয়ংক্রিয়ভাবে সিঙ্ক হয়।"
    />
  );
}
