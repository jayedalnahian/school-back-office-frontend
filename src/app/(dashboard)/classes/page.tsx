"use client";

import * as React from "react";
import { GraduationCap, Users, Layers } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";

export default function ClassesPage() {
  return (
    <ModulePageView
      title="শ্রেণি ব্যবস্থাপনা ও ক্যাপাসিটি"
      englishTitle="Classes & Capacity Management"
      description="প্রাক-প্রাথমিক থেকে পঞ্চম শ্রেণি পর্যন্ত অনুমোদিত আসন ও শিক্ষার্থীর তথ্য"
      icon={GraduationCap}
      badge="একাডেমিক কাঠামো"
      actionText="নতুন শ্রেণি যুক্ত করুন"
      stats={[
        { label: "মোট শ্রেণি", value: "৬ টি", icon: GraduationCap },
        { label: "অনুমোদিত আসন", value: "৮০০ জন", icon: Users },
        { label: "বর্তমান ভর্তি", value: "৭২০ জন", change: "৯০% ভর্তি সম্পন্ন" },
        { label: "মোট সক্রিয় শাখা", value: "১৬ টি", icon: Layers },
      ]}
      columns={["শ্রেণির নাম", "শ্রেণি কোড", "মোট শাখা", "অনুমোদিত আসন", "বর্তমান ভর্তি", "অবস্থা"]}
      data={[
        [
          <span key="1" className="font-semibold text-foreground">প্রাক-প্রাথমিক (Pre-Primary)</span>,
          "CLS-00",
          "২ টি শাখা",
          "১০০ জন",
          "৯৫ জন",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 সক্রিয়</Badge>,
        ],
        [
          <span key="2" className="font-semibold text-foreground">প্রথম শ্রেণি (Class 1)</span>,
          "CLS-01",
          "৩ টি শাখা",
          "১৫০ জন",
          "১৪২ জন",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 সক্রিয়</Badge>,
        ],
        [
          <span key="3" className="font-semibold text-foreground">দ্বিতীয় শ্রেণি (Class 2)</span>,
          "CLS-02",
          "৩ টি শাখা",
          "১৫০ জন",
          "১৩৮ জন",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 সক্রিয়</Badge>,
        ],
        [
          <span key="4" className="font-semibold text-foreground">তৃতীয় শ্রেণি (Class 3)</span>,
          "CLS-03",
          "৩ টি শাখা",
          "১৫০ জন",
          "১৪৫ জন",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 সক্রিয়</Badge>,
        ],
        [
          <span key="5" className="font-semibold text-foreground">চতুর্থ শ্রেণি (Class 4)</span>,
          "CLS-04",
          "৩ টি শাখা",
          "১৫০ জন",
          "১৩০ জন",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 সক্রিয়</Badge>,
        ],
        [
          <span key="6" className="font-semibold text-foreground">পঞ্চম শ্রেণি (Class 5)</span>,
          "CLS-05",
          "২ টি শাখা",
          "১০০ জন",
          "৭০ জন",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 সক্রিয়</Badge>,
        ],
      ]}
      searchPlaceholder="শ্রেণির নাম বা কোড দিয়ে খুঁজুন..."
      notice="শ্রেণি অনুযায়ী শিক্ষার্থীর ধারণক্ষমতা ও শিক্ষক-শিক্ষার্থী অনুপাত (১:৪০) বজায় রেখে প্রতিটি শ্রেণির শাখা বিভাজন করতে হবে।"
    />
  );
}
