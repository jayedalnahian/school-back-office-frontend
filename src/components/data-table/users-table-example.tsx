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
    label: "Role",
    type: "multi-select",
    options: [
      { label: "Super Admin", value: "super_admin", icon: Shield },
      { label: "School Admin", value: "school_admin", icon: Shield },
      { label: "Teacher", value: "teacher", icon: BookOpen },
      { label: "Student", value: "student", icon: GraduationCap },
      { label: "Guardian", value: "guardian", icon: UserCheck },
    ],
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Active", value: "active", icon: UserCheck },
      { label: "Inactive", value: "inactive", icon: UserX },
      { label: "Suspended", value: "suspended", icon: UserX },
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
            title="User Name"
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={setSorting}
          />
        ),
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex flex-col">
              <span className="font-medium text-foreground">{user.full_name}</span>
              <span className="text-xs text-muted-foreground">{user.phone}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Email"
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
            title="Role"
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={setSorting}
          />
        ),
        cell: ({ row }) => {
          const role = row.original.role;
          const roleLabels: Record<UserRole, { label: string; variant: "default" | "secondary" | "outline" }> = {
            super_admin: { label: "Super Admin", variant: "default" },
            school_admin: { label: "School Admin", variant: "secondary" },
            teacher: { label: "Teacher", variant: "outline" },
            student: { label: "Student", variant: "outline" },
            guardian: { label: "Guardian", variant: "outline" },
          };
          const config = roleLabels[role] ?? { label: role, variant: "outline" };
          return (
            <Badge variant={config.variant} className="capitalize text-[11px] font-normal">
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
            title="Status"
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={setSorting}
          />
        ),
        cell: ({ row }) => {
          const status = row.original.status;
          const statusStyles: Record<UserStatus, { label: string; className: string }> = {
            active: { label: "Active", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
            inactive: { label: "Inactive", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
            suspended: { label: "Suspended", className: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" },
          };
          const badge = statusStyles[status] ?? { label: status, className: "" };
          return (
            <Badge variant="outline" className={`text-[11px] font-normal ${badge.className}`}>
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
            title="Joined Date"
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
                {format(new Date(date), "MMM dd, yyyy")}
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
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(user.id)}
                  className="cursor-pointer text-xs"
                >
                  Copy user ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-xs">
                  <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                  View details
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-xs">
                  <Pencil className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                  Edit user
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-xs text-destructive focus:text-destructive">
                  <Trash2 className="mr-2 h-3.5 w-3.5" />
                  Delete user
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
    <div className="space-y-4 p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage system administrators, teachers, students, and guardians.
          </p>
        </div>
        <Button size="sm" className="h-9 gap-1 text-xs">
          <Plus className="h-3.5 w-3.5" />
          Add New User
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
        searchPlaceholder="Search by name, email, or phone..."
        onSearchChange={setSearchTerm}
        // Faceted Filters
        filterConfigs={userFilterConfigs}
        filters={filters}
        onFilterChange={setFilter}
        onResetFilters={resetFilters}
        emptyTitle="No users found"
        emptyDescription="We couldn't find any users matching your filter or search criteria."
      />
    </div>
  );
}

export default UsersTableExample;
