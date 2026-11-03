"use client";

import * as React from "react";
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { AppSidebar } from "@/components/layouts/app-sidebar";
import { SidebarProvider, useSidebar } from "@/components/layouts/sidebar-context";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCollapsed, toggleCollapse, isMobileOpen, setIsMobileOpen } = useSidebar();

  return (
    <div className="flex min-h-screen bg-background text-foreground w-full overflow-x-hidden">
      {/* 1. Desktop Persistent Sidebar with Dynamic Collapse Width */}
      <div
        className={cn(
          "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 z-40 transition-all duration-300 ease-in-out",
          isCollapsed ? "lg:w-20" : "lg:w-72"
        )}
      >
        <AppSidebar />
      </div>

      {/* 2. Main Content Column with Matching Dynamic Left Padding */}
      <div
        className={cn(
          "flex flex-1 flex-col min-w-0 w-full overflow-x-hidden transition-all duration-300 ease-in-out",
          isCollapsed ? "lg:pl-20" : "lg:pl-72"
        )}
      >
        {/* Top App Header */}
        <header className="sticky top-0 z-30 flex h-14 sm:h-15 w-full items-center justify-between border-b border-border/80 bg-card/90 px-4 sm:px-6 lg:px-8 backdrop-blur-md shadow-xs transition-colors">
          {/* Left: Mobile Drawer Trigger & Desktop Sidebar Toggle */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile Sheet Trigger */}
            <div className="lg:hidden">
              <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
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
                  <AppSidebar onItemClick={() => setIsMobileOpen(false)} isMobile />
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Quick Toggle Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={toggleCollapse}
              className="hidden lg:flex h-8.5 w-8.5 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              title={isCollapsed ? "সাইডবার বড় করুন (Ctrl+B)" : "সাইডবার ছোট করুন (Ctrl+B)"}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="h-4.5 w-4.5" />
              ) : (
                <PanelLeftClose className="h-4.5 w-4.5" />
              )}
            </Button>

            {/* Institutional Seal & Heading */}
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-bold text-xs">
                BD
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-xs sm:text-sm font-bold text-foreground">
                  প্রাথমিক ও গণশিক্ষা মন্ত্রণালয়
                </span>
                <span className="truncate text-[10px] text-muted-foreground font-medium hidden sm:inline">
                  গণপ্রজাতন্ত্রী বাংলাদেশ সরকার • প্রাথমিক বিদ্যালয় ব্যাক-অফিস
                </span>
              </div>
            </div>
          </div>

          {/* Right: Academic Year and Region Info */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              <span>শিক্ষাবর্ষ: ২০২৬</span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  );
}
