"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative h-8 w-8 rounded-lg border-border/80 bg-background/80 hover:bg-accent text-foreground transition-colors"
          aria-label="থিম পরিবর্তন করুন (Toggle theme)"
          title="থিম পরিবর্তন করুন"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-sky-400" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 shadow-md">
        <DropdownMenuItem onClick={() => setTheme("light")} className="gap-2.5 cursor-pointer text-xs font-medium">
          <Sun className="h-4 w-4 text-amber-500" />
          <span>লাইট (Light)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="gap-2.5 cursor-pointer text-xs font-medium">
          <Moon className="h-4 w-4 text-sky-400" />
          <span>ডার্ক (Dark)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="gap-2.5 cursor-pointer text-xs font-medium">
          <Monitor className="h-4 w-4 text-muted-foreground" />
          <span>সিস্টেম থিম (System)</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeToggle;
