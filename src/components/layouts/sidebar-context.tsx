"use client";

import * as React from "react";

export interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  toggleCollapse: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): boolean {
  try {
    return localStorage.getItem("school_sidebar_collapsed") === "true";
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  return false;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const isStoredCollapsed = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [internalCollapsed, setInternalCollapsed] = React.useState<boolean | null>(null);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const isCollapsed = internalCollapsed !== null ? internalCollapsed : isStoredCollapsed;

  const toggleCollapse = React.useCallback(() => {
    setInternalCollapsed((prev) => {
      const current = prev !== null ? prev : getSnapshot();
      const next = !current;
      try {
        localStorage.setItem("school_sidebar_collapsed", String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const setIsCollapsed = React.useCallback<React.Dispatch<React.SetStateAction<boolean>>>(
    (action) => {
      setInternalCollapsed((prev) => {
        const current = prev !== null ? prev : getSnapshot();
        const next = typeof action === "function" ? action(current) : action;
        try {
          localStorage.setItem("school_sidebar_collapsed", String(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    []
  );

  // Keyboard shortcut Ctrl+B or Cmd+B to toggle sidebar width
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleCollapse();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleCollapse]);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        setIsCollapsed,
        toggleCollapse,
        isMobileOpen,
        setIsMobileOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
