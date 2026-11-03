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
  getSchoolFilterConfigs,
  useSchoolsTable,
} from "@/components/schools";
import { useLanguage } from "@/i18n";

/**
 * Schools Management Table Component
 * Connects table UI to modular business logic and state management.
 */
function SchoolsTableContent() {
  const { dict } = useLanguage();
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

  const filterConfigs = React.useMemo(() => getSchoolFilterConfigs(dict), [dict]);

  return (
    <div className="w-full min-w-0">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-3 mb-3">
        <div className="flex items-center gap-3">
          {/* Browser Navigation (Back / Forward) Buttons */}
          <div className="flex items-center gap-1 rounded-lg border border-border/70 bg-card/60 p-0.5 shadow-2xs">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="h-8 w-8 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
              title={dict.common.back}
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
              title={dict.common.forward}
              aria-label="Forward"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground font-sans tracking-normal">
              {dict.schools.pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {dict.schools.pageSubtitle}
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
              {dict.schools.addNewSchool}
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
            title={dict.common.reload}
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
        searchPlaceholder={dict.schools.searchPlaceholder}
        onSearchChange={setSearchTerm}
        filterConfigs={filterConfigs}
        filters={filters}
        onFilterChange={setFilter}
        onResetFilters={resetFilters}
        emptyTitle={dict.schools.emptyTitle}
        emptyDescription={dict.schools.emptyDescription}
        onRowClick={(row) => toast.info(`${dict.schools.nameCol}: ${row.name}`)}
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

export default function SchoolsPage() {
  return (
    <React.Suspense
      fallback={
        <div className="w-full space-y-4 animate-pulse py-4">
          <div className="h-10 w-48 bg-muted rounded-md" />
          <div className="h-72 w-full bg-muted/40 rounded-xl border border-border" />
        </div>
      }
    >
      <SchoolsTableContent />
    </React.Suspense>
  );
}
