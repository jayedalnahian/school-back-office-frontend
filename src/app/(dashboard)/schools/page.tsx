"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Plus, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  SchoolEditDialog,
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
    editingSchoolId,
    isEditDialogOpen,
    setIsEditDialogOpen,
    setPage,
    setLimit,
    setSearchTerm,
    setSorting,
    setFilter,
    resetFilters,
    handleReload,
    handleSchoolUpdated,
  } = useSchoolsTable();

  const router = useRouter();

  const handleBack = React.useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/dashboard");
    }
  }, [router]);

  const handleForward = React.useCallback(() => {
    if (typeof window !== "undefined") {
      router.forward();
    }
  }, [router]);

  return (
    <div className="w-full min-w-0">
      {/* Page Header */}
      <div className="flex flex-col -mt-5 gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-3 mb-3">
        <div className="flex items-center gap-3">
          {/* Browser Navigation (Back / Forward) Buttons */}
          <div className="flex items-center gap-1 rounded-lg border border-border/70 bg-card/60 p-0.5 shadow-2xs">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="h-8 w-8 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
              title="পূর্ববর্তী পৃষ্ঠায় ফিরে যান (Back)"
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleForward}
              className="h-8 w-8 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
              title="পরবর্তী পৃষ্ঠায় এগিয়ে যান (Forward)"
              aria-label="Forward"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground font-sans">
                বিদ্যালয় অনবোর্ডিং ও তালিকা
              </h1>
              <span className="hidden sm:inline-flex items-center rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                মডিউল
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">

            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            asChild
            size="sm"
            className="h-9 gap-1.5 text-xs font-semibold shadow-xs bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Link href="/schools/onboard">
              <Plus className="h-4 w-4" />
              নতুন বিদ্যালয় যুক্ত করুন
            </Link>
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
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReload}
            disabled={isFetching}
            className="h-8 gap-1.5 text-xs"
            title="ডাটা রিলোড করুন"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", isFetching && "animate-spin text-primary")} />
          </Button>
        }
        page={page}
        limit={limit}
        onPageChange={setPage}
        onLimitChange={setLimit}
        pageSizeOptions={[5, 10, 15, 20]}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={setSorting}
        search={searchTerm}
        searchPlaceholder="নাম, কোড, ঠিকানা বা ইমেইল দিয়ে খুঁজুন..."
        onSearchChange={setSearchTerm}
        filterConfigs={schoolFilterConfigs}
        filters={filters}
        onFilterChange={setFilter}
        onResetFilters={resetFilters}
        emptyTitle="কোনো বিদ্যালয় পাওয়া যায়নি"
        emptyDescription="আপনার ফিল্টার বা সার্চ কিওয়ার্ডের সাথে মেলে এমন কোনো বিদ্যালয় তথ্য ডাটাবেজে নেই।"
        onRowClick={(row) => toast.info(`নির্বাচিত বিদ্যালয়: ${row.name}`)}
      />

      {/* School Edit Dialog */}
      <SchoolEditDialog
        schoolId={editingSchoolId}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSuccess={handleSchoolUpdated}
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
