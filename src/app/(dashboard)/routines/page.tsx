"use client";

import * as React from "react";
import { CalendarDays, Clock, BookOpen, Layers } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";

export default function RoutinesPage() {
  return (
    <ModulePageView
      title="ক্লাস রুটিন ও সময়সূচি"
      englishTitle="Class Routines Management"
      description="শ্রেণি ও শাখাভিত্তিক পিরিয়ড বণ্টন, শিক্ষক অ্যাসাইনমেন্ট ও সাপ্তাহিক সময়সূচি"
      icon={CalendarDays}
      badge="দৈনন্দিন কার্যক্রম"
      actionText="নতুন রুটিন প্রণয়ন করুন"
      stats={[
        { label: "সক্রিয় শ্রেণি রুটিন", value: "৬ টি", icon: CalendarDays },
        { label: "দৈনিক পিরিয়ড সংখ্যা", value: "৭ টি", icon: Clock },
        { label: "সাপ্তাহিক মোট ক্লাস", value: "১৯২ টি", icon: BookOpen },
        { label: "কার্যদিবস পরিধি", value: "রবি - বৃহস্পতি", icon: Layers },
      ]}
      columns={["শ্রেণি ও শাখা", "দিবস", "১ম পিরিয়ড", "২য় পিরিয়ড", "৩য় পিরিয়ড", "৪র্থ পিরিয়ড", "বিরতি", "৫ম - ৭ম পিরিয়ড"]}
      data={[
        [
          <span key="1" className="font-semibold text-foreground">পঞ্চম শ্রেণি (সুরমা)</span>,
          "রবিবার",
          "বাংলা (শামীমা)",
          "ইংরেজি (ফারহানা)",
          "গণিত (রহমান)",
          "বিজ্ঞান (শফিকুল)",
          <span key="brk" className="text-muted-foreground font-mono">টিফিন</span>,
          "বাবেপ, ধর্ম ও শিল্পকলা",
        ],
        [
          <span key="2" className="font-semibold text-foreground">পঞ্চম শ্রেণি (সুরমা)</span>,
          "সোমবার",
          "গণিত (রহমান)",
          "বাংলা (শামীমা)",
          "ইংরেজি (ফারহানা)",
          "বাবেপ (শফিকুল)",
          <span key="brk2" className="text-muted-foreground font-mono">টিফিন</span>,
          "বিজ্ঞান ও শারীরিক শিক্ষা",
        ],
        [
          <span key="3" className="font-semibold text-foreground">প্রথম শ্রেণি (পদ্মা)</span>,
          "রবিবার",
          "আমার বাংলা বই",
          "English for Today",
          "প্রাথমিক গণিত",
          "-",
          <span key="brk3" className="text-muted-foreground font-mono">টিফিন</span>,
          "খেলাধুলা ও সঙ্গীত",
        ],
      ]}
      searchPlaceholder="শ্রেণি, শিক্ষক বা বিষয়ের নাম দিয়ে খুঁজুন..."
      notice="শিক্ষক পরিবর্তনের ক্ষেত্রে রুটিন হালনাগাদ করা হলে সকল শিক্ষকের ব্যক্তিগত ড্যাশবোর্ডে নতুন শিডিউল অবিলম্বে কার্যকর হবে।"
    />
  );
}

