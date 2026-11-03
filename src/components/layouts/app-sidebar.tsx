"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  Calendar,
  GraduationCap,
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
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeToggle } from "./theme-toggle";
import { useSidebar } from "./sidebar-context";

export interface SubNavItem {
  title: string;
  href: string;
  badge?: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: SubNavItem[];
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
        children: [
          { title: "প্রধান ড্যাশবোর্ড", href: "/dashboard" },
          { title: "পরিসংখ্যান ও অ্যানালিটিক্স", href: "/dashboard#analytics" },
          { title: "সাম্প্রতিক নোটিশ ও কার্যক্রম", href: "/dashboard#activities" },
        ],
      },
    ],
  },
  {
    label: "প্রতিষ্ঠান ও প্রশাসন",
    items: [
      {
        title: "বিদ্যালয় ব্যবস্থাপনা",
        href: "/schools",
        icon: Building2,
        children: [
          { title: "সকল বিদ্যালয় তালিকা", href: "/schools" },
          { title: "নতুন বিদ্যালয় অনবোর্ডিং", href: "/schools/onboard", badge: "নতুন" },
          { title: "সক্রিয় বিদ্যালয়সমূহ", href: "/schools?status=active" },
        ],
      },
      {
        title: "ইউজার ও নিরাপত্তা",
        href: "/users",
        icon: Users,
        children: [
          { title: "সকল ব্যবহারকারী", href: "/users" },
          { title: "অ্যাডমিন ও সুপারভাইজার", href: "/users?role=admin" },
          { title: "রোল ও পারমিশন কন্ট্রোল", href: "/users?tab=roles" },
        ],
      },
    ],
  },
  {
    label: "একাডেমিক কাঠামো",
    items: [
      {
        title: "শিক্ষাবর্ষ ও শিফট",
        href: "/academic-years",
        icon: Calendar,
        children: [
          { title: "শিক্ষাবর্ষ তালিকা", href: "/academic-years" },
          { title: "শিফট ও সময়সূচি", href: "/shifts" },
        ],
      },
      {
        title: "শ্রেণি ও শাখা",
        href: "/classes",
        icon: GraduationCap,
        children: [
          { title: "শ্রেণি ব্যবস্থাপনা ও ক্যাপাসিটি", href: "/classes" },
          { title: "শাখা ও সেকশন বিন্যাস", href: "/sections" },
        ],
      },
      {
        title: "বিষয় ও পাঠ্যক্রম",
        href: "/subjects",
        icon: BookOpen,
        children: [
          { title: "সকল পাঠ্যবিষয়", href: "/subjects" },
          { title: "জাতীয় কারিকুলাম ও সিলেবাস", href: "/subjects?tab=curriculum" },
        ],
      },
    ],
  },
  {
    label: "স্টেকহোল্ডার",
    items: [
      {
        title: "শিক্ষকমণ্ডলী",
        href: "/teachers",
        icon: UserCheck,
        children: [
          { title: "শিক্ষক তালিকা ও প্রোফাইল", href: "/teachers" },
          { title: "পদবি ও দায়িত্ব বণ্টন", href: "/teachers?tab=designations" },
        ],
      },
      {
        title: "শিক্ষার্থীবৃন্দ",
        href: "/students",
        icon: UserRound,
        children: [
          { title: "শিক্ষার্থী তালিকা", href: "/students" },
          { title: "নতুন শিক্ষার্থী ভর্তি ও রোল", href: "/enrollments" },
        ],
      },
      {
        title: "অভিভাবকবৃন্দ",
        href: "/guardians",
        icon: HeartHandshake,
        children: [
          { title: "অভিভাবক ডিরেক্টরি", href: "/guardians" },
          { title: "জরুরি যোগাযোগ ও বার্তা", href: "/guardians?tab=sms" },
        ],
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
        children: [
          { title: "সাপ্তাহিক ক্লাস রুটিন", href: "/routines" },
          { title: "শিক্ষকভিত্তিক রুটিন", href: "/routines?view=teachers" },
        ],
      },
      {
        title: "ভর্তি ও রেজিস্ট্রেশন",
        href: "/enrollments",
        icon: ClipboardList,
        children: [
          { title: "ভর্তি তালিকা ও রোল নম্বর", href: "/enrollments" },
          { title: "স্থানান্তর ও ছাড়পত্র (TC)", href: "/enrollments?tab=transfer" },
        ],
      },
      {
        title: "দৈনিক উপস্থিতি ও হাজিরা",
        href: "/attendances",
        icon: CheckSquare,
        children: [
          { title: "শিক্ষার্থী ডিজিটাল হাজিরা", href: "/attendances" },
          { title: "শিক্ষক ও কর্মকর্তা হাজিরা", href: "/attendances?type=teachers" },
          { title: "মাসিক উপস্থিতি সারসংক্ষেপ", href: "/attendances?tab=reports" },
        ],
      },
    ],
  },
  {
    label: "মূল্যায়ন ও ফলাফল",
    items: [
      {
        title: "পারদর্শিতা নির্দেশক",
        href: "/indicators",
        icon: Target,
        children: [
          { title: "পারদর্শিতা নির্দেশক (PI)", href: "/indicators" },
          { title: "আচরণিক নির্দেশক (BI)", href: "/indicators?type=bi" },
        ],
      },
      {
        title: "মূল্যায়ন ও ফলাফল",
        href: "/evaluations",
        icon: Award,
        children: [
          { title: "ধারাবাহিক মূল্যায়ন", href: "/evaluations" },
          { title: "সামষ্টিক ও চূড়ান্ত মূল্যায়ন", href: "/evaluations?type=summative" },
          { title: "ট্রান্সক্রিপ্ট ও প্রগ্রেস কার্ড", href: "/evaluations?tab=cards" },
        ],
      },
    ],
  },
];

interface AppSidebarProps {
  onItemClick?: () => void;
  className?: string;
  isMobile?: boolean;
}

export function AppSidebar({ onItemClick, className, isMobile = false }: AppSidebarProps) {
  const pathname = usePathname();
  const { isCollapsed: contextCollapsed, toggleCollapse } = useSidebar();
  
  // When displayed inside mobile sheet, sidebar is never collapsed
  const isCollapsed = isMobile ? false : contextCollapsed;

  const [searchQuery, setSearchQuery] = React.useState("");
  const [openDropdowns, setOpenDropdowns] = React.useState<Record<string, boolean>>({});

  // Clean current pathname without search queries or hash
  const currentPath = React.useMemo(() => {
    return pathname.split("?")[0].split("#")[0];
  }, [pathname]);

  // Keep parent dropdown open if current pathname matches parent or any child
  React.useEffect(() => {
    navigationGroups.forEach((group) => {
      group.items.forEach((item) => {
        if (item.children) {
          const itemClean = item.href.split("?")[0].split("#")[0];
          const isParentMatch = currentPath === itemClean || (itemClean !== "/dashboard" && currentPath.startsWith(itemClean));
          const isChildMatch = item.children.some((child) => {
            const childClean = child.href.split("?")[0].split("#")[0];
            return currentPath === childClean;
          });

          if (isParentMatch || isChildMatch) {
            setOpenDropdowns((prev) => ({ ...prev, [item.title]: true }));
          }
        }
      });
    });
  }, [currentPath]);

  const toggleDropdown = (itemTitle: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [itemTitle]: !prev[itemTitle],
    }));
  };

  // Filter navigation items if search is entered
  const filteredGroups = React.useMemo(() => {
    if (!searchQuery.trim()) return navigationGroups;
    const q = searchQuery.toLowerCase().trim();
    return navigationGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          const matchesTitle = item.title.toLowerCase().includes(q);
          const matchesGroup = group.label.toLowerCase().includes(q);
          const matchesChildren = item.children?.some((child) =>
            child.title.toLowerCase().includes(q)
          );
          return matchesTitle || matchesGroup || matchesChildren;
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [searchQuery]);

  return (
    <TooltipProvider delayDuration={100}>
      <aside
        className={cn(
          "flex h-full flex-col border-r border-border/80 bg-card/95 backdrop-blur-md shadow-xs select-none transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-72",
          className
        )}
      >
        {/* ---------------- 1. Brand & Tenant Header ---------------- */}
        <div
          className={cn(
            "shrink-0 border-b border-border/80 transition-all duration-300",
            isCollapsed ? "p-3 py-4 flex flex-col items-center gap-2" : "p-4 space-y-3"
          )}
        >
          <div className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs ring-2 ring-primary/20">
                <School className="h-5 w-5 text-white" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-sm font-bold text-foreground font-sans">
                    প্রাথমিক বিদ্যালয় ব্যাক-অফিস
                  </span>
                  <span className="truncate text-[10px] text-muted-foreground font-medium">
                    Primary School Administration
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Collapse / Expand Toggle Button in Header */}
            {!isMobile && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={toggleCollapse}
                className={cn(
                  "h-8 w-8 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors shrink-0",
                  isCollapsed ? "mt-1" : "hidden sm:flex"
                )}
                title={isCollapsed ? "সাইডবার বড় করুন (Ctrl+B)" : "সাইডবার ছোট করুন (Ctrl+B)"}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? (
                  <PanelLeftOpen className="h-4.5 w-4.5" />
                ) : (
                  <PanelLeftClose className="h-4.5 w-4.5" />
                )}
              </Button>
            )}
          </div>

          {/* Tenant Indicator Badge (Expanded mode only) */}
          {!isCollapsed && (
            <div className="flex items-center justify-between rounded-lg border border-border/80 bg-muted/40 px-2.5 py-1.5 text-xs">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                <span className="truncate font-semibold text-foreground text-[11px]">
                  আদর্শ সরকারি প্রাথমিক বিদ্যালয়
                </span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded shrink-0 font-medium bg-background border border-border text-muted-foreground">
                ঢাকা
              </span>
            </div>
          )}
        </div>

        {/* ---------------- 2. Quick Search & Controls (Expanded) ---------------- */}
        {!isCollapsed ? (
          <div className="shrink-0 border-b border-border/70 p-3 space-y-2.5">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="মডিউল খুঁজুন..."
                className="h-8.5 w-full pl-8 pr-12 text-xs bg-background/80 placeholder:text-muted-foreground/70 rounded-lg border-border/70 focus-visible:border-primary/50"
              />
              <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 flex h-5 select-none items-center gap-0.5 rounded border border-border bg-muted/60 px-1 font-mono text-[10px] font-medium text-muted-foreground">
                <Command className="h-2.5 w-2.5" />K
              </kbd>
            </div>

            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-medium text-muted-foreground">কুইক কন্ট্রোলস</span>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="icon"
                  className="relative h-7.5 w-7.5 rounded-lg border-border/80 bg-background/80 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  aria-label="বিজ্ঞপ্তি"
                  title="বিজ্ঞপ্তি"
                >
                  <Bell className="h-3.5 w-3.5" />
                  <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 ring-2 ring-background" />
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </div>
        ) : (
          <div className="shrink-0 border-b border-border/70 p-2 flex flex-col items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleCollapse}
                  className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>মডিউল খুঁজুন (প্রসারিত করতে ক্লিক করুন)</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}

        {/* ---------------- 3. Navigation Groups & Dropdowns ---------------- */}
        <div className="flex-1 overflow-y-auto px-2 sm:px-3 py-3 space-y-5 scrollbar-thin">
          {filteredGroups.map((group) => (
            <div key={group.label} className="space-y-1">
              {!isCollapsed ? (
                <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                  {group.label}
                </h3>
              ) : (
                <div className="mx-auto w-6 border-t border-border/60 my-2" />
              )}

              <div className="mt-1 space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const hasChildren = Boolean(item.children && item.children.length > 0);
                  const isItemOpen = Boolean(openDropdowns[item.title]);

                  const itemClean = item.href.split("?")[0].split("#")[0];

                  // Exact match or subpath match for this parent
                  const isParentMatch =
                    currentPath === itemClean ||
                    (itemClean !== "/dashboard" && currentPath.startsWith(itemClean));

                  // Check if any child matches currentPath
                  const isChildMatch = Boolean(
                    item.children?.some((child) => {
                      const childClean = child.href.split("?")[0].split("#")[0];
                      return currentPath === childClean;
                    })
                  );

                  const isActive = isParentMatch || isChildMatch;

                  // ------------------ CASE A: COLLAPSED VIEW (ICON ONLY) ------------------
                  if (isCollapsed) {
                    if (hasChildren && item.children) {
                      return (
                        <DropdownMenu key={item.title}>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              className={cn(
                                "group relative flex h-10 w-10 mx-auto items-center justify-center rounded-xl transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer",
                                isActive
                                  ? "bg-primary text-primary-foreground shadow-xs"
                                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
                              )}
                              aria-label={item.title}
                            >
                              <Icon className="h-5 w-5 shrink-0" />
                              {isActive && (
                                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-primary" />
                              )}
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            side="right"
                            align="start"
                            sideOffset={12}
                            className="w-56 p-1.5 shadow-xl border-border/80"
                          >
                            <DropdownMenuLabel className="px-2 py-1.5 text-xs font-bold text-foreground flex items-center justify-between">
                              <span className="flex items-center gap-1.5">
                                <Icon className="h-4 w-4 text-primary" />
                                {item.title}
                              </span>
                              {item.badge && (
                                <Badge variant="secondary" className="text-[10px] py-0 px-1.5">
                                  {item.badge}
                                </Badge>
                              )}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {item.children.map((child) => {
                              const childClean = child.href.split("?")[0].split("#")[0];
                              const isChildActive = currentPath === childClean;

                              return (
                                <DropdownMenuItem key={child.href} asChild>
                                  <Link
                                    href={child.href}
                                    onClick={onItemClick}
                                    className={cn(
                                      "flex items-center justify-between px-2.5 py-1.5 text-xs rounded-md font-medium cursor-pointer transition-colors",
                                      isChildActive
                                        ? "bg-primary/10 text-primary font-semibold"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                                    )}
                                  >
                                    <span className="truncate">{child.title}</span>
                                    {child.badge && (
                                      <Badge variant="outline" className="text-[9px] px-1 py-0 bg-primary/10 text-primary border-primary/20">
                                        {child.badge}
                                      </Badge>
                                    )}
                                  </Link>
                                </DropdownMenuItem>
                              );
                            })}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      );
                    }

                    // Item without children in Collapsed view
                    return (
                      <Tooltip key={item.href}>
                        <TooltipTrigger asChild>
                          <Link
                            href={item.href}
                            onClick={onItemClick}
                            className={cn(
                              "flex h-10 w-10 mx-auto items-center justify-center rounded-xl transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary",
                              isActive
                                ? "bg-primary text-primary-foreground shadow-xs"
                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            )}
                          >
                            <Icon className="h-5 w-5 shrink-0" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={12}>
                          <p className="font-semibold text-xs">{item.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  }

                  // ------------------ CASE B: EXPANDED VIEW WITH ACCORDION DROPDOWNS ------------------
                  if (hasChildren && item.children) {
                    return (
                      <div key={item.title} className="space-y-1">
                        {/* Parent Accordion Row (Clicking navigates to page AND opens dropdown) */}
                        <div
                          className={cn(
                            "group flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs sm:text-sm font-medium transition-colors duration-150",
                            isActive
                              ? "bg-primary/10 text-primary font-semibold border border-primary/20"
                              : "text-muted-foreground hover:bg-accent/80 hover:text-foreground"
                          )}
                        >
                          <Link
                            href={item.href}
                            onClick={() => {
                              onItemClick?.();
                              setOpenDropdowns((prev) => ({ ...prev, [item.title]: true }));
                            }}
                            className="flex items-center gap-2.5 truncate flex-1 text-inherit outline-none"
                          >
                            <Icon
                              className={cn(
                                "h-4 w-4 shrink-0 transition-colors",
                                isActive
                                  ? "text-primary"
                                  : "text-muted-foreground group-hover:text-foreground"
                              )}
                            />
                            <span className="truncate">{item.title}</span>
                          </Link>

                          <div className="flex items-center gap-1.5 shrink-0 ml-1">
                            {item.badge && (
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-primary/30"
                              >
                                {item.badge}
                              </Badge>
                            )}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleDropdown(item.title);
                              }}
                              className="p-1 rounded hover:bg-accent/80 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                              title="সাবমেনু ড্রপডাউন টগল করুন"
                            >
                              <ChevronDown
                                className={cn(
                                  "h-3.5 w-3.5 transition-transform duration-200",
                                  isItemOpen && "rotate-180 text-foreground"
                                )}
                              />
                            </button>
                          </div>
                        </div>

                        {/* Collapsible Dropdown Submenu */}
                        {isItemOpen && (
                          <div className="ml-3.5 pl-3 border-l-2 border-border/80 space-y-0.5 py-0.5 transition-all">
                            {item.children.map((child) => {
                              const childClean = child.href.split("?")[0].split("#")[0];
                              const isChildActive = currentPath === childClean;

                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={onItemClick}
                                  className={cn(
                                    "group flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors duration-150",
                                    isChildActive
                                      ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                  )}
                                >
                                  <div className="flex items-center gap-2 truncate">
                                    <span
                                      className={cn(
                                        "h-1.5 w-1.5 rounded-full shrink-0",
                                        isChildActive
                                          ? "bg-primary-foreground"
                                          : "bg-muted-foreground/50 group-hover:bg-foreground"
                                      )}
                                    />
                                    <span className="truncate">{child.title}</span>
                                  </div>
                                  {child.badge && (
                                    <Badge
                                      variant="outline"
                                      className={cn(
                                        "text-[9px] px-1.5 py-0",
                                        isChildActive
                                          ? "bg-primary-foreground/20 text-primary-foreground border-transparent"
                                          : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                      )}
                                    >
                                      {child.badge}
                                    </Badge>
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Single Nav Item without dropdown in Expanded mode
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onItemClick}
                      className={cn(
                        "group flex items-center justify-between rounded-lg px-3 py-2 text-xs sm:text-sm font-medium transition-colors duration-150",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                          : "text-muted-foreground hover:bg-accent/80 hover:text-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0 transition-colors",
                            isActive
                              ? "text-primary-foreground"
                              : "text-muted-foreground group-hover:text-foreground"
                          )}
                        />
                        <span className="truncate">{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-[10px] px-1.5 py-0",
                            isActive ? "bg-primary-foreground/20 text-primary-foreground" : ""
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
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

        {/* ---------------- 4. Footer: User Profile & System Status ---------------- */}
        <div
          className={cn(
            "shrink-0 border-t border-border/80 bg-muted/20 transition-all duration-300",
            isCollapsed ? "p-2 space-y-2 flex flex-col items-center" : "p-3 space-y-2"
          )}
        >
          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  "flex items-center rounded-lg border border-border bg-card transition-colors hover:bg-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer shadow-2xs",
                  isCollapsed ? "h-10 w-10 justify-center p-0" : "w-full justify-between gap-3 p-2 text-left"
                )}
                aria-label="User Profile"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Avatar className="h-8 w-8 shrink-0 rounded-md ring-1 ring-border">
                    <AvatarImage src="" alt="Admin" />
                    <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary rounded-md">
                      এড
                    </AvatarFallback>
                  </Avatar>
                  {!isCollapsed && (
                    <div className="flex flex-col overflow-hidden">
                      <span className="truncate text-xs font-semibold text-foreground">
                        প্রধান শিক্ষক / অ্যাডমিন
                      </span>
                      <span className="truncate text-[10px] text-muted-foreground">
                        admin@school.gov.bd
                      </span>
                    </div>
                  )}
                </div>
                {!isCollapsed && <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align={isCollapsed ? "start" : "end"}
              side={isCollapsed ? "right" : "top"}
              sideOffset={10}
              className="w-64 shadow-xl border-border/80"
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold leading-none">প্রধান শিক্ষক / অ্যাডমিন</p>
                  <p className="text-xs text-muted-foreground leading-none">admin@school.gov.bd</p>
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

          {/* Collapsed mode bottom controls */}
          {isCollapsed ? (
            <div className="flex flex-col items-center gap-2 pt-1">
              <ThemeToggle />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={toggleCollapse}
                    className="h-8 w-8 rounded-lg border-border/80 text-muted-foreground hover:text-foreground"
                  >
                    <PanelLeftOpen className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>সাইডবার বড় করুন (Ctrl+B)</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ) : (
            <div className="flex items-center justify-between px-1 text-[11px] text-muted-foreground pt-0.5">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                <span className="font-medium text-foreground">সিস্টেম সক্রিয়</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-border bg-card text-muted-foreground">
                  v1.0.0
                </span>
                {!isMobile && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={toggleCollapse}
                    className="h-6 w-6 rounded text-muted-foreground hover:text-foreground hover:bg-muted"
                    title="সাইডবার ছোট করুন (Ctrl+B)"
                  >
                    <PanelLeftClose className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}

export default AppSidebar;
