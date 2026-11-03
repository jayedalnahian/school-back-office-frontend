"use client";

import * as React from "react";
import { Layers, UserCheck, Users, School } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";

export default function SectionsPage() {
  return (
    <ModulePageView
      title="শাখা ও সেকশন বিন্যাস"
      englishTitle="Sections & Streams Management"
      description="শ্রেণিভিত্তিক শাখা গঠন, কক্ষ নম্বর বরাদ্দ এবং শ্রেণি শিক্ষক নির্ধারণ"
      icon={Layers}
      badge="একাডেমিক কাঠামো"
      actionText="নতুন শাখা যুক্ত করুন"
      stats={[
        { label: "মোট সক্রিয় শাখা", value: "১৬ টি", icon: Layers },
        { label: "গড় শাখা আকার", value: "৪৫ জন", icon: Users },
        { label: "শ্রেণি শিক্ষক নিযুক্ত", value: "১৬ জন", change: "১০০% কভার্ড", icon: UserCheck },
        { label: "শ্রেণিকক্ষ সংখ্যা", value: "১৬ টি", icon: School },
      ]}
      columns={["শাখার নাম", "সম্পর্কিত শ্রেণি", "শ্রেণি শিক্ষক", "কক্ষ নম্বর", "শিক্ষার্থী সংখ্যা", "অবস্থা"]}
      data={[
        [
          <span key="1" className="font-semibold text-foreground">শাখা ক (পদ্মা)</span>,
          "প্রথম শ্রেণি",
          "মোসাঃ শামীমা নাসরীন",
          "কক্ষ ১০১",
          "৪৮ জন",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 সক্রিয়</Badge>,
        ],
        [
          <span key="2" className="font-semibold text-foreground">শাখা খ (মেঘনা)</span>,
          "প্রথম শ্রেণি",
          "জনাব আব্দুর রহমান",
          "কক্ষ ১০২",
          "৪৭ জন",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 সক্রিয়</Badge>,
        ],
        [
          <span key="3" className="font-semibold text-foreground">শাখা ক (যমুনা)</span>,
          "দ্বিতীয় শ্রেণি",
          "মোসাঃ ফারহানা হক",
          "কক্ষ ২০১",
          "৪৬ জন",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 সক্রিয়</Badge>,
        ],
        [
          <span key="4" className="font-semibold text-foreground">শাখা ক (সুরমা)</span>,
          "পঞ্চম শ্রেণি",
          "জনাব শফিকুল ইসলাম",
          "কক্ষ ৩০১",
          "৩৫ জন",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 সক্রিয়</Badge>,
        ],
      ]}
      searchPlaceholder="শাখা বা শ্রেণি শিক্ষকের নাম দিয়ে খুঁজুন..."
      notice="প্রতিটি শাখার জন্য একজন দায়িত্বপ্রাপ্ত শ্রেণি শিক্ষক থাকতে হবে, যিনি দৈনিক হাজিরা এবং শিক্ষার্থী প্রোফাইল হালনাগাদের দায়িত্বে থাকবেন।"
    />
  );
}

