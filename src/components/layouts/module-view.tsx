"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  RefreshCw,
  Search,
  Download,
  Info,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface StatItem {
  label: string;
  value: string | number;
  change?: string;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: "default" | "success" | "warning" | "info";
}

export interface TableColumn {
  header: string;
  accessorKey?: string;
  className?: string;
}

export interface ModulePageViewProps {
  title: string;
  englishTitle?: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  actionText?: string;
  onActionClick?: () => void;
  stats?: StatItem[];
  columns: string[];
  data: Array<Array<React.ReactNode>>;
  searchPlaceholder?: string;
  notice?: string;
}

export function ModulePageView({
  title,
  englishTitle,
  description,
  icon: Icon,
  badge = "মডিউল",
  actionText,
  onActionClick,
  stats,
  columns,
  data,
  searchPlaceholder = "অনুসন্ধান করুন...",
  notice,
}: ModulePageViewProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleBack = React.useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/dashboard");
    }
  }, [router]);

  const handleForward = React.useCallback(() => {
    if (typeof window !== "undefined") {
      router.forward();
    }
  }, [router]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("তথ্য সফলভাবে রিলোড করা হয়েছে");
    }, 600);
  };

  const filteredData = React.useMemo(() => {
    if (!searchTerm.trim()) return data;
    const q = searchTerm.toLowerCase().trim();
    return data.filter((row) =>
      row.some((cell) => {
        if (typeof cell === "string" || typeof cell === "number") {
          return String(cell).toLowerCase().includes(q);
        }
        return false;
      })
    );
  }, [data, searchTerm]);

  return (
    <div className="w-full min-w-0 space-y-6">
      {/* ---------------- 1. Top Navigation & Official Header ---------------- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-3 mb-3 -mt-5">
        <div className="flex items-center gap-3">
          {/* Browser Navigation (Back / Forward) Buttons */}
          <div className="flex items-center gap-1 rounded-lg border border-border/70 bg-card/60 p-0.5 shadow-2xs">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="h-8 w-8 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
              title="পূর্ববর্তী পৃষ্ঠায় ফিরে যান (Back)"
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleForward}
              className="h-8 w-8 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
              title="পরবর্তী পৃষ্ঠায় এগিয়ে যান (Forward)"
              aria-label="Forward"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary border border-primary/20">
                <Icon className="h-4 w-4" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground font-sans">
                {title}
              </h1>
              {englishTitle && (
                <span className="hidden md:inline text-xs text-muted-foreground font-normal">
                  ({englishTitle})
                </span>
              )}
              <Badge variant="outline" className="hidden sm:inline-flex text-[11px] font-medium bg-muted/40">
                {badge}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {description}
            </p>
          </div>
        </div>

        {/* Action Header Button */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-9 gap-1.5 text-xs font-medium border-border/80 shadow-2xs"
            title="ডাটা রিলোড করুন"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", isRefreshing && "animate-spin text-primary")} />
            <span className="hidden sm:inline">রিলোড</span>
          </Button>

          {actionText && (
            <Button
              type="button"
              size="sm"
              onClick={onActionClick || (() => toast.info(`"${actionText}" প্রক্রিয়া শুরু করা হয়েছে`))}
              className="h-9 gap-1.5 text-xs font-semibold shadow-xs bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="h-4 w-4" />
              <span>{actionText}</span>
            </Button>
          )}
        </div>
      </div>

      {/* ---------------- 2. Summary Metric Cards ---------------- */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
          {stats.map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={idx}
                className="rounded-xl border border-border/80 bg-card p-4 shadow-2xs flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-medium">{stat.label}</span>
                  {StatIcon && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-foreground/80">
                      <StatIcon className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl sm:text-2xl font-bold text-foreground font-mono">
                    {stat.value}
                  </span>
                  {stat.change && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                      {stat.change}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---------------- 3. Formal Advisory Notice Banner ---------------- */}
      {notice && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-start gap-3 text-xs leading-relaxed text-foreground/90">
          <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-primary">প্রাতিষ্ঠানিক নির্দেশনা: </span>
            {notice}
          </div>
        </div>
      )}

      {/* ---------------- 4. Data Table / Module Workspace Container ---------------- */}
      <div className="rounded-xl border border-border/80 bg-card shadow-xs overflow-hidden">
        {/* Table Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-b border-border/70 bg-muted/20">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-8.5 pl-8 text-xs bg-background"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info("ফিল্টারিং প্যানেল শীঘ্রই যুক্ত হবে")}
              className="h-8.5 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>ফিল্টার</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.success("ডাটা এক্সপোর্ট প্রস্তুত করা হচ্ছে...")}
              className="h-8.5 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <Download className="h-3.5 w-3.5" />
              <span>এক্সপোর্ট</span>
            </Button>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/80 bg-muted/40 font-semibold text-muted-foreground uppercase text-[10px] tracking-wider">
              <tr>
                {columns.map((col, i) => (
                  <th key={i} className="py-3 px-4 whitespace-nowrap">
                    {col}
                  </th>
                ))}
                <th className="py-3 px-4 text-right whitespace-nowrap">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredData.length > 0 ? (
                filteredData.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className="hover:bg-muted/40 transition-colors"
                  >
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="py-3 px-4 text-foreground whitespace-nowrap">
                        {cell}
                      </td>
                    ))}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toast.info("বিস্তারিত ভিউ প্রস্তুত করা হচ্ছে")}
                        className="h-7 text-[11px] px-2 text-primary hover:text-primary/90 hover:bg-primary/10"
                      >
                        বিস্তারিত
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="py-12 text-center text-muted-foreground">
                    কোনো তথ্য খুঁজে পাওয়া যায়নি
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex items-center justify-between p-3.5 border-t border-border/70 bg-muted/20 text-xs text-muted-foreground">
          <span>
            সর্বমোট <strong className="text-foreground">{filteredData.length}</strong> টি রেকর্ড প্রদর্শিত হচ্ছে
          </span>
          <span className="text-[11px]">প্রাথমিক বিদ্যালয় ব্যাক-অফিস সিস্টেম</span>
        </div>
      </div>
    </div>
  );
}
