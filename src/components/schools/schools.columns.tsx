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
import type { Dictionary, Language } from "@/i18n";

/**
 * Filter configurations generator for faceted filtering in the schools DataTable
 */
export function getSchoolFilterConfigs(dict: Dictionary): DataTableFilterConfig[] {
  return [
    {
      key: "type",
      label: dict.schools.typeCol,
      type: "multi-select",
      options: [
        { label: dict.schools.filterGovt, value: "government" },
        { label: dict.schools.filterSemiGovt, value: "semi_government" },
        { label: dict.schools.filterPrivate, value: "private" },
      ],
    },
    {
      key: "status",
      label: dict.schools.statusCol,
      type: "select",
      options: [
        { label: dict.schools.filterActive, value: "active" },
        { label: dict.schools.filterInactive, value: "inactive" },
      ],
    },
  ];
}

/**
 * Static fallback filter configs for backwards compatibility
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
  dict?: Dictionary;
  language?: Language;
  formatNumber?: (val: number | string) => string;
  sortBy?: string | null;
  sortOrder?: SortOrder | null;
  onSortChange?: (field: string | null, order: SortOrder | null) => void;
  onDelete: (school: SchoolRecord) => void;
  onEdit: (school: SchoolRecord) => void;
}

/**
 * Generates table column definitions with sorting, badging, and contextual action menu
 */
export function getSchoolColumns({
  dict,
  language = "en",
  formatNumber = (v) => String(v),
  sortBy,
  sortOrder,
  onSortChange,
  onDelete,
  onEdit,
}: GetSchoolColumnsOptions): DataTableColumnDef<SchoolRecord>[] {
  const codeTitle = dict?.schools.codeCol ?? (language === "bn" ? "কোড" : "Code");
  const nameTitle = dict?.schools.nameCol ?? (language === "bn" ? "বিদ্যালয়ের নাম" : "School Name");
  const typeTitle = dict?.schools.typeCol ?? (language === "bn" ? "ধরন" : "Type");
  const contactTitle = dict?.schools.contactCol ?? (language === "bn" ? "যোগাযোগ" : "Contact");
  const studentsTitle = dict?.dashboard.totalStudents ?? (language === "bn" ? "মোট শিক্ষার্থী" : "Total Students");
  const statusTitle = dict?.schools.statusCol ?? (language === "bn" ? "অবস্থা" : "Status");
  const createdTitle = dict?.schools.createdAtCol ?? (language === "bn" ? "অনবোর্ডিং তারিখ" : "Onboarding Date");

  return [
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={codeTitle}
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
          title={nameTitle}
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
          title={typeTitle}
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
          government: {
            label: dict?.schools.filterGovt ?? (language === "bn" ? "সরকারি (Govt)" : "Government"),
            variant: "default",
          },
          semi_government: {
            label: dict?.schools.filterSemiGovt ?? (language === "bn" ? "আধা-সরকারি (Semi Govt)" : "Semi-Government"),
            variant: "secondary",
          },
          private: {
            label: dict?.schools.filterPrivate ?? (language === "bn" ? "বেসরকারি (Private)" : "Private"),
            variant: "outline",
          },
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
          title={contactTitle}
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
          title={studentsTitle}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ row }) => (
        <span className="font-semibold text-xs tabular-nums text-foreground">
          {formatNumber(row.original.total_students.toLocaleString())}
        </span>
      ),
    },
    {
      accessorKey: "is_active",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={statusTitle}
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
            {dict?.common.active ?? "Active"}
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[11px] font-normal gap-1"
          >
            <XCircle className="h-3 w-3" />
            {dict?.common.inactive ?? "Inactive"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={createdTitle}
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
          <div className="flex items-center justify-end gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 p-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="text-xs">
                  {dict?.common.actions ?? "Actions"}
                </DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(school.id);
                    toast.success(dict?.schools.codeCopied ?? "Code copied to clipboard");
                  }}
                  className="cursor-pointer text-xs"
                >
                  <Copy className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                  {dict?.schools.copyCode ?? "Copy ID"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => window.open(school.website, "_blank")}
                  className="cursor-pointer text-xs"
                >
                  <ExternalLink className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                  {language === "bn" ? "ওয়েবসাইট ভিজিট" : "Visit Website"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => toast.info(`${dict?.common.details ?? "Details"}: ${school.name}`)}
                  className="cursor-pointer text-xs"
                >
                  <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                  {dict?.common.details ?? "View Details"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    setTimeout(() => {
                      onEdit(school);
                    }, 50);
                  }}
                  className="cursor-pointer text-xs font-medium text-primary focus:text-primary"
                >
                  <Pencil className="mr-2 h-3.5 w-3.5 text-primary" />
                  {dict?.schools.editSchool ?? "Edit School"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDelete(school)}
                  className="cursor-pointer text-xs text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-3.5 w-3.5" />
                  {dict?.schools.deleteSchool ?? "Delete School"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
