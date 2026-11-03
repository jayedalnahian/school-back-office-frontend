"use client";

import * as React from "react";
import { UserRound, Users, Award } from "lucide-react";
import { ModulePageView } from "@/components/layouts/module-view";
import { Badge } from "@/components/ui/badge";

export default function StudentsPage() {
  return (
    <ModulePageView
      title="শিক্ষার্থীবৃন্দ ও তথ্যভাণ্ডার"
      englishTitle="Students Directory"
      description="বিদ্যালয়ে অধ্যয়নরত সকল শিক্ষার্থীর ইউনিক প্রোফাইল, অভিভাবক ও রোল নম্বর"
      icon={UserRound}
      badge="স্টেকহোল্ডার"
      actionText="নতুন শিক্ষার্থী যুক্ত করুন"
      stats={[
        { label: "মোট শিক্ষার্থী", value: "৭২০ জন", icon: Users },
        { label: "ছাত্র সংখ্যা", value: "৩৫০ জন", icon: UserRound },
        { label: "ছাত্রী সংখ্যা", value: "৩৭০ জন", change: "৫১.৪% নারী শিক্ষা" },
        { label: "উপবৃত্তি সুবিধাভোগী", value: "৫৪০ জন", icon: Award },
      ]}
      columns={["রোল", "শিক্ষার্থীর নাম", "শ্রেণি ও শাখা", "জন্ম নিবন্ধন নম্বর", "অভিভাবকের নাম ও মোবাইল", "অবস্থা"]}
      data={[
        [
          <span key="1" className="font-mono font-bold">০১</span>,
          <span key="name" className="font-semibold text-foreground">আহসান হাবীব</span>,
          "পঞ্চম শ্রেণি (সুরমা)",
          "20152692518001234",
          "মোঃ আনোয়ার হোসেন (01711223344)",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 নিয়মিত</Badge>,
        ],
        [
          <span key="2" className="font-mono font-bold">০২</span>,
          <span key="name" className="font-semibold text-foreground">ফাতিমা তুজ জোহরা</span>,
          "পঞ্চম শ্রেণি (সুরমা)",
          "20152692518001235",
          "মোঃ আব্দুল করিম (01811223344)",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 নিয়মিত</Badge>,
        ],
        [
          <span key="3" className="font-mono font-bold">০১</span>,
          <span key="name" className="font-semibold text-foreground">তানভীর আহমেদ</span>,
          "প্রথম শ্রেণি (পদ্মা)",
          "20192692518005678",
          "মোঃ মোস্তফা কামাল (01911223344)",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 নিয়মিত</Badge>,
        ],
        [
          <span key="4" className="font-mono font-bold">০২</span>,
          <span key="name" className="font-semibold text-foreground">নুসরাত জাহান</span>,
          "প্রথম শ্রেণি (পদ্মা)",
          "20192692518005679",
          "মোঃ রফিকুল হক (01611223344)",
          <Badge key="status" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">🟢 নিয়মিত</Badge>,
        ],
      ]}
      searchPlaceholder="শিক্ষার্থীর নাম, রোল বা জন্ম নিবন্ধন নম্বর দিয়ে খুঁজুন..."
      notice="প্রত্যেক শিক্ষার্থীর ১৭ ডিজিটের ডিজিটাল জন্ম নিবন্ধন নম্বর এবং উপবৃত্তির জন্য মায়ের সচল নগদ/বিকাশ অ্যাকাউন্ট নিশ্চিত করতে হবে।"
    />
  );
}
