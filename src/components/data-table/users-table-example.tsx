"use client";

import * as React from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { parseAsString, parseAsStringLiteral } from "nuqs";
import { format } from "date-fns";
import {
  MoreHorizontal,
  Plus,
  Shield,
  GraduationCap,
  BookOpen,
  UserCheck,
  UserX,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { httpClient } from "@/lib/httpClient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DataTable,
  DataTableColumnHeader,
  useDataTableQuery,
  type DataTableColumnDef,
  type DataTableFilterConfig,
  type DataTableQueryParams,
  type PaginatedResponse,
} from "@/components/data-table";

// -------------------------------------------------------------
// 1. Data Models & Types
// -------------------------------------------------------------
export type UserRole = "super_admin" | "school_admin" | "teacher" | "student" | "guardian";
export type UserStatus = "active" | "inactive" | "suspended";

export interface User {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
}

// -------------------------------------------------------------
// 2. Query Keys Factory & API Fetcher
// -------------------------------------------------------------
export const userQueryKeys = {
  all: ["users"] as const,
  lists: () => [...userQueryKeys.all, "list"] as const,
  list: (params: DataTableQueryParams) => [...userQueryKeys.lists(), params] as const,
};

async function fetchUsers(params: DataTableQueryParams): Promise<PaginatedResponse<User>> {
  const response = await httpClient.get<PaginatedResponse<User>>("/users", {
    params,
  });

  return (
    response.data ?? {
      data: [],
      meta: {
        page: params.page ?? 1,
        limit: params.limit ?? 10,
        total: 0,
        totalPages: 0,
      },
    }
  );
}

export function useUsersQuery(params: DataTableQueryParams) {
  return useQuery({
    queryKey: userQueryKeys.list(params),
    queryFn: () => fetchUsers(params),
    placeholderData: keepPreviousData, // TanStack Query v5 keeps existing rows while page changes
    staleTime: 30 * 1000,
  });
}

// -------------------------------------------------------------
// 3. Filter Configurations
// -------------------------------------------------------------
const userFilterConfigs: DataTableFilterConfig[] = [
  {
    key: "role",
    label: "পদবি / রোল (Role)",
    type: "multi-select",
    options: [
      { label: "সুপার অ্যাডমিন (Super Admin)", value: "super_admin", icon: Shield },
      { label: "স্কুল অ্যাডমিন (School Admin)", value: "school_admin", icon: Shield },
      { label: "শিক্ষক (Teacher)", value: "teacher", icon: BookOpen },
      { label: "শিক্ষার্থী (Student)", value: "student", icon: GraduationCap },
      { label: "অভিভাবক (Guardian)", value: "guardian", icon: UserCheck },
    ],
  },
  {
    key: "status",
    label: "অবস্থা (Status)",
    type: "select",
    options: [
      { label: "সক্রিয় (Active)", value: "active", icon: UserCheck },
      { label: "নিষ্ক্রিয় (Inactive)", value: "inactive", icon: UserX },
      { label: "স্থগিত (Suspended)", value: "suspended", icon: UserX },
    ],
  },
];

// -------------------------------------------------------------
// 4. Users Table Page Implementation
// -------------------------------------------------------------
export function UsersTableExample() {
  // Connect URL Search Params with nuqs and debounce
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
    debounceMs: 400,
    filterParsers: {
      role: parseAsString,
      status: parseAsStringLiteral(["active", "inactive", "suspended"] as const),
    },
  });

  // Fetch users with TanStack Query (automatically refetches when queryParams change)
  const { data, isLoading, isFetching, isError, error } = useUsersQuery(queryParams);

  // Column definitions with Server-Side Sorting Headers
  const columns = React.useMemo<DataTableColumnDef<User>[]>(
    () => [
      {
        accessorKey: "full_name",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="ইউজারের নাম ও মোবাইল"
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={setSorting}
          />
        ),
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-foreground text-sm">{user.full_name}</span>
              <span className="text-xs text-muted-foreground font-mono">{user.phone}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="ইমেইল অ্যাড্রেস"
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={setSorting}
          />
        ),
        cell: ({ row }) => (
          <span className="text-xs font-mono text-muted-foreground">
            {row.original.email}
          </span>
        ),
      },
      {
        accessorKey: "role",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="পদবি / রোল"
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={setSorting}
          />
        ),
        cell: ({ row }) => {
          const role = row.original.role;
          const roleLabels: Record<UserRole, { label: string; variant: "default" | "secondary" | "outline" }> = {
            super_admin: { label: "সুপার অ্যাডমিন", variant: "default" },
            school_admin: { label: "স্কুল অ্যাডমিন", variant: "secondary" },
            teacher: { label: "শিক্ষক", variant: "outline" },
            student: { label: "শিক্ষার্থী", variant: "outline" },
            guardian: { label: "অভিভাবক", variant: "outline" },
          };
          const config = roleLabels[role] ?? { label: role, variant: "outline" };
          return (
            <Badge variant={config.variant} className="text-[11px] font-medium">
              {config.label}
            </Badge>
          );
        },
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="অবস্থা"
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={setSorting}
          />
        ),
        cell: ({ row }) => {
          const status = row.original.status;
          const statusStyles: Record<UserStatus, { label: string; className: string }> = {
            active: { label: "সক্রিয়", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
            inactive: { label: "নিষ্ক্রিয়", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
            suspended: { label: "স্থগিত", className: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" },
          };
          const badge = statusStyles[status] ?? { label: status, className: "" };
          return (
            <Badge variant="outline" className={`text-[11px] font-medium ${badge.className}`}>
              {badge.label}
            </Badge>
          );
        },
      },
      {
        accessorKey: "created_at",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="নিবন্ধনের তারিখ"
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={setSorting}
          />
        ),
        cell: ({ row }) => {
          const date = row.original.created_at;
          try {
            return (
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {format(new Date(date), "dd MMM, yyyy")}
              </span>
            );
          } catch {
            return <span className="text-xs text-muted-foreground">{date}</span>;
          }
        },
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const user = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 shadow-md">
                <DropdownMenuLabel className="text-xs">অ্যাকশন (Actions)</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(user.id)}
                  className="cursor-pointer text-xs"
                >
                  ইউজার আইডি কপি করুন
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-xs">
                  <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                  বিস্তারিত দেখুন
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-xs">
                  <Pencil className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                  তথ্য সম্পাদনা
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-xs text-destructive focus:text-destructive">
                  <Trash2 className="mr-2 h-3.5 w-3.5" />
                  ইউজার মুছে ফেলুন
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [sortBy, sortOrder, setSorting]
  );

  return (
    <div className="space-y-6 w-full min-w-0">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-2xs">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground font-sans">
                  ইউজার ব্যবস্থাপনা (User Management)
                </h1>
                <span className="hidden sm:inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                  অ্যাডমিন কন্ট্রোল
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                সিস্টেম অ্যাডমিনিস্ট্রেটর, প্রধান শিক্ষক, শিক্ষক, শিক্ষার্থী ও অভিভাবকদের অ্যাকাউন্ট পরিচালনা করুন
              </p>
            </div>
          </div>
        </div>

        <Button size="sm" className="h-9 gap-1.5 text-xs font-semibold shadow-xs bg-primary hover:bg-primary/90 text-primary-foreground shrink-0">
          <Plus className="h-4 w-4" />
          নতুন ইউজার যুক্ত করুন
        </Button>
      </div>

      {/* Fully Server-Side Controlled Reusable Data Table */}
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        meta={data?.meta}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        error={error}
        // Pagination
        page={page}
        limit={limit}
        onPageChange={setPage}
        onLimitChange={setLimit}
        // Sorting
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={setSorting}
        // Search
        search={searchTerm}
        searchPlaceholder="নাম, ইমেইল বা মোবাইল দিয়ে খুঁজুন..."
        onSearchChange={setSearchTerm}
        // Faceted Filters
        filterConfigs={userFilterConfigs}
        filters={filters}
        onFilterChange={setFilter}
        onResetFilters={resetFilters}
        emptyTitle="কোনো ইউজার পাওয়া যায়নি"
        emptyDescription="আপনার ফিল্টার বা সার্চ কিওয়ার্ডের সাথে মেলে এমন কোনো ইউজার অ্যাকাউন্ট ডাটাবেজে নেই।"
      />
    </div>
  );
}

export default UsersTableExample;
