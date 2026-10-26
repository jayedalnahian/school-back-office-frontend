export interface GeoDivision {
  id: string;
  name: string;
  bn_name: string;
}

export interface GeoDistrict {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
}

export interface GeoUpazila {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
}

export interface GeoUnion {
  id: string;
  upazila_id: string;
  name: string;
  bn_name: string;
}

export interface BangladeshGeoData {
  divisions: GeoDivision[];
  districts: GeoDistrict[];
  upazilas: GeoUpazila[];
  unions: GeoUnion[];
}
