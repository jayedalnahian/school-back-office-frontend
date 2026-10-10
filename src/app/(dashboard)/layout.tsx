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

      {/* 2. Mobile Floating Drawer Trigger */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-xl border-border bg-background/90 shadow-md backdrop-blur-md"
              aria-label="Open Navigation Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <AppSidebar onItemClick={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* 3. Main Content Column */}
      <div className="flex flex-1 flex-col lg:pl-72 min-w-0 w-full overflow-x-hidden">
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-6 lg:p-8 pt-16 lg:pt-8 w-full max-w-full">
          <div className="mx-auto max-w-7xl w-full min-w-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
