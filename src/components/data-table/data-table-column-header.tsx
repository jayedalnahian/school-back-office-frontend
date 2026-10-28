"use client";

import * as React from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  EyeOff,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RowData } from "@tanstack/react-table";
import type { DataTableColumn, SortOrder } from "./types";

export interface DataTableColumnHeaderProps<
  TData extends RowData = any,
  TValue = unknown,
> extends React.HTMLAttributes<HTMLDivElement> {
  column?: DataTableColumn<TData, TValue>;
  title: string;
  field?: string;
  sortBy?: string | null;
  sortOrder?: SortOrder | null;
  onSortChange?: (field: string | null, order: SortOrder | null) => void;
  enableSorting?: boolean;
}

export function DataTableColumnHeader<
  TData extends RowData = any,
  TValue = unknown,
>({
  column,
  title,
  field,
  sortBy,
  sortOrder,
  onSortChange,
  enableSorting = true,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  // Determine column key / field identifier
  const columnKey = field ?? column?.id;

  // Check if sorting is allowed for this column
  const canSort =
    enableSorting &&
    (column?.getCanSort ? column.getCanSort() : true) &&
    Boolean(columnKey);

  // If column cannot be sorted, just display plain title
  if (!canSort || !columnKey) {
    return <div className={cn("text-xs font-semibold text-muted-foreground", className)}>{title}</div>;
  }

  // Active sort state for this column
  const isActive = sortBy === columnKey;
  const isAsc = isActive && sortOrder === "asc";
  const isDesc = isActive && sortOrder === "desc";

  const handleSetSort = (order: SortOrder | null) => {
    if (onSortChange) {
      if (order === null) {
        onSortChange(null, null);
      } else {
        onSortChange(columnKey, order);
      }
    }
  };

  const handleToggle = () => {
    if (!isActive) {
      handleSetSort("asc");
    } else if (isAsc) {
      handleSetSort("desc");
    } else {
      handleSetSort(null);
    }
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "-ml-3 h-8 text-xs font-semibold data-[state=open]:bg-accent",
              isActive && "text-foreground font-bold"
            )}
          >
            <span>{title}</span>
            {isDesc ? (
              <ArrowDown className="ml-1.5 h-3.5 w-3.5 text-primary" />
            ) : isAsc ? (
              <ArrowUp className="ml-1.5 h-3.5 w-3.5 text-primary" />
            ) : (
              <ChevronsUpDown className="ml-1.5 h-3.5 w-3.5 opacity-50" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-52 shadow-md">
          <DropdownMenuItem
            onClick={() => handleSetSort("asc")}
            className={cn("cursor-pointer text-xs", isAsc && "bg-accent font-semibold text-primary")}
          >
            <ArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            আরোহী ক্রমানুসারে (Ascending)
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleSetSort("desc")}
            className={cn("cursor-pointer text-xs", isDesc && "bg-accent font-semibold text-primary")}
          >
            <ArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            অবরোহী ক্রমানুসারে (Descending)
          </DropdownMenuItem>
          {isActive && (
            <DropdownMenuItem
              onClick={() => handleSetSort(null)}
              className="cursor-pointer text-xs text-muted-foreground"
            >
              <RotateCcw className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              সর্টিং রিসেট করুন (Reset)
            </DropdownMenuItem>
          )}
          {column && column.getCanHide && column.getCanHide() && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => column.toggleVisibility(false)}
                className="cursor-pointer text-xs text-muted-foreground"
              >
                <EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                কলামটি লুকান (Hide)
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DataTableColumnHeader;
