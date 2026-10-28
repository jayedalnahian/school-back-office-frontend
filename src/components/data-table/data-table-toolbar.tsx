"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import type { RowData } from "@tanstack/react-table";
import type {
  DataTableFilterConfig,
  DataTableInstance,
} from "./types";

export interface DataTableToolbarProps<TData extends RowData = any> {
  table?: DataTableInstance<TData>;

  // Search input state & controls
  search?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;

  // Faceted filters configuration & state
  filterConfigs?: DataTableFilterConfig[];
  filters?: Record<string, unknown>;
  onFilterChange?: (key: string, value: unknown) => void;

  // Reset filters callback
  onResetFilters?: () => void;

  // Optional custom action buttons slot (e.g. "Create New", "Export", etc.)
  actions?: React.ReactNode;
  className?: string;
}

export function DataTableToolbar<TData extends RowData = any>({
  table,
  search = "",
  onSearchChange,
  searchPlaceholder = "অনুসন্ধান করুন...",
  filterConfigs = [],
  filters = {},
  onResetFilters,
  onFilterChange,
  actions,
  className,
}: DataTableToolbarProps<TData>) {
  // Check if any search or filter is currently active
  const isSearchActive = (search ?? "").trim().length > 0;

  const isFilterActive = React.useMemo(() => {
    if (!filters) return false;
    return Object.values(filters).some((val) => {
      if (Array.isArray(val)) return val.length > 0;
      if (typeof val === "string") return val.trim().length > 0;
      return val !== null && val !== undefined;
    });
  }, [filters]);

  const isFiltered = isSearchActive || isFilterActive;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-2 py-2",
        className
      )}
    >
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {/* Search input field with search icon & quick clear */}
        {onSearchChange && (
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              className="h-8.5 w-full pl-8 pr-7 text-xs sm:w-[220px] lg:w-[290px] bg-background/80"
            />
            {isSearchActive && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded cursor-pointer"
                title="সার্চ মুছুন"
              >
                <X className="h-3.5 w-3.5" />
                <span className="sr-only">Clear search</span>
              </button>
            )}
          </div>
        )}

        {/* Dynamic Faceted Filters */}
        {filterConfigs.map((config) => {
          const selectedValue = filters[config.key];

          return (
            <DataTableFacetedFilter
              key={config.key}
              title={config.label}
              options={config.options ?? []}
              selectedValues={
                Array.isArray(selectedValue)
                  ? selectedValue
                  : typeof selectedValue === "string" && selectedValue.length > 0
                  ? [selectedValue]
                  : undefined
              }
              onSelect={(values) => {
                if (onFilterChange) {
                  onFilterChange(
                    config.key,
                    values.length > 0
                      ? config.type === "select"
                        ? values[0]
                        : values
                      : undefined
                  );
                }
              }}
              singleSelect={config.type === "select"}
            />
          );
        })}

        {/* Reset filters button shown when any search or filter is active */}
        {isFiltered && onResetFilters && (
          <Button
            variant="ghost"
            onClick={onResetFilters}
            className="h-8.5 px-2.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60"
          >
            রিসেট (Reset)
            <X className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {/* Right side: custom actions & view options */}
      <div className="flex items-center gap-2">
        {actions}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}

export default DataTableToolbar;
