"use client";

import * as React from "react";
import {
  flexRender,
} from "@tanstack/react-table";
import {
  useLegacyTable as useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table/legacy";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTablePagination } from "./data-table-pagination";
import type { RowData } from "@tanstack/react-table";
import type { DataTableProps } from "./types";

export function DataTable<TData extends RowData = any, TValue = unknown>({
  columns,
  data = [],
  meta,
  isLoading = false,
  isFetching = false,
  isError = false,
  error,

  // Pagination
  page = 1,
  limit = 10,
  pageSizeOptions = [10, 20, 30, 50, 100],
  onPageChange,
  onLimitChange,

  // Sorting
  sortBy,
  sortOrder,
  onSortChange,

  // Search
  search,
  searchPlaceholder,
  onSearchChange,

  // Filters
  filterConfigs,
  filters,
  onFilterChange,
  onResetFilters,

  // UI customizations
  toolbarActions,
  emptyTitle,
  emptyDescription,
  onRowClick,
  className,
}: DataTableProps<TData, TValue>) {
  // Column visibility and row selection state for the table instance
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Memoize sorting state for TanStack Table
  const sorting = React.useMemo(() => {
    if (!sortBy) return [];
    return [{ id: sortBy, desc: sortOrder === "desc" }];
  }, [sortBy, sortOrder]);

  // TanStack Table Instance with manual controls
  const table = useReactTable({
    data,
    columns: columns as any,
    getCoreRowModel: getCoreRowModel(),
    // Tell TanStack Table that pagination, sorting and filtering are server-controlled
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    pageCount: meta?.totalPages ?? -1,
    state: {
      pagination: {
        pageIndex: Math.max(0, page - 1),
        pageSize: limit,
      },
      sorting,
      columnVisibility,
      rowSelection,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  });

  const skeletonRowCount = Math.min(limit, 8);

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Top Toolbar (Search, Dynamic Faceted Filters, View Options) */}
      {(onSearchChange || filterConfigs?.length || toolbarActions) && (
        <DataTableToolbar
          table={table}
          search={search}
          onSearchChange={onSearchChange}
          searchPlaceholder={searchPlaceholder}
          filterConfigs={filterConfigs}
          filters={filters}
          onFilterChange={onFilterChange}
          onResetFilters={onResetFilters}
          actions={toolbarActions}
        />
      )}

      {/* Main Table Container */}
      <div className="relative rounded-xl border border-border/80 bg-card shadow-xs overflow-hidden">
        {/* Subtle background fetching progress bar */}
        {isFetching && !isLoading && (
          <div className="absolute inset-x-0 top-0 z-10 h-0.5 bg-primary animate-pulse" />
        )}

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-border/80 bg-muted/40">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="h-10 text-xs font-semibold text-muted-foreground whitespace-nowrap"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {/* Loading Skeleton state */}
            {isLoading ? (
              Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
                <TableRow key={`skeleton-row-${rowIndex}`}>
                  {columns.map((_, colIndex) => (
                    <TableCell
                      key={`skeleton-cell-${colIndex}`}
                      className="py-3.5"
                    >
                      <Skeleton className="h-5 w-full rounded" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : isError ? (
              /* Error State */
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-44 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-2 text-destructive">
                    <p className="text-sm font-semibold">
                      ডাটা লোড করতে সমস্যা হয়েছে (Failed to load records)
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {error instanceof Error
                        ? error.message
                        : "সার্ভার থেকে তথ্য গ্রহণ করার সময় একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।"}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              /* Rows render */
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    "transition-colors hover:bg-muted/40",
                    onRowClick && "cursor-pointer"
                  )}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              /* Empty State */
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-52 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <div className="rounded-full bg-muted/80 p-3 ring-1 ring-border/80">
                      <Inbox className="h-6 w-6 stroke-[1.5] text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">
                        {emptyTitle ?? "কোনো তথ্য পাওয়া যায়নি"}
                      </p>
                      <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
                        {emptyDescription ??
                          "আপনার বর্তমান সার্চ ও ফিল্টার অনুযায়ী কোনো রেকর্ড খুঁজে পাওয়া যায়নি।"}
                      </p>
                    </div>
                    {onResetFilters && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={onResetFilters}
                        className="mt-2 h-8 text-xs font-medium"
                      >
                        ফিল্টার রিসেট করুন (Reset filters)
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Bottom Pagination */}
      <DataTablePagination
        table={table}
        meta={meta}
        page={page}
        limit={limit}
        pageSizeOptions={pageSizeOptions}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </div>
  );
}

export default DataTable;
