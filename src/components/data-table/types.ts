import type { RowData } from "@tanstack/react-table";
import type {
  LegacyColumn,
  LegacyColumnDef,
  LegacyTable,
} from "@tanstack/react-table/legacy";
import type { ComponentType, ReactNode } from "react";

export type DataTableInstance<TData extends RowData = any> = LegacyTable<TData>;
export type DataTableColumn<
  TData extends RowData = any,
  TValue = unknown,
> = LegacyColumn<TData, TValue>;

export type DataTableColumnDef<
  TData extends RowData = any,
  TValue = unknown,
> = LegacyColumnDef<TData, TValue>;
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

/**
 * Generic container for paginated API responses
 */
export interface PaginatedResponse<TData> {
  data: TData[];
  meta: PaginationMeta;
}

/**
 * Allowed sort directions
 */
export type SortOrder = "asc" | "desc";

/**
 * Sorting state representation
 */
export interface DataTableSort {
  sortBy?: string | null;
  sortOrder?: SortOrder | null;
}

/**
 * Option item for select or multi-select dropdown filters
 */
export interface FilterOption {
  label: string;
  value: string;
  count?: number;
  icon?: ComponentType<{ className?: string }>;
}

/**
 * Supported filter input UI types
 */
export type FilterType =
  | "select"
  | "multi-select"
  | "text"
  | "date"
  | "date-range"
  | "boolean";

/**
 * Configuration declaration for a filterable field in DataTable
 */
export interface DataTableFilterConfig {
  key: string;
  label: string;
  type: FilterType;
  options?: FilterOption[];
  placeholder?: string;
  defaultValue?: unknown;
}

/**
 * Overall query state maintained in URL search params
 */
export interface DataTableQueryState<
  TFilters extends Record<string, unknown> = Record<string, unknown>,
> {
  page: number;
  limit: number;
  search: string;
  sortBy: string | null;
  sortOrder: SortOrder | null;
  filters: TFilters;
}

/**
 * Sanitized query parameters passed directly to API requests
 */
export interface DataTableQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
  [key: string]: unknown;
}

/**
 * Props for Server-Side Controlled DataTable component
 */
export interface DataTableProps<
  TData extends RowData = any,
  TValue = unknown,
> {
  columns: DataTableColumnDef<TData, TValue>[];
  data?: TData[];
  meta?: PaginationMeta;
  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
  error?: unknown;

  // Pagination controls
  page?: number;
  limit?: number;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;

  // Sorting controls
  sortBy?: string | null;
  sortOrder?: SortOrder | null;
  onSortChange?: (sortBy?: string | null, sortOrder?: SortOrder | null) => void;

  // Search controls
  search?: string;
  searchPlaceholder?: string;
  onSearchChange?: (search: string) => void;

  // Filter controls
  filterConfigs?: DataTableFilterConfig[];
  filters?: Record<string, unknown>;
  onFilterChange?: (key: string, value: unknown) => void;
  onResetFilters?: () => void;

  // Layout & UI customizations
  toolbarActions?: ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (row: TData) => void;
  className?: string;
}
