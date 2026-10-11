"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
  type UseQueryStatesKeysMap,
  type Values,
} from "nuqs";
import { useDebouncedCallback } from "use-debounce";
import type {
  DataTableQueryParams,
  DataTableSort,
  SortOrder,
} from "./types";

export interface UseDataTableQueryOptions<
  TFilterParsers extends UseQueryStatesKeysMap = Record<string, never>,
> {
  defaultPage?: number;
  defaultLimit?: number;
  defaultSortBy?: string;
  defaultSortOrder?: SortOrder;
  debounceMs?: number;
  filterParsers?: TFilterParsers;
  shallow?: boolean;
  history?: "push" | "replace";
  scroll?: boolean;
}

export function useDataTableQuery<
  TFilterParsers extends UseQueryStatesKeysMap = Record<string, never>,
>(options: UseDataTableQueryOptions<TFilterParsers> = {}) {
  const {
    defaultPage = 1,
    defaultLimit = 10,
    defaultSortBy,
    defaultSortOrder = "asc",
    debounceMs = 400,
    filterParsers,
    shallow = true,
    history = "replace",
    scroll = false,
  } = options;

  // Combine default table parsers with optional custom filter parsers
  const parsers = useMemo(() => {
    return {
      page: parseAsInteger.withDefault(defaultPage),
      limit: parseAsInteger.withDefault(defaultLimit),
      search: parseAsString.withDefault(""),
      sortBy: defaultSortBy
        ? parseAsString.withDefault(defaultSortBy)
        : parseAsString,
      sortOrder: parseAsStringLiteral(["asc", "desc"] as const).withDefault(
        defaultSortOrder
      ),
      ...(filterParsers ?? {}),
    } as const;
  }, [defaultPage, defaultLimit, defaultSortBy, defaultSortOrder, filterParsers]);

  // nuqs useQueryStates hook keeps URL query params in sync
  const [queryState, setQueryState] = useQueryStates(parsers, {
    shallow,
    history,
    scroll,
  });

  // Local search term state for instant 60fps input responsiveness
  const [searchTerm, setSearchTerm] = useState(queryState.search || "");

  // Sync local search term if URL query changes externally (e.g. back/forward button or reset)
  useEffect(() => {
    setSearchTerm(queryState.search || "");
  }, [queryState.search]);

  // Debounced callback that updates URL search param and resets page to 1
  const debouncedSyncSearch = useDebouncedCallback((val: string) => {
    const trimmed = val.trim();
    setQueryState({
      search: trimmed.length > 0 ? trimmed : "",
      page: 1, // Reset to first page on search
    } as unknown as Partial<Values<typeof parsers>>);
  }, debounceMs);

  // Instant handler for input typing (updates input state immediately + debounces URL)
  const handleSearchTermChange = useCallback(
    (value: string) => {
      setSearchTerm(value);
      debouncedSyncSearch(value);
    },
    [debouncedSyncSearch]
  );

  // Programmatic search setter with optional immediate flush
  const setSearch = useCallback(
    (value: string, opts?: { immediate?: boolean }) => {
      const trimmed = value.trim();
      setSearchTerm(trimmed);

      if (opts?.immediate) {
        debouncedSyncSearch.cancel();
        setQueryState({
          search: trimmed.length > 0 ? trimmed : "",
          page: 1,
        } as unknown as Partial<Values<typeof parsers>>);
      } else {
        debouncedSyncSearch(trimmed);
      }
    },
    [debouncedSyncSearch, setQueryState, parsers]
  );

  // Clear search filter
  const clearSearch = useCallback(() => {
    debouncedSyncSearch.cancel();
    setSearchTerm("");
    setQueryState({
      search: "",
      page: 1,
    } as unknown as Partial<Values<typeof parsers>>);
  }, [debouncedSyncSearch, setQueryState, parsers]);

  // Page setter
  const setPage = useCallback(
    (page: number | ((prev: number) => number)) => {
      const targetPage =
        typeof page === "function" ? page(queryState.page) : page;
      setQueryState({
        page: Math.max(1, targetPage),
      } as unknown as Partial<Values<typeof parsers>>);
    },
    [queryState.page, setQueryState, parsers]
  );

  // Page limit / size setter (resets page to 1)
  const setLimit = useCallback(
    (limit: number) => {
      setQueryState({
        limit,
        page: 1,
      } as unknown as Partial<Values<typeof parsers>>);
    },
    [setQueryState, parsers]
  );

  // Sorting setter
  const setSorting = useCallback(
    (sortBy?: string | null, sortOrder?: SortOrder | null) => {
      setQueryState({
        sortBy: sortBy || null,
        sortOrder: sortOrder || null,
        page: 1,
      } as unknown as Partial<Values<typeof parsers>>);
    },
    [setQueryState, parsers]
  );

  // Toggle sorting for a field: asc -> desc -> null -> asc
  const toggleSorting = useCallback(
    (field: string) => {
      if (queryState.sortBy !== field) {
        setSorting(field, "asc");
      } else if (queryState.sortOrder === "asc") {
        setSorting(field, "desc");
      } else {
        setSorting(null, null);
      }
    },
    [queryState.sortBy, queryState.sortOrder, setSorting]
  );

  // Set a specific custom filter (resets page to 1)
  const setFilter = useCallback(
    <K extends string>(key: K, value: unknown) => {
      setQueryState({
        [key]: value === "" || value === undefined ? null : value,
        page: 1,
      } as unknown as Partial<Values<typeof parsers>>);
    },
    [setQueryState, parsers]
  );

  // Batch update filters (resets page to 1)
  const setFilters = useCallback(
    (filters: Record<string, unknown>) => {
      const updates: Record<string, unknown> = { page: 1 };
      for (const [k, v] of Object.entries(filters)) {
        updates[k] = v === "" || v === undefined ? null : v;
      }
      setQueryState(updates as unknown as Partial<Values<typeof parsers>>);
    },
    [setQueryState, parsers]
  );

  // Reset all filters and search back to defaults
  const resetFilters = useCallback(() => {
    debouncedSyncSearch.cancel();
    setSearchTerm("");

    const resetPayload: Record<string, unknown> = {
      page: 1,
      limit: defaultLimit,
      search: "",
      sortBy: defaultSortBy || null,
      sortOrder: defaultSortOrder,
    };

    if (filterParsers) {
      for (const key of Object.keys(filterParsers)) {
        resetPayload[key] = null;
      }
    }

    setQueryState(resetPayload as unknown as Partial<Values<typeof parsers>>);
  }, [
    debouncedSyncSearch,
    defaultLimit,
    defaultSortBy,
    defaultSortOrder,
    filterParsers,
    setQueryState,
    parsers,
  ]);

  // Extract custom filters from query state
  const customFilters = useMemo(() => {
    if (!filterParsers) return {} as Record<string, unknown>;
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(filterParsers)) {
      const val = (queryState as Record<string, unknown>)[key];
      if (val !== undefined && val !== null && val !== "") {
        result[key] = val;
      }
    }
    return result;
  }, [queryState, filterParsers]);

  // Sanitized query params formatted for API client requests
  const queryParams: DataTableQueryParams = useMemo(() => {
    const params: DataTableQueryParams = {
      page: queryState.page,
      limit: queryState.limit,
    };

    if (queryState.search && queryState.search.trim().length > 0) {
      params.search = queryState.search.trim();
    }

    if (queryState.sortBy) {
      params.sortBy = queryState.sortBy;
    }

    if (queryState.sortOrder) {
      params.sortOrder = queryState.sortOrder as SortOrder;
    }

    // Merge active custom filters
    Object.assign(params, customFilters);

    return params;
  }, [
    queryState.page,
    queryState.limit,
    queryState.search,
    queryState.sortBy,
    queryState.sortOrder,
    customFilters,
  ]);

  const sort: DataTableSort = useMemo(
    () => ({
      sortBy: queryState.sortBy,
      sortOrder: queryState.sortOrder as SortOrder | null,
    }),
    [queryState.sortBy, queryState.sortOrder]
  );

  return {
    // Current query states from URL
    page: queryState.page,
    limit: queryState.limit,
    search: queryState.search,
    sortBy: queryState.sortBy,
    sortOrder: queryState.sortOrder as SortOrder | null,
    sort,
    filters: customFilters,
    rawState: queryState,

    // Input-controlled search states (for real-time input typing)
    searchTerm,
    setSearchTerm: handleSearchTermChange,

    // Action handlers
    setPage,
    setLimit,
    setSearch,
    clearSearch,
    setSorting,
    toggleSorting,
    setFilter,
    setFilters,
    resetFilters,

    // Cleaned API parameter object ready for TanStack Query
    queryParams,
  };
}

export default useDataTableQuery;
