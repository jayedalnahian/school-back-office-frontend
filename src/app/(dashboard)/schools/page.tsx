"use client";

import * as React from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { parseAsString, parseAsStringLiteral } from "nuqs";
import { format } from "date-fns";
import {
  Building2,
  Plus,
  MoreHorizontal,
  Globe,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  XCircle,
  Eye,
  Pencil,
  Trash2,
  Copy,
  ExternalLink,
} from "lucide-react";
import {
  DataTable,
  DataTableColumnHeader,
  useDataTableQuery,
  type DataTableColumnDef,
  type DataTableFilterConfig,
  type DataTableQueryParams,
  type PaginatedResponse,
} from "@/components/data-table";
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
import { toast } from "sonner";
import {
  SchoolOnboardingDialog,
  type CreatedSchoolResult,
} from "@/components/schools/school-onboarding-dialog";

// -------------------------------------------------------------
// 1. Data Type Definition
// -------------------------------------------------------------
export interface SchoolRecord {
  id: string;
  name: string;
  code: string;
  type: "government" | "private" | "semi_government";
  email: string;
  phone: string;
  address: string;
  website: string;
  is_active: boolean;
  total_students: number;
  created_at: string;
}

// -------------------------------------------------------------
// 2. Comprehensive Realistic Dummy Dataset (25 Records)
// -------------------------------------------------------------
const DUMMY_SCHOOLS: SchoolRecord[] = [
  {
    id: "sch-001",
    name: "Dhaka Residential Model College",
    code: "DRMC-101",
    type: "government",
    email: "info@drmc.edu.bd",
    phone: "+880 1711-000101",
    address: "Mirpur Road, Mohammadpur, Dhaka",
    website: "https://drmc.edu.bd",
    is_active: true,
    total_students: 4850,
    created_at: "2024-01-15T09:00:00Z",
  },
  {
    id: "sch-002",
    name: "Viqarunnisa Noon School & College",
    code: "VNSC-102",
    type: "semi_government",
    email: "contact@vnsc.edu.bd",
    phone: "+880 1711-000102",
    address: "1/A New Baily Road, Dhaka",
    website: "https://vnsc.edu.bd",
    is_active: true,
    total_students: 7200,
    created_at: "2024-02-10T10:30:00Z",
  },
  {
    id: "sch-003",
    name: "Notre Dame College",
    code: "NDC-103",
    type: "private",
    email: "notredame@ndc.edu.bd",
    phone: "+880 1711-000103",
    address: "Toyenbee Circular Rd, Motijheel, Dhaka",
    website: "https://ndc.edu.bd",
    is_active: true,
    total_students: 3400,
    created_at: "2024-03-01T08:15:00Z",
  },
  {
    id: "sch-004",
    name: "Rajuk Uttara Model College",
    code: "RUMC-104",
    type: "government",
    email: "admin@rumc.edu.bd",
    phone: "+880 1711-000104",
    address: "Sector 6, Uttara, Dhaka",
    website: "https://rumc.edu.bd",
    is_active: true,
    total_students: 5600,
    created_at: "2024-03-20T11:45:00Z",
  },
  {
    id: "sch-005",
    name: "St. Joseph Higher Secondary School",
    code: "SJHSS-105",
    type: "private",
    email: "info@sjs.edu.bd",
    phone: "+880 1711-000105",
    address: "97 Asad Avenue, Mohammadpur, Dhaka",
    website: "https://sjs.edu.bd",
    is_active: true,
    total_students: 2900,
    created_at: "2024-04-05T14:20:00Z",
  },
  {
    id: "sch-006",
    name: "Chittagong Collegiate School",
    code: "CCS-201",
    type: "government",
    email: "ctgcollegiate@ctg.edu.bd",
    phone: "+880 1811-000201",
    address: "Ice Factory Road, Chittagong",
    website: "https://ccs.edu.bd",
    is_active: true,
    total_students: 3100,
    created_at: "2024-04-18T10:00:00Z",
  },
  {
    id: "sch-007",
    name: "Mirzapur Cadet College",
    code: "MCC-301",
    type: "government",
    email: "admin@mcc.edu.bd",
    phone: "+880 1711-000301",
    address: "Mirzapur, Tangail",
    website: "https://mcc.edu.bd",
    is_active: true,
    total_students: 650,
    created_at: "2024-05-12T09:30:00Z",
  },
  {
    id: "sch-008",
    name: "Rajshahi Collegiate School",
    code: "RCS-401",
    type: "government",
    email: "principal@rcs.edu.bd",
    phone: "+880 1711-000401",
    address: "Boalia, Rajshahi",
    website: "https://rcs.edu.bd",
    is_active: true,
    total_students: 2600,
    created_at: "2024-05-25T13:10:00Z",
  },
  {
    id: "sch-009",
    name: "Sylhet Cadet College",
    code: "SCC-501",
    type: "government",
    email: "info@scc.edu.bd",
    phone: "+880 1711-000501",
    address: "Airport Road, Sylhet",
    website: "https://scc.edu.bd",
    is_active: false,
    total_students: 620,
    created_at: "2024-06-02T16:00:00Z",
  },
  {
    id: "sch-0010",
    name: "Barisal Zilla School",
    code: "BZS-601",
    type: "government",
    email: "bzs@barisal.edu.bd",
    phone: "+880 1711-000601",
    address: "Sadartown, Barisal",
    website: "https://bzs.edu.bd",
    is_active: true,
    total_students: 2400,
    created_at: "2024-06-15T08:45:00Z",
  },
  {
    id: "sch-0011",
    name: "Comilla Zilla School",
    code: "CZS-701",
    type: "government",
    email: "info@czs.edu.bd",
    phone: "+880 1711-000701",
    address: "Kandirpar, Cumilla",
    website: "https://czs.edu.bd",
    is_active: true,
    total_students: 2850,
    created_at: "2024-07-01T10:15:00Z",
  },
  {
    id: "sch-0012",
    name: "Mymensingh Zilla School",
    code: "MZS-801",
    type: "government",
    email: "headmaster@mzs.edu.bd",
    phone: "+880 1711-000801",
    address: "Town Hall, Mymensingh",
    website: "https://mzs.edu.bd",
    is_active: true,
    total_students: 2700,
    created_at: "2024-07-14T11:00:00Z",
  },
  {
    id: "sch-0013",
    name: "Scholastica Senior Campus",
    code: "SCH-901",
    type: "private",
    email: "admissions@scholasticabd.com",
    phone: "+880 1711-000901",
    address: "Sector 3, Uttara, Dhaka",
    website: "https://scholasticabd.com",
    is_active: true,
    total_students: 3900,
    created_at: "2024-08-05T09:20:00Z",
  },
  {
    id: "sch-0014",
    name: "Mastermind English Medium School",
    code: "MEMS-902",
    type: "private",
    email: "info@mastermind.edu.bd",
    phone: "+880 1711-000902",
    address: "Dhanmondi, Dhaka",
    website: "https://mastermind.edu.bd",
    is_active: false,
    total_students: 2100,
    created_at: "2024-08-20T14:40:00Z",
  },
  {
    id: "sch-0015",
    name: "Rangpur Zilla School",
    code: "RZS-903",
    type: "government",
    email: "rzs@rangpur.edu.bd",
    phone: "+880 1711-000903",
    address: "Jahangirnagar, Rangpur",
    website: "https://rzs.edu.bd",
    is_active: true,
    total_students: 2300,
    created_at: "2024-09-02T10:30:00Z",
  },
  {
    id: "sch-0016",
    name: "Holy Cross Girls' High School",
    code: "HCGHS-106",
    type: "private",
    email: "office@holycross.edu.bd",
    phone: "+880 1711-000106",
    address: "Tejgaon, Dhaka",
    website: "https://holycross.edu.bd",
    is_active: true,
    total_students: 3100,
    created_at: "2024-09-18T12:00:00Z",
  },
  {
    id: "sch-0017",
    name: "Bogra Zilla School",
    code: "BOG-904",
    type: "government",
    email: "admin@bograzilla.edu.bd",
    phone: "+880 1711-000904",
    address: "Jaleshwaritola, Bogra",
    website: "https://bograzilla.edu.bd",
    is_active: true,
    total_students: 2500,
    created_at: "2024-10-01T08:00:00Z",
  },
  {
    id: "sch-0018",
    name: "Khulna Zilla School",
    code: "KZS-905",
    type: "government",
    email: "kzs@khulna.edu.bd",
    phone: "+880 1711-000905",
    address: "South Central Road, Khulna",
    website: "https://kzs.edu.bd",
    is_active: false,
    total_students: 2200,
    created_at: "2024-10-15T15:20:00Z",
  },
  {
    id: "sch-0019",
    name: "Ideal School and College",
    code: "ISC-107",
    type: "semi_government",
    email: "contact@idealschool.edu.bd",
    phone: "+880 1711-000107",
    address: "Motijheel, Dhaka",
    website: "https://idealschool.edu.bd",
    is_active: true,
    total_students: 11500,
    created_at: "2024-11-01T09:10:00Z",
  },
  {
    id: "sch-0020",
    name: "Pabna Zilla School",
    code: "PZS-906",
    type: "government",
    email: "pabnazilla@pabna.edu.bd",
    phone: "+880 1711-000906",
    address: "Abdul Hamid Road, Pabna",
    website: "https://pabnazilla.edu.bd",
    is_active: true,
    total_students: 2150,
    created_at: "2024-11-12T13:30:00Z",
  },
  {
    id: "sch-0021",
    name: "Adamjee Cantonment College",
    code: "ACC-108",
    type: "semi_government",
    email: "info@acc.edu.bd",
    phone: "+880 1711-000108",
    address: "Dhaka Cantonment, Dhaka",
    website: "https://acc.edu.bd",
    is_active: true,
    total_students: 5800,
    created_at: "2024-11-25T10:00:00Z",
  },
  {
    id: "sch-0022",
    name: "Dhaka City College",
    code: "DCC-109",
    type: "private",
    email: "info@dhakacitycollege.edu.bd",
    phone: "+880 1711-000109",
    address: "Kudrat-E-Khuda Road, Dhanmondi, Dhaka",
    website: "https://dhakacitycollege.edu.bd",
    is_active: false,
    total_students: 6200,
    created_at: "2024-12-05T14:15:00Z",
  },
  {
    id: "sch-0023",
    name: "Faujdarhat Cadet College",
    code: "FCC-202",
    type: "government",
    email: "admin@fcc.edu.bd",
    phone: "+880 1811-000202",
    address: "Faujdarhat, Sitakunda, Chittagong",
    website: "https://fcc.edu.bd",
    is_active: true,
    total_students: 630,
    created_at: "2024-12-18T11:45:00Z",
  },
  {
    id: "sch-0024",
    name: "Kushtia Zilla School",
    code: "KUZ-907",
    type: "government",
    email: "kushtiazilla@kushtia.edu.bd",
    phone: "+880 1711-000907",
    address: "NS Road, Kushtia",
    website: "https://kushtiazilla.edu.bd",
    is_active: true,
    total_students: 1950,
    created_at: "2025-01-08T09:00:00Z",
  },
  {
    id: "sch-0025",
    name: "Dinajpur Zilla School",
    code: "DZS-908",
    type: "government",
    email: "dinajpurzilla@dinajpur.edu.bd",
    phone: "+880 1711-000908",
    address: "Munshipara, Dinajpur",
    website: "https://dinajpurzilla.edu.bd",
    is_active: true,
    total_students: 2050,
    created_at: "2025-01-20T10:30:00Z",
  },
];

// -------------------------------------------------------------
// 3. Simulated Server-Side Processing (Search, Sort, Pagination)
// -------------------------------------------------------------
async function mockFetchSchools(
  params: DataTableQueryParams
): Promise<PaginatedResponse<SchoolRecord>> {
  // Simulate network latency (250ms) to test keepPreviousData & isFetching
  await new Promise((resolve) => setTimeout(resolve, 250));

  let result = [...DUMMY_SCHOOLS];

  // 1. Search filtering
  if (params.search && params.search.trim().length > 0) {
    const query = params.search.trim().toLowerCase();
    result = result.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.code.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.address.toLowerCase().includes(query) ||
        item.phone.toLowerCase().includes(query)
    );
  }

  // 2. Faceted filters: Type
  if (params.type) {
    const typeValue = params.type;
    if (Array.isArray(typeValue)) {
      result = result.filter((item) => (typeValue as string[]).includes(item.type));
    } else {
      result = result.filter((item) => item.type === typeValue);
    }
  }

  // 3. Faceted filters: Status
  if (params.status) {
    const statusValue = params.status;
    if (statusValue === "active") {
      result = result.filter((item) => item.is_active === true);
    } else if (statusValue === "inactive") {
      result = result.filter((item) => item.is_active === false);
    }
  }

  // 4. Server-Side Sorting
  if (params.sortBy) {
    const field = params.sortBy as keyof SchoolRecord;
    const isAsc = params.sortOrder === "asc";

    result.sort((a, b) => {
      const valA = a[field];
      const valB = b[field];

      if (typeof valA === "string" && typeof valB === "string") {
        return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      if (typeof valA === "number" && typeof valB === "number") {
        return isAsc ? valA - valB : valB - valA;
      }
      if (typeof valA === "boolean" && typeof valB === "boolean") {
        return isAsc
          ? Number(valA) - Number(valB)
          : Number(valB) - Number(valA);
      }
      return 0;
    });
  }

  // 5. Server-Side Pagination
  const total = result.length;
  const page = Math.max(1, params.page ?? 1);
  const limit = Math.max(1, params.limit ?? 10);
  const totalPages = Math.ceil(total / limit);

  const startIndex = (page - 1) * limit;
  const pageSlice = result.slice(startIndex, startIndex + limit);

  return {
    data: pageSlice,
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}

// -------------------------------------------------------------
// 4. Filter Configurations
// -------------------------------------------------------------
const schoolFilterConfigs: DataTableFilterConfig[] = [
  {
    key: "type",
    label: "ধরন (Type)",
    type: "multi-select",
    options: [
      { label: "Government", value: "government" },
      { label: "Semi Government", value: "semi_government" },
      { label: "Private", value: "private" },
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

// -------------------------------------------------------------
// 5. Schools Management Page
// -------------------------------------------------------------
function SchoolsTableContent() {
  const [isOnboardingOpen, setIsOnboardingOpen] = React.useState(false);

  // nuqs + use-debounce URL State Management
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

  // TanStack Query with placeholderData: keepPreviousData
  const { data, isLoading, isFetching, isPlaceholderData, isError, error } =
    useQuery({
      queryKey: ["schools", "list", queryParams],
      queryFn: () => mockFetchSchools(queryParams),
      placeholderData: keepPreviousData,
      staleTime: 60 * 1000,
    });

  // Callback when a school is created to update local mock state
  const handleSchoolCreated = (newSchool: CreatedSchoolResult) => {
    const newRecord: SchoolRecord = {
      id: newSchool.id,
      name: newSchool.name,
      code: newSchool.gps_code,
      type: "government",
      email: newSchool.email || `info@${newSchool.gps_code}.edu.bd`,
      phone: newSchool.phone || "N/A",
      address: [newSchool.address, newSchool.upazila, newSchool.district]
        .filter(Boolean)
        .join(", "),
      website: `https://${newSchool.gps_code}.edu.bd`,
      is_active: newSchool.is_active,
      total_students: 0,
      created_at: newSchool.created_at || new Date().toISOString(),
    };
    DUMMY_SCHOOLS.unshift(newRecord);
  };

  // Column Definitions
  const columns = React.useMemo<DataTableColumnDef<SchoolRecord>[]>(
    () => [
      {
        accessorKey: "code",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="কোড"
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={setSorting}
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
            onSortChange={setSorting}
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
            onSortChange={setSorting}
          />
        ),
        cell: ({ row }) => {
          const type = row.original.type;
          const typeConfig: Record<
            SchoolRecord["type"],
            { label: string; variant: "default" | "secondary" | "outline" }
          > = {
            government: { label: "Government", variant: "default" },
            semi_government: { label: "Semi Govt", variant: "secondary" },
            private: { label: "Private", variant: "outline" },
          };
          const config = typeConfig[type] ?? { label: type, variant: "outline" };
          return (
            <Badge variant={config.variant} className="capitalize text-[11px] font-normal">
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
            onSortChange={setSorting}
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
            onSortChange={setSorting}
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
            onSortChange={setSorting}
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
                  onClick={() => toast.info(`Viewing details of ${school.name}`)}
                  className="cursor-pointer text-xs"
                >
                  <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                  বিস্তারিত দেখুন
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => toast.info(`Editing ${school.name}`)}
                  className="cursor-pointer text-xs"
                >
                  <Pencil className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                  তথ্য সম্পাদনা
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => toast.error(`${school.name} মুছে ফেলার অনুরোধ করা হয়েছে`)}
                  className="cursor-pointer text-xs text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-3.5 w-3.5" />
                  মুছে ফেলুন
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
            size="sm"
            onClick={() => setIsOnboardingOpen(true)}
            className="h-9 gap-1.5 text-xs font-semibold shadow-xs"
          >
            <Plus className="h-4 w-4" />
            নতুন বিদ্যালয় যুক্ত করুন
          </Button>
        </div>
      </div>

      {/* Live Data Table with Simulated Server-Side Processing */}
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
