"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RowData } from "@tanstack/react-table";
import type { DataTableInstance, PaginationMeta } from "./types";

export interface DataTablePaginationProps<TData extends RowData = any> {
  table?: DataTableInstance<TData>;
  meta?: PaginationMeta;
  page?: number;
  limit?: number;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  className?: string;
}

export function DataTablePagination<TData extends RowData = any>({
  table,
  meta,
  page: controlledPage,
  limit: controlledLimit,
  pageSizeOptions = [10, 20, 30, 50, 100],
  onPageChange,
  onLimitChange,
  className,
}: DataTablePaginationProps<TData>) {
  // Determine pagination metrics from props or meta
  const currentPage = controlledPage ?? meta?.page ?? 1;
  const currentLimit = controlledLimit ?? meta?.limit ?? 10;
  const totalRecords = meta?.total ?? 0;
  const totalPages =
    meta?.totalPages ??
    (totalRecords > 0 ? Math.ceil(totalRecords / currentLimit) : 1);

  // Selected rows calculation
  const selectedRowsCount = table?.getFilteredSelectedRowModel?.()?.rows?.length ?? 0;
  const totalTableRows = table?.getFilteredRowModel?.()?.rows?.length ?? 0;

  const canPrevious = currentPage > 1;
  const canNext = currentPage < totalPages;

  const handlePageChange = (targetPage: number) => {
    const validPage = Math.max(1, Math.min(targetPage, totalPages));
    if (onPageChange) {
      onPageChange(validPage);
    } else if (table?.setPageIndex) {
      table.setPageIndex(validPage - 1);
    }
  };

  const handleLimitChange = (value: string) => {
    const newLimit = Number(value);
    if (onLimitChange) {
      onLimitChange(newLimit);
    } else if (table?.setPageSize) {
      table.setPageSize(newLimit);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col-reverse items-center justify-between gap-4 px-2 py-4 sm:flex-row",
        className
      )}
    >
      {/* Left: Selection summary or Total count */}
      <div className="flex-1 text-xs text-muted-foreground">
        {selectedRowsCount > 0 ? (
          <span>
            {selectedRowsCount} / {totalTableRows}টি সারি নির্বাচিত
          </span>
        ) : totalRecords > 0 ? (
          <span>
            মোট <span className="font-semibold text-foreground">{totalRecords}</span>টি রেকর্ডের মধ্যে{" "}
            <span className="font-semibold text-foreground">
              {Math.min((currentPage - 1) * currentLimit + 1, totalRecords)}
            </span>
            –
            <span className="font-semibold text-foreground">
              {Math.min(currentPage * currentLimit, totalRecords)}
            </span>{" "}
            প্রদর্শিত
          </span>
        ) : (
          <span>কোনো রেকর্ড পাওয়া যায়নি</span>
        )}
      </div>

      {/* Right: Page size select, current page and navigation buttons */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-5">
        {/* Page size changer */}
        <div className="flex items-center gap-2">
          <p className="text-xs font-medium text-muted-foreground">
            প্রতি পৃষ্ঠায়:
          </p>
          <Select
            value={`${currentLimit}`}
            onValueChange={handleLimitChange}
          >
            <SelectTrigger className="h-8 w-[72px] text-xs bg-background/80">
              <SelectValue placeholder={`${currentLimit}`} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem
                  key={size}
                  value={`${size}`}
                  className="text-xs cursor-pointer"
                >
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Current page indicator */}
        <div className="flex items-center justify-center text-xs font-medium text-muted-foreground">
          পৃষ্ঠা <span className="mx-1 text-foreground font-semibold">{currentPage}</span> /{" "}
          <span className="ml-1 text-foreground font-semibold">
            {Math.max(1, totalPages)}
          </span>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="hidden h-8 w-8 lg:flex"
            onClick={() => handlePageChange(1)}
            disabled={!canPrevious}
            title="প্রথম পৃষ্ঠা (First page)"
            aria-label="First page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!canPrevious}
            title="পূর্ববর্তী পৃষ্ঠা (Previous page)"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!canNext}
            title="পরবর্তী পৃষ্ঠা (Next page)"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden h-8 w-8 lg:flex"
            onClick={() => handlePageChange(totalPages)}
            disabled={!canNext}
            title="শেষ পৃষ্ঠা (Last page)"
            aria-label="Last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTablePagination;
