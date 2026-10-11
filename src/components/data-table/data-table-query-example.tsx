"use client";

import React from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { parseAsString, parseAsStringLiteral } from "nuqs";
import { httpClient } from "@/lib/httpClient";
import { useDataTableQuery } from "./use-data-table-query";
import type {
  DataTableColumnDef,
  DataTableQueryParams,
  PaginatedResponse,
} from "./types";

// 1. Example Entity Type
export interface School {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  is_active: boolean;
  created_at: string;
}

// 2. Query Key Factory Pattern
export const schoolQueryKeys = {
  all: ["schools"] as const,
  lists: () => [...schoolQueryKeys.all, "list"] as const,
  list: (params: DataTableQueryParams) =>
    [...schoolQueryKeys.lists(), params] as const,
};

// 3. API Fetcher Function
async function fetchSchools(
  params: DataTableQueryParams
): Promise<PaginatedResponse<School>> {
  const response = await httpClient.get<PaginatedResponse<School>>("/schools", {
    params,
  });

  // When backend returns data inside ApiResponse.data
  if (response.data) {
    return response.data;
  }

  // Fallback for empty results
  return {
    data: [],
    meta: {
      page: params.page ?? 1,
      limit: params.limit ?? 10,
      total: 0,
      totalPages: 0,
    },
  };
}

// 4. Custom Hook connecting TanStack Query with queryParams
export function useSchoolsQuery(params: DataTableQueryParams) {
  return useQuery({
    queryKey: schoolQueryKeys.list(params),
    queryFn: () => fetchSchools(params),
    // In TanStack Query v5, keepPreviousData is passed to placeholderData
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000, // Cache for 30s before considering stale
  });
}

// 5. Example Component Demonstrating Full Integration
export function SchoolTableContainer() {
  // Setup URL state management with custom filter parsers (nuqs)
  const {
    page,
    limit,
    searchTerm,
    sortBy,
    sortOrder,
    queryParams,
    setSearchTerm,
    setPage,
    setLimit,
    toggleSorting,
    setFilter,
    resetFilters,
  } = useDataTableQuery({
    defaultPage: 1,
    defaultLimit: 10,
    defaultSortBy: "created_at",
    defaultSortOrder: "desc",
    debounceMs: 400,
    // Custom filter parsers for URL search params
    filterParsers: {
      status: parseAsStringLiteral(["active", "inactive"] as const),
      type: parseAsString,
    },
  });

  // Fetch data with automatic re-fetch on any queryParams change
  const { data, isLoading, isFetching, isPlaceholderData, isError, error } =
    useSchoolsQuery(queryParams);

  return {
    // State & query results
    data: data?.data ?? [],
    meta: data?.meta,
    page,
    limit,
    searchTerm,
    sortBy,
    sortOrder,
    queryParams,
    isLoading,
    isFetching,
    isPlaceholderData,
    isError,
    error,

    // Updaters
    setSearchTerm,
    setPage,
    setLimit,
    toggleSorting,
    setFilter,
    resetFilters,
  };
}
