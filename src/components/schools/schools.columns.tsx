"use client";

import * as React from "react";
import { format } from "date-fns";
import {
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  XCircle,
  Eye,
  Pencil,
  Trash2,
  Copy,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
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
  DataTableColumnHeader,
  type DataTableColumnDef,
  type DataTableFilterConfig,
  type SortOrder,
} from "@/components/data-table";
import type { SchoolRecord } from "./schools.types";

/**
 * Filter configurations for faceted filtering in the schools DataTable
 */
export const schoolFilterConfigs: DataTableFilterConfig[] = [
  {
    key: "type",
    label: "ধরন (Type)",
    type: "multi-select",
    options: [
      { label: "সরকারি (Govt)", value: "government" },
      { label: "আধা-সরকারি (Semi Govt)", value: "semi_government" },
      { label: "বেসরকারি (Private)", value: "private" },
    ],
  },
  {
    key: "status",
    label: "অবস্থা (Status)",
    type: "select",
    options: [
      { label: "সক্রিয় (Active)", value: "active" },
      { label: "নিষ্ক্রিয় (Inactive)", value: "inactive" },
    ],
  },
];

interface GetSchoolColumnsOptions {
  sortBy?: string | null;
  sortOrder?: SortOrder | null;
  onSortChange?: (field: string | null, order: SortOrder | null) => void;
  onDelete: (school: SchoolRecord) => void;
}

/**
 * Generates table column definitions with sorting, badging, and contextual action menu
 */
export function getSchoolColumns({
  sortBy,
  sortOrder,
  onSortChange,
  onDelete,
}: GetSchoolColumnsOptions): DataTableColumnDef<SchoolRecord>[] {
  return [
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="কোড"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-xs font-semibold text-primary">
          {row.original.code}
        </span>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="বিদ্যালয়ের নাম"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ row }) => {
        const school = row.original;
        return (
          <div className="flex flex-col gap-0.5 max-w-[260px]">
            <span className="font-medium text-foreground text-sm truncate" title={school.name}>
              {school.name}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground truncate">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{school.address}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="ধরন"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ row }) => {
        const type = row.original.type;
        const typeConfig: Record<
          SchoolRecord["type"],
          { label: string; variant: "default" | "secondary" | "outline" }
        > = {
          government: { label: "সরকারি (Govt)", variant: "default" },
          semi_government: { label: "আধা-সরকারি (Semi Govt)", variant: "secondary" },
          private: { label: "বেসরকারি (Private)", variant: "outline" },
        };
        const config = typeConfig[type] ?? { label: type, variant: "outline" };
        return (
          <Badge variant={config.variant} className="text-[11px] font-medium">
            {config.label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="যোগাযোগ"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ row }) => {
        const school = row.original;
        return (
          <div className="flex flex-col text-xs text-muted-foreground gap-0.5">
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3 opacity-70" />
              {school.email}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3 opacity-70" />
              {school.phone}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "total_students",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="মোট শিক্ষার্থী"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ row }) => (
        <span className="font-semibold text-xs tabular-nums text-foreground">
          {row.original.total_students.toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "is_active",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="অবস্থা"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ row }) => {
        const isActive = row.original.is_active;
        return isActive ? (
          <Badge
            variant="outline"
            className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[11px] font-normal gap-1"
          >
            <CheckCircle2 className="h-3 w-3" />
            সক্রিয়
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[11px] font-normal gap-1"
          >
            <XCircle className="h-3 w-3" />
            নিষ্ক্রিয়
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="অনবোর্ডিং তারিখ"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
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
        const school = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="text-xs">অ্যাকশন</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(school.id);
                  toast.success("School ID ক্লিপবোর্ডে কপি হয়েছে");
                }}
                className="cursor-pointer text-xs"
              >
                <Copy className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                কপি আইডি
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => window.open(school.website, "_blank")}
                className="cursor-pointer text-xs"
              >
                <ExternalLink className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                ওয়েবসাইট ভিজিট
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => toast.info(`${school.name}-এর বিস্তারিত তথ্য`)}
                className="cursor-pointer text-xs"
              >
                <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                বিস্তারিত তথ্য দেখুন
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => toast.info(`${school.name}-এর তথ্য সম্পাদনা`)}
                className="cursor-pointer text-xs"
              >
                <Pencil className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                তথ্য সম্পাদনা করুন
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(school)}
                className="cursor-pointer text-xs text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                মুছে ফেলুন (Delete)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
