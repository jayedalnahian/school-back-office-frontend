"use client";

import * as React from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RowData } from "@tanstack/react-table";
import type { DataTableInstance } from "./types";
import { useLanguage } from "@/i18n";

export interface DataTableViewOptionsProps<TData extends RowData = Record<string, unknown>> {
  table?: DataTableInstance<TData>;
}

export function DataTableViewOptions<TData extends RowData = Record<string, unknown>>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const { dict } = useLanguage();

  if (!table) return null;

  const hideableColumns = table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.getCanHide()
    );

  if (hideableColumns.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8.5 gap-1.5 text-xs font-medium lg:flex bg-background/80"
          title={dict.common.toggleColumns}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          {dict.common.toggleColumns}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px] shadow-md">
        <DropdownMenuLabel className="text-xs font-semibold">
          {dict.common.toggleColumns}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {hideableColumns.map((column) => {
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize text-xs cursor-pointer"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id.replace(/_/g, " ")}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DataTableViewOptions;
