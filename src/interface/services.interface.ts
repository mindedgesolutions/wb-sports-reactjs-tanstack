export interface IBannerRow {
  id: number;
  orgsanization: string;
  page_title: string;
  page_url: string;
  image_path: string;
  is_active: boolean;
  added_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
}

export interface IBannerList {
  data: IBannerRow[];
  meta: IPagination;
}

// -----------------------------

export interface IOrgChart {
  id: number;
  name: string;
  slug: string;
  designation: string | null;
  image_path: string | null;
  message: string | null;
  rank: string | null;
  department: string | null;
  show_order: number;
  is_active: boolean;
  added_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
}

export interface IOrgChartList {
  data: IOrgChart[];
  meta: IPagination;
}

// -----------------------------

export interface IDistrictBlockOffice {
  id: number;
  district_id: number;
  district_name: string;
  name: string;
  slug: string;
  address: string | null;
  landline_no: string | null;
  mobile_1: string | null;
  mobile_2: string | null;
  email: string | null;
  officer_name: string | null;
  officer_designation: string | null;
  officer_mobile: string | null;
  is_active: boolean;
  organisation: string | null;
  added_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
}

export interface IDistrictBlockOfficeList {
  data: IDistrictBlockOffice[];
  meta: IPagination;
}

// -----------------------------

export interface ICompCourseDetails {
  id: number;
  course_type: string;
  course_name: string;
  course_slug: string | null;
  course_duration: string | null;
  course_eligibility: string | null;
  course_fees: number;
  organisation: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ICompCourseDetailsList {
  data: ICompCourseDetails[];
  meta: IPagination;
}

// -----------------------------

export interface ICourseSyllabus {
  id: number;
  name: string;
  slug: string;
  file_path: string;
  file_name: string;
  organisation: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ICourseSyllabusList {
  data: ICourseSyllabus[];
  meta: IPagination;
}

// -----------------------------

export interface ICompTrainingCentre {
  id: number;
  district_id: number;
  district: IDistrict;
  yctc_name: string;
  slug: string;
  yctc_code: string;
  center_category: string;
  address_line_1: string | null;
  address_line_2: string | null;
  address_line_3: string | null;
  city: string | null;
  pincode: string | null;
  center_incharge_name: string | null;
  center_incharge_mobile: string | null;
  center_incharge_email: string | null;
  center_owner_name: string | null;
  center_owner_mobile: string | null;
  is_active: boolean;
  added_by: number;
  created_at: Date;
  updated_at: Date;
}

export interface ICompTrainingCentreList {
  data: ICompTrainingCentre[];
  meta: IPagination;
}
