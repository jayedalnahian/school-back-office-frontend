"use client";

import * as React from "react";
import { CheckSquare, Users, AlertCircle, CheckCircle2 } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";

export default function AttendancesPage() {
  return (
    <ModulePageView
      title="দৈনিক উপস্থিতি ও ডিজিটাল হাজিরা"
      englishTitle="Attendances Management"
      description="শ্রেণিভিত্তিক শিক্ষার্থী ও শিক্ষকদের প্রতিদিনের ডিজিটাল উপস্থিতি ও প্রতিবেদন"
      icon={CheckSquare}
      badge="দৈনন্দিন কার্যক্রম"
      actionText="আজকের হাজিরা গ্রহণ করুন"
      stats={[
        { label: "আজকের উপস্থিতি হার", value: "৯৪.২%", change: "+১.৫% বৃদ্ধি", icon: CheckSquare },
        { label: "মোট উপস্থিত শিক্ষার্থী", value: "৬৭৮ জন", icon: Users },
        { label: "অনুপস্থিত শিক্ষার্থী", value: "৪২ জন", icon: AlertCircle },
        { label: "শিক্ষক উপস্থিতি হার", value: "১০০%", change: "১৮/১৮ জন", icon: CheckCircle2 },
      ]}
      columns={["তারিখ", "শ্রেণি ও শাখা", "মোট শিক্ষার্থী", "উপস্থিত", "অনুপস্থিত", "শতকরা হার", "হাজিরা গ্রহণকারী"]}
      data={[
        [
          <span key="1" className="font-semibold text-foreground">আজকের দিন</span>,
          "পঞ্চম শ্রেণি (সুরমা)",
          "৩৫ জন",
          "৩৪ জন",
          "১ জন",
          <Badge key="pct" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-mono">৯৭.১%</Badge>,
          "জনাব শফিকুল ইসলাম",
        ],
        [
          <span key="2" className="font-semibold text-foreground">আজকের দিন</span>,
          "প্রথম শ্রেণি (পদ্মা)",
          "৪৮ জন",
          "৪৬ জন",
          "২ জন",
          <Badge key="pct2" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-mono">৯৫.৮%</Badge>,
          "মোসাঃ শামীমা নাসরীন",
        ],
        [
          <span key="3" className="font-semibold text-foreground">আজকের দিন</span>,
          "দ্বিতীয় শ্রেণি (ক)",
          "৪৬ জন",
          "৪৩ জন",
          "৩ জন",
          <Badge key="pct3" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-mono">৯৩.৫%</Badge>,
          "মোসাঃ ফারহানা হক",
        ],
        [
          <span key="4" className="font-semibold text-foreground">আজকের দিন</span>,
          "তৃতীয় শ্রেণি (ক)",
          "৫০ জন",
          "৪৭ জন",
          "৩ জন",
          <Badge key="pct4" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-mono">৯৪.০%</Badge>,
          "জনাব আব্দুর রহমান",
        ],
      ]}
      searchPlaceholder="শ্রেণি, শিক্ষক বা তারিখ দিয়ে খুঁজুন..."
      notice="ধারাবাহিক তিন দিন কোনো শিক্ষার্থী অনুপস্থিত থাকলে শ্রেণি শিক্ষককে উক্ত শিক্ষার্থীর অভিভাবকের সাথে সরাসরি ফোনে যোগাযোগ করার নির্দেশ দেওয়া যাচ্ছে।"
    />
  );
}

