import { httpClient } from "@/lib/httpClient";
import type { DataTableQueryParams, PaginatedResponse } from "@/components/data-table";
import type {
  BackendSchool,
  SchoolRecord,
  CreatedSchoolResult,
  CreateSchoolPayload,
  OnboardSchoolPayload,
  OnboardSchoolResponse,
} from "./schools.types";

/**
 * Service to fetch paginated schools list with server-side filtering, sorting, and search
 */
export async function fetchSchools(
  params: DataTableQueryParams
): Promise<PaginatedResponse<SchoolRecord>> {
  const query: Record<string, unknown> = {
    page: params.page ?? 1,
    limit: params.limit ?? 10,
  };

  if (params.search && typeof params.search === "string" && params.search.trim().length > 0) {
    query.search = params.search.trim();
  }

  if (params.sortBy) {
    query.sortBy = params.sortBy === "code" ? "gps_code" : params.sortBy;
  }

  if (params.sortOrder) {
    query.sortOrder = params.sortOrder;
  }

  if (params.status) {
    query.status = params.status;
  }

  const response = await httpClient.get<BackendSchool[]>("/schools", {
    params: query,
  });

  const rawSchools = response.data ?? [];
  const meta = response.meta;

  const total = meta?.total ?? rawSchools.length;
  const page = meta?.page ?? Number(params.page ?? 1);
  const limit = meta?.limit ?? Number(params.limit ?? 10);
  const totalPages = Math.ceil(total / limit) || 1;

  const mappedData: SchoolRecord[] = rawSchools.map((school) => {
    const addressParts = [
      school.address,
      school.upazila,
      school.district,
      school.division,
    ].filter(Boolean);

    return {
      id: school.id,
      name: school.name,
      code: school.gps_code,
      gps_code: school.gps_code,
      division: school.division,
      district: school.district,
      upazila: school.upazila,
      cluster: school.cluster,
      type: "government",
      email: `school-${school.gps_code}@edu.bd`,
      phone: school.phone || "N/A",
      address: addressParts.length > 0 ? addressParts.join(", ") : "ঠিকানা দেওয়া হয়নি",
      website: `https://${school.gps_code}.edu.bd`,
      is_active: Boolean(school.is_active),
      total_students: 0,
      created_at: school.created_at,
    };
  });

  return {
    data: mappedData,
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

/**
 * Service to delete a school by ID
 */
export async function deleteSchool(id: string): Promise<void> {
  await httpClient.delete(`/schools/${id}`);
}

/**
 * Service to onboard a school with its primary admin account
 */
export async function onboardSchool(
  payload: OnboardSchoolPayload
): Promise<OnboardSchoolResponse> {
  const response = await httpClient.post<OnboardSchoolResponse>("/schools/onboard", payload);
  if (!response.data) {
    throw new Error(response.message || "Failed to onboard school");
  }
  return response.data;
}

/**
 * Service to create a standalone school
 */
export async function createSchool(
  payload: CreateSchoolPayload
): Promise<CreatedSchoolResult> {
  const response = await httpClient.post<CreatedSchoolResult>("/schools", payload);
  if (!response.data) {
    throw new Error(response.message || "Failed to create school");
  }
  return response.data;
}
