"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  Calendar,
  Clock,
  GraduationCap,
  Layers,
  BookOpen,
  UserCheck,
  UserRound,
  HeartHandshake,
  CalendarDays,
  ClipboardList,
  CheckSquare,
  Target,
  Award,
  School,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navigationGroups: NavGroup[] = [
  {
    label: "ওভারভিউ",
    items: [
      {
        title: "ড্যাশবোর্ড",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "প্রতিষ্ঠান",
    items: [
      {
        title: "বিদ্যালয় অনবোর্ডিং ও তালিকা",
        href: "/schools",
        icon: Building2,
      },
      {
        title: "ইউজার",
        href: "/users",
        icon: Users,
      },
    ],
  },
  {
    label: "একাডেমিক সেটআপ",
    items: [
      {
        title: "শিক্ষাবর্ষ",
        href: "/academic-years",
        icon: Calendar,
      },
      {
        title: "শিফট",
        href: "/shifts",
        icon: Clock,
      },
      {
        title: "শ্রেণি",
        href: "/classes",
        icon: GraduationCap,
      },
      {
        title: "শাখা",
        href: "/sections",
        icon: Layers,
      },
      {
        title: "বিষয়",
        href: "/subjects",
        icon: BookOpen,
      },
    ],
  },
  {
    label: "স্টেকহোল্ডার",
    items: [
      {
        title: "শিক্ষক",
        href: "/teachers",
        icon: UserCheck,
      },
      {
        title: "শিক্ষার্থী",
        href: "/students",
        icon: UserRound,
      },
      {
        title: "অভিভাবক",
        href: "/guardians",
        icon: HeartHandshake,
      },
    ],
  },
  {
    label: "দৈনন্দিন কার্যক্রম",
    items: [
      {
        title: "ক্লাস রুটিন",
        href: "/routines",
        icon: CalendarDays,
      },
      {
        title: "ভর্তি / রোল",
        href: "/enrollments",
        icon: ClipboardList,
      },
      {
        title: "হাজিরা",
        href: "/attendances",
        icon: CheckSquare,
      },
    ],
  },
  {
    label: "মূল্যায়ন",
    items: [
      {
        title: "পারদর্শিতা নির্দেশক",
        href: "/indicators",
        icon: Target,
      },
      {
        title: "মূল্যায়ন ও রেজাল্ট",
        href: "/evaluations",
        icon: Award,
      },
    ],
  },
];

interface AppSidebarProps {
  onItemClick?: () => void;
  className?: string;
}

export function AppSidebar({ onItemClick, className }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-72 flex-col border-r border-border bg-card/60 backdrop-blur-md",
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-border px-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <School className="h-5 w-5" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="truncate text-sm font-bold tracking-tight text-foreground">
            প্রাথমিক বিদ্যালয় ব্যাক-অফিস
          </span>
          <span className="truncate text-xs text-muted-foreground font-medium">
            Primary School Admin
          </span>
        </div>
      </div>

      {/* Navigation Groups List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navigationGroups.map((group) => (
          <div key={group.label} className="space-y-1">
            <h3 className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
              {group.label}
            </h3>
            <div className="mt-1 space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onItemClick}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform group-hover:scale-105",
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    />
                    <span className="truncate">{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer System Status */}
      <div className="shrink-0 border-t border-border p-3">
        <div className="flex items-center justify-between rounded-lg bg-muted/50 p-2.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-medium text-foreground">সিস্টেম সক্রিয়</span>
          </div>
          <Badge variant="outline" className="text-[10px] font-mono px-1.5 py-0">
            v1.0.0
          </Badge>
        </div>
      </div>
    </aside>
  );
}

export default AppSidebar;
