"use client";

import * as React from "react";
import { Building2, Plus, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  SchoolOnboardingDialog,
  schoolFilterConfigs,
  useSchoolsTable,
} from "@/components/schools";

/**
 * Schools Management Table Component
 * Connects table UI to modular business logic and state management.
 */
function SchoolsTableContent() {
  const {
    data,
    meta,
    isLoading,
    isFetching,
    isError,
    error,
    page,
    limit,
    searchTerm,
    sortBy,
    sortOrder,
    filters,
    columns,
    isOnboardingOpen,
    setIsOnboardingOpen,
    setPage,
    setLimit,
    setSearchTerm,
    setSorting,
    setFilter,
    resetFilters,
    handleReload,
    handleSchoolCreated,
  } = useSchoolsTable();

  return (
    <div className="space-y-6 w-full min-w-0">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                বিদ্যালয় অনবোর্ডিং ও তালিকা
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                সিস্টেমে নিবন্ধিত সকল বিদ্যালয় পর্যবেক্ষণ, সর্টিং, ফিল্টারিং ও পরিচালনা করুন
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReload}
            disabled={isFetching}
            className="h-9 gap-1.5 text-xs shadow-xs"
            title="ডাটা রিলোড করুন"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", isFetching && "animate-spin text-primary")} />
            <span className="hidden sm:inline">ডাটা রিলোড</span>
          </Button>

          <Button
            size="sm"
            onClick={() => setIsOnboardingOpen(true)}
            className="h-9 gap-1.5 text-xs font-semibold shadow-xs"
          >
            <Plus className="h-4 w-4" />
            নতুন বিদ্যালয় যুক্ত করুন
          </Button>
        </div>
      </div>

      {/* Live Data Table with Real Server-Side Processing */}
      <DataTable
        columns={columns}
        data={data}
        meta={meta}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        error={error}
        toolbarActions={
          <Button
            variant="outline"
            size="sm"
            onClick={handleReload}
            disabled={isFetching}
            className="h-8 gap-1.5 text-xs"
            title="ডাটা রিলোড করুন"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", isFetching && "animate-spin text-primary")} />
            <span>রিলোড</span>
          </Button>
        }
        // Pagination
        page={page}
        limit={limit}
        onPageChange={setPage}
        onLimitChange={setLimit}
        pageSizeOptions={[5, 10, 15, 20]}
        // Sorting
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={setSorting}
        // Search
        search={searchTerm}
        searchPlaceholder="নাম, কোড, ঠিকানা বা ইমেইল দিয়ে খুঁজুন..."
        onSearchChange={setSearchTerm}
        // Faceted Filters
        filterConfigs={schoolFilterConfigs}
        filters={filters}
        onFilterChange={setFilter}
        onResetFilters={resetFilters}
        // UI
        emptyTitle="কোনো বিদ্যালয় পাওয়া যায়নি"
        emptyDescription="আপনার ফিল্টার বা সার্চ কিওয়ার্ডের সাথে মেলে এমন কোনো বিদ্যালয় তথ্য ডাটাবেজে নেই।"
        onRowClick={(row) => toast.info(`নির্বাচিত বিদ্যালয়: ${row.name}`)}
      />

      {/* School Onboarding Dialog */}
      <SchoolOnboardingDialog
        open={isOnboardingOpen}
        onOpenChange={setIsOnboardingOpen}
        onSuccess={handleSchoolCreated}
      />
    </div>
  );
}

/**
 * Root page component wrapped with Suspense boundary for nuqs search params
 */
export default function SchoolsPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
          বিদ্যালয়ের তথ্য লোড করা হচ্ছে...
        </div>
      }
    >
      <SchoolsTableContent />
    </React.Suspense>
  );
}
