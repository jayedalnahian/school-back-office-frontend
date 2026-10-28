"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { AppSidebar } from "@/components/layouts/app-sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground w-full overflow-x-hidden">
      {/* 1. Desktop Persistent Sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 z-40">
        <AppSidebar />
      </div>

      {/* 2. Main Content Column */}
      <div className="flex flex-1 flex-col lg:pl-72 min-w-0 w-full overflow-x-hidden">
        {/* Top App Header */}
        <header className="sticky top-0 z-30 flex h-15 sm:h-16 w-full items-center justify-between border-b border-border/80 bg-card/90 px-4 sm:px-6 lg:px-8 backdrop-blur-md shadow-xs transition-colors">
          {/* Left: Mobile Drawer Trigger & Title */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="lg:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-lg border-border/80 bg-background hover:bg-accent shadow-xs"
                    aria-label="ন্যাভিগেশন মেনু খুলুন (Open Navigation Menu)"
                  >
                    <Menu className="h-4.5 w-4.5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72">
                  <AppSidebar onItemClick={() => setMobileOpen(false)} />
                </SheetContent>
              </Sheet>
            </div>

            {/* Institutional Seal & Heading */}
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-bold text-xs">
                BD
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-xs sm:text-sm font-bold text-foreground">
                  প্রাথমিক ও গণশিক্ষা মন্ত্রণালয়
                </span>
                <span className="truncate text-[10px] sm:text-[11px] text-muted-foreground font-medium">
                  গণপ্রজাতন্ত্রী বাংলাদেশ সরকার • প্রাথমিক বিদ্যালয় ব্যাক-অফিস
                </span>
              </div>
            </div>
          </div>

          {/* Right: Institutional Badges & Session Info */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>শিক্ষাবর্ষ: ২০২৬</span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              ঢাকা বিভাগ
            </span>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 w-full max-w-full">
          <div className="mx-auto max-w-7xl w-full min-w-0 space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
