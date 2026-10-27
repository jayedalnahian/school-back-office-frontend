"use client";

import * as React from "react";
import { useQuery, keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { parseAsString, parseAsStringLiteral } from "nuqs";
import { toast } from "sonner";
import { useDataTableQuery } from "@/components/data-table";
import { fetchSchools, deleteSchool } from "./schools.service";
import { getSchoolColumns } from "./schools.columns";
import type { SchoolRecord, CreatedSchoolResult } from "./schools.types";

/**
 * Custom hook encapsulating all business logic, server-side querying,
 * URL synchronization, and user action handlers for the Schools table.
 */
export function useSchoolsTable() {
  const queryClient = useQueryClient();
  const [isOnboardingOpen, setIsOnboardingOpen] = React.useState(false);

  // 1. URL State Management (nuqs + debouncing)
  const {
    page,
    limit,
    searchTerm,
    sortBy,
    sortOrder,
    queryParams,
    filters,
    setSearchTerm,
    setPage,
    setLimit,
    setSorting,
    setFilter,
    resetFilters,
  } = useDataTableQuery({
    defaultPage: 1,
    defaultLimit: 10,
    defaultSortBy: "created_at",
    defaultSortOrder: "desc",
    debounceMs: 350,
    filterParsers: {
      type: parseAsString,
      status: parseAsStringLiteral(["active", "inactive"] as const),
    },
  });

  // 2. TanStack Query for server state management
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["schools", "list", queryParams],
    queryFn: () => fetchSchools(queryParams),
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });

  // 3. Business Logic: Data Reload Handler
  const handleReload = React.useCallback(async () => {
    try {
      await refetch();
      toast.success("বিদ্যালয়ের তথ্য সফলভাবে রিলোড করা হয়েছে!");
    } catch {
      toast.error("ডাটা রিলোড করতে ব্যর্থ হয়েছে");
    }
  }, [refetch]);

  // 4. Business Logic: Delete School Handler
  const handleDeleteSchool = React.useCallback(
    async (school: SchoolRecord) => {
      try {
        await deleteSchool(school.id);
        toast.success(`"${school.name}" সফলভাবে মুছে ফেলা হয়েছে!`);
        queryClient.invalidateQueries({ queryKey: ["schools"] });
      } catch (err) {
        console.error("Delete school failed:", err);
        toast.error("বিদ্যালয়টি মুছে ফেলতে ব্যর্থ হয়েছে");
      }
    },
    [queryClient]
  );

  // 5. Business Logic: School Onboarding Success Callback
  const handleSchoolCreated = React.useCallback(
    (newSchool: CreatedSchoolResult) => {
      queryClient.invalidateQueries({ queryKey: ["schools"] });
      toast.success(`"${newSchool.name}" সফলভাবে যুক্ত হয়েছে!`);
    },
    [queryClient]
  );

  // 6. Memoized Table Columns bound to state and handlers
  const columns = React.useMemo(
    () =>
      getSchoolColumns({
        sortBy,
        sortOrder,
        onSortChange: setSorting,
        onDelete: handleDeleteSchool,
      }),
    [sortBy, sortOrder, setSorting, handleDeleteSchool]
  );

  return {
    // Data & Query States
    data: data?.data ?? [],
    meta: data?.meta,
    isLoading,
    isFetching,
    isError,
    error,

    // URL & Pagination States
    page,
    limit,
    searchTerm,
    sortBy,
    sortOrder,
    filters,
    queryParams,

    // State Modifiers
    setPage,
    setLimit,
    setSearchTerm,
    setSorting,
    setFilter,
    resetFilters,

    // Columns Definition
    columns,

    // Modal State & Action Handlers
    isOnboardingOpen,
    setIsOnboardingOpen,
    handleSchoolCreated,
    handleReload,
    handleDeleteSchool,
  };
}
