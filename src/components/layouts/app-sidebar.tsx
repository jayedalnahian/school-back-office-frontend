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
  Search,
  Bell,
  Command,
  User,
  Settings,
  LogOut,
  ChevronsUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";

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
  const [searchQuery, setSearchQuery] = React.useState("");

  // Filter navigation items if search is entered
  const filteredGroups = React.useMemo(() => {
    if (!searchQuery.trim()) return navigationGroups;
    const q = searchQuery.toLowerCase().trim();
    return navigationGroups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            group.label.toLowerCase().includes(q)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [searchQuery]);

  return (
    <aside
      className={cn(
        "flex h-full w-72 flex-col border-r border-border/80 bg-card/95 backdrop-blur-md shadow-xs select-none",
        className
      )}
    >
      {/* 1. Brand & Tenant Header */}
      <div className="shrink-0 border-b border-border/70 p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary/95 to-slate-800 text-primary-foreground shadow-sm ring-1 ring-primary/20">
            <School className="h-5 w-5 text-white dark:text-foreground" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="truncate text-sm font-bold text-foreground font-sans">
              প্রাথমিক বিদ্যালয় ব্যাক-অফিস
            </span>
            <span className="truncate text-[11px] text-muted-foreground font-medium">
              Primary School Administration
            </span>
          </div>
        </div>

        {/* Tenant Indicator Badge */}
        <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/40 px-2.5 py-1.5 text-xs">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex h-2 w-2 shrink-0 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
            <span className="truncate font-medium text-foreground text-[11px]">
              আদর্শ সরকারি প্রাথমিক বিদ্যালয়
            </span>
          </div>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0 font-medium bg-background/80">
            ঢাকা
          </Badge>
        </div>
      </div>

      {/* 2. Top Controls: Search Input & Quick Actions */}
      <div className="shrink-0 border-b border-border/70 p-3 space-y-2.5">
        {/* Search Field for Application Modules */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="মডিউল খুঁজুন..."
            className="h-8.5 w-full pl-8 pr-12 text-xs bg-background/70 placeholder:text-muted-foreground/70 rounded-lg border-border/70 focus-visible:border-primary/50"
          />
          <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 flex h-5 select-none items-center gap-0.5 rounded border border-border bg-muted/60 px-1 font-mono text-[10px] font-medium text-muted-foreground">
            <Command className="h-2.5 w-2.5" />K
          </kbd>
        </div>

        {/* Action Row: Notifications & Theme Toggle */}
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-medium text-muted-foreground">কুইক কন্ট্রোলস</span>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="icon"
              className="relative h-8 w-8 rounded-lg border-border/80 bg-background/80 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="বিজ্ঞপ্তি (Notifications)"
              title="বিজ্ঞপ্তি"
            >
              <Bell className="h-3.5 w-3.5" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 ring-2 ring-background" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* 3. Navigation Groups List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5 scrollbar-thin">
        {filteredGroups.map((group) => (
          <div key={group.label} className="space-y-1">
            <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
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
                      "group flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs sm:text-sm font-medium transition-colors duration-150",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                        : "text-muted-foreground hover:bg-accent/80 hover:text-foreground"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform duration-150 group-hover:scale-105",
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
        {filteredGroups.length === 0 && (
          <div className="py-8 text-center text-xs text-muted-foreground">
            কোনো মডিউল পাওয়া যায়নি
          </div>
        )}
      </div>

      {/* 4. Footer: User Profile & System Status */}
      <div className="shrink-0 border-t border-border/80 p-3 space-y-2 bg-muted/20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 rounded-lg border border-border/80 bg-background/80 p-2 text-left transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <Avatar className="h-8 w-8 shrink-0 ring-1 ring-border">
                  <AvatarImage src="" alt="Admin" />
                  <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                    এড
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-xs font-semibold text-foreground">
                    প্রধান শিক্ষক / অ্যাডমিন
                  </span>
                  <span className="truncate text-[11px] text-muted-foreground">
                    admin@school.gov.bd
                  </span>
                </div>
              </div>
              <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" className="w-64 shadow-lg">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none">প্রধান শিক্ষক / অ্যাডমিন</p>
                <p className="text-xs text-muted-foreground leading-none">
                  admin@school.gov.bd
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer text-xs">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>প্রোফাইল সেটিংস</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer text-xs">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <span>প্রতিষ্ঠান কনফিগারেশন</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer text-xs text-destructive focus:text-destructive">
              <LogOut className="h-4 w-4" />
              <span>লগআউট</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center justify-between px-1 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-medium">সিস্টেম সক্রিয়</span>
          </div>
          <Badge variant="outline" className="text-[10px] font-mono px-1.5 py-0 bg-background/60">
            v1.0.0
          </Badge>
        </div>
      </div>
    </aside>
  );
}

export default AppSidebar;
