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
