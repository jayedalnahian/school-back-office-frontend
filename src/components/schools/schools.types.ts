export interface BackendSchool {
  id: string;
  gps_code: string;
  name: string;
  division?: string | null;
  district?: string | null;
  upazila?: string | null;
  cluster?: string | null;
  address?: string | null;
  phone?: string | null;
  is_active: boolean;
  is_deleted?: boolean;
  created_at: string;
  updated_at: string;
}

export interface SchoolRecord {
  id: string;
  name: string;
  code: string;
  gps_code?: string;
  division?: string | null;
  district?: string | null;
  upazila?: string | null;
  cluster?: string | null;
  type: "government" | "private" | "semi_government";
  email: string;
  phone: string;
  address: string;
  website: string;
  is_active: boolean;
  total_students: number;
  created_at: string;
}

export interface CreatedSchoolResult {
  id: string;
  name: string;
  gps_code: string;
  division: string;
  district: string;
  upazila: string;
  cluster: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  is_active: boolean;
  created_at?: string;
}

export interface CreateSchoolPayload {
  name: string;
  gps_code: string;
  division: string;
  district: string;
  upazila: string;
  cluster: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  is_active: boolean;
}

export interface OnboardSchoolAdminPayload {
  full_name: string;
  phone: string;
  email?: string | null;
}

export interface OnboardSchoolPayload {
  school: CreateSchoolPayload;
  admin: OnboardSchoolAdminPayload;
}

export interface OnboardSchoolResponse {
  school: CreatedSchoolResult;
  admin: unknown;
}

export interface SchoolUpdateFormData {
  id: string;
  name: string;
  gps_code: string;
  division: string | null;
  district: string | null;
  upazila: string | null;
  cluster: string | null;
  address: string | null;
  phone: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UpdateSchoolPayload {
  name?: string;
  division?: string;
  district?: string;
  upazila?: string;
  cluster?: string;
  address?: string | null;
  phone?: string | null;
  is_active?: boolean;
}


