"use client";

import * as React from "react";
import { Menu } from "lucide-react";
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
  const { isCollapsed, isMobileOpen, setIsMobileOpen } = useSidebar();

  return (
    <div className="flex min-h-screen bg-background text-foreground w-full overflow-x-hidden">
      {/* Mobile Floating Drawer Trigger (only visible on mobile screens) */}
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg border-border/80 bg-card/95 backdrop-blur-md hover:bg-accent shadow-sm text-foreground"
              aria-label="Navigation Menu"
            >
              <Menu className="h-4.5 w-4.5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <AppSidebar onItemClick={() => setIsMobileOpen(false)} isMobile />
          </SheetContent>
        </Sheet>
      </div>

      {/* 1. Desktop Persistent Sidebar with Dynamic Collapse Width */}
      <div
        className={cn(
          "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 z-40 transition-all duration-300 ease-in-out",
          isCollapsed ? "lg:w-20" : "lg:w-72"
        )}
      >
        <AppSidebar />
      </div>

      {/* 2. Main Content Column (No Header - full height and direct page content) */}
      <div
        className={cn(
          "flex flex-1 flex-col min-w-0 w-full overflow-x-hidden transition-all duration-300 ease-in-out",
          isCollapsed ? "lg:pl-20" : "lg:pl-72"
        )}
      >
        {/* Page Content Body */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 pt-14 lg:pt-8 w-full max-w-full">
          <div className="mx-auto max-w-7xl w-full min-w-0 space-y-6">
            <React.Suspense
              fallback={
                <div className="w-full space-y-4 animate-pulse py-4">
                  <div className="h-10 w-48 bg-muted rounded-md" />
                  <div className="h-64 w-full bg-muted/40 rounded-xl border border-border" />
                </div>
              }
            >
              {children}
            </React.Suspense>
          </div>
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
