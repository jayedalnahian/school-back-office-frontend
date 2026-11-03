"use client";

import * as React from "react";
import { BookOpen, CheckCircle2, FileText, Layers } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";

export default function SubjectsPage() {
  return (
    <ModulePageView
      title="পাঠ্যবিষয় ও জাতীয় কারিকুলাম"
      englishTitle="Subjects & Curriculum Management"
      description="জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুমোদিত প্রাথমিক পাঠ্যবিষয় তালিকা"
      icon={BookOpen}
      badge="একাডেমিক কাঠামো"
      actionText="নতুন পাঠ্যবিষয় যুক্ত করুন"
      stats={[
        { label: "মোট পাঠ্যবিষয়", value: "১০ টি", icon: BookOpen },
        { label: "আবশ্যিক বিষয়", value: "৬ টি", change: "১ম - ৫ম শ্রেণি", icon: CheckCircle2 },
        { label: "ধর্ম ও নৈতিক শিক্ষা", value: "৪ টি", icon: FileText },
        { label: "অনুমোদিত কারিকুলাম", value: "NCTB ২০২৬", icon: Layers },
      ]}
      columns={["বিষয়ের নাম", "বিষয় কোড", "প্রযোজ্য শ্রেণি", "পূর্ণমান", "সাপ্তাহিক পিরিয়ড", "ধরন"]}
      data={[
        [
          <span key="1" className="font-semibold text-foreground">আমার বাংলা বই</span>,
          "BAN-101",
          "১ম - ৫ম শ্রেণি",
          "১০০",
          "৬ টি পিরিয়ড",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 আবশ্যিক</Badge>,
        ],
        [
          <span key="2" className="font-semibold text-foreground">English for Today</span>,
          "ENG-102",
          "১ম - ৫ম শ্রেণি",
          "১০০",
          "৬ টি পিরিয়ড",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 আবশ্যিক</Badge>,
        ],
        [
          <span key="3" className="font-semibold text-foreground">প্রাথমিক গণিত</span>,
          "MAT-103",
          "১ম - ৫ম শ্রেণি",
          "১০০",
          "৬ টি পিরিয়ড",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 আবশ্যিক</Badge>,
        ],
        [
          <span key="4" className="font-semibold text-foreground">প্রাথমিক বিজ্ঞান</span>,
          "SCI-104",
          "৩য় - ৫ম শ্রেণি",
          "১০০",
          "৫ টি পিরিয়ড",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 আবশ্যিক</Badge>,
        ],
        [
          <span key="5" className="font-semibold text-foreground">বাংলাদেশ ও বিশ্বপরিচয়</span>,
          "BGS-105",
          "৩য় - ৫ম শ্রেণি",
          "১০০",
          "৫ টি পিরিয়ড",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 আবশ্যিক</Badge>,
        ],
      ]}
      searchPlaceholder="পাঠ্যবিষয়ের নাম বা কোড দিয়ে খুঁজুন..."
      notice="নতুন যোগ্যতাভিত্তিক শিক্ষাক্রম অনুসারে প্রতিটি বিষয়ের জন্য পারদর্শিতা নির্দেশক (PI) এবং শিখন কার্যক্রম যথাযথভাবে অনুসরণ করতে হবে।"
    />
  );
}

