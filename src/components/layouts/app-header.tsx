"use client";

import * as React from "react";
import {
  Menu,
  Search,
  School,
  Bell,
  Command,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "./theme-toggle";
import { AppSidebar } from "./app-sidebar";

export function AppHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
      {/* Left: Mobile Nav & Tenant Indicator */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Sheet Trigger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 lg:hidden"
              aria-label="Open Navigation Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <AppSidebar onItemClick={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Quick Tenant Indicator Badge */}
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium border-border/80 bg-muted/40 text-foreground"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
            <School className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="hidden sm:inline font-semibold">আদর্শ সরকারি প্রাথমিক বিদ্যালয়</span>
            <span className="sm:hidden font-semibold">আদর্শ সপ্রাবি</span>
            <span className="text-[11px] text-muted-foreground hidden md:inline">| ঢাকা</span>
          </Badge>
        </div>
      </div>

      {/* Center/Right: Search, Theme Toggle, Notifications, User Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search Trigger Bar (Shortcut UI Placeholder) */}
        <div className="relative hidden md:block">
          <button
            type="button"
            className="flex h-9 w-64 items-center justify-between rounded-lg border border-input bg-muted/40 px-3 text-xs text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground focus:outline-none"
          >
            <span className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5" />
              <span>অনুসন্ধান করুন...</span>
            </span>
            <kbd className="pointer-events-none flex h-5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <Command className="h-3 w-3" /> K
            </kbd>
          </button>
        </div>

        {/* Search button on small screens */}
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 md:hidden"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </Button>

        {/* Notification Bell */}
        <Button
          variant="outline"
          size="icon"
          className="relative h-9 w-9"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-full ring-1 ring-border"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="Admin" />
                <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                  এড
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none">প্রধান শিক্ষক / অ্যাডমিন</p>
                <p className="text-xs text-muted-foreground leading-none">
                  admin@school.gov.bd
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>প্রোফাইল সেটিংস</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <span>প্রতিষ্ঠান কনফিগারেশন</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="h-4 w-4" />
              <span>লগআউট</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default AppHeader;
