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
import { cn } from "cn";
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
      <div className="relative rounded-md border bg-card shadow-xs">
        {/* Subtle background fetching progress bar */}
        {isFetching && !isLoading && (
          <div className="absolute inset-x-0 top-0 z-10 h-0.5 bg-primary/80 animate-pulse" />
        )}

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
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
                      className="py-3"
                    >
                      <Skeleton className="h-5 w-full" />
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
                  <div className="flex flex-col items-center justify-center gap-1.5 text-destructive">
                    <p className="text-sm font-semibold">
                      Failed to load records
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {error instanceof Error
                        ? error.message
                        : "An unexpected error occurred while fetching data."}
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
                    "transition-colors",
                    onRowClick && "cursor-pointer hover:bg-muted/60"
                  )}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-2.5 text-sm">
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
                    <div className="rounded-full bg-muted p-3">
                      <Inbox className="h-6 w-6 stroke-[1.5] text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">
                        {emptyTitle ?? "No records found"}
                      </p>
                      <p className="text-xs text-muted-foreground max-w-sm">
                        {emptyDescription ??
                          "No results matched your current search and filter criteria."}
                      </p>
                    </div>
                    {onResetFilters && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={onResetFilters}
                        className="mt-2 h-7 text-xs"
                      >
                        Reset all filters
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
