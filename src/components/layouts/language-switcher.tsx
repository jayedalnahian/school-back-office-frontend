"use client";

import * as React from "react";
import { Globe, Check } from "lucide-react";
import { useLanguage } from "@/i18n";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface LanguageSwitcherProps {
  variant?: "dropdown" | "compact-toggle";
  isCollapsed?: boolean;
  className?: string;
}

export function LanguageSwitcher({
  variant = "dropdown",
  isCollapsed = false,
  className,
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  if (variant === "compact-toggle" && !isCollapsed) {
    return (
      <div
        className={cn(
          "inline-flex items-center rounded-lg border border-border/80 bg-muted/40 p-0.5 text-xs font-semibold shadow-2xs",
          className
        )}
      >
        <button
          type="button"
          onClick={() => setLanguage("en")}
          className={cn(
            "rounded-md px-2 py-0.5 text-[11px] font-medium transition-all cursor-pointer",
            language === "en"
              ? "bg-background text-foreground shadow-xs font-semibold"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => setLanguage("bn")}
          className={cn(
            "rounded-md px-2 py-0.5 text-[11px] font-medium transition-all cursor-pointer",
            language === "bn"
              ? "bg-background text-foreground shadow-xs font-semibold"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          বাং
        </button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={isCollapsed ? "icon" : "sm"}
          className={cn(
            isCollapsed
              ? "h-8 w-8 rounded-lg border-border/80 bg-background/80 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              : "h-7.5 gap-1.5 px-2 rounded-lg border-border/80 bg-background/80 hover:bg-accent text-xs font-medium text-foreground shadow-2xs transition-all",
            className
          )}
          title="ভাষা পরিবর্তন করুন (Change Language)"
          aria-label="Change language"
        >
          <Globe className="h-3.5 w-3.5 text-muted-foreground" />
          {!isCollapsed && (
            <span className="font-semibold text-[11px] tracking-tight">
              {language === "en" ? "EN" : "বাংলা"}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isCollapsed ? "start" : "end"} side={isCollapsed ? "right" : "bottom"} className="w-36 shadow-lg border-border/80">
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={cn(
            "flex items-center justify-between text-xs cursor-pointer font-medium",
            language === "en" && "bg-primary/10 text-primary font-semibold"
          )}
        >
          <span>English (EN)</span>
          {language === "en" && <Check className="h-3.5 w-3.5" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("bn")}
          className={cn(
            "flex items-center justify-between text-xs cursor-pointer font-medium",
            language === "bn" && "bg-primary/10 text-primary font-semibold"
          )}
        >
          <span>বাংলা (BN)</span>
          {language === "bn" && <Check className="h-3.5 w-3.5" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;
