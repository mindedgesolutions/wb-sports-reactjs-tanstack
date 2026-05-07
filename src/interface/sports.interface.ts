export interface IAdminStructureRow {
  id: number;
  designation: string;
  slug: string;
  show_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IAdminStructureList {
  data: IAdminStructureRow[];
  meta: IPagination;
}

// -----------------------------

export interface IKeyPersonnelRow {
  id: number;
  name: string;
  slug: string;
  rank: string | null;
  designation: string;
  image_path: string | null;
  department: string;
  govt: string;
  show_order: number;
  is_active: boolean;
  added_by: number;
  updated_by: number | null;
  created_at: Date;
  updated_at: Date;
}

export interface IKeyPersonnelList {
  data: IKeyPersonnelRow[];
  meta: IPagination;
}

// -----------------------------

export interface IAchievementRow {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  achievement_date: Date | null;
  show_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IAchievementList {
  data: IAchievementRow[];
  meta: IPagination;
}

// -----------------------------

export interface ISportsPersonnelRow {
  id: number;
  sport: string;
  name: string;
  slug: string;
  address: string | null;
  dob: Date | null;
  contact_1: string | null;
  contact_2: string | null;
  is_active: boolean;
  added_by: number;
  updated_by: number | null;
  created_at: Date;
  updated_at: Date;
}

export interface ISportsPersonnelList {
  data: ISportsPersonnelRow[];
  meta: IPagination;
}

// -----------------------------

export interface ISportsEventRow {
  id: number;
  title: string;
  slug: string;
  event_date: Date | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ISportsEventList {
  data: ISportsEventRow[];
  meta: IPagination;
}

// -----------------------------

export interface IWbsCouncilRow {
  id: number;
  designation_id: number;
  name: string;
  slug: string;
  designation_label: string | null;
  designation_name: string;
  type: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  fax: string | null;
  image_path: string | null;
  is_active: boolean;
  weight: number | null;
  created_at: Date;
  updated_at: Date;
}

export interface IWbsCouncilList {
  data: IWbsCouncilRow[];
  meta: IPagination;
}

// -----------------------------

export interface IAnnouncementRow {
  id: number;
  type: string;
  ann_no: string;
  subject: string;
  is_new: boolean;
  start_date: Date | null;
  end_date: Date | null;
  file_path: string | null;
  is_active: boolean;
  created_by: number;
  updated_by: number | null;
  created_at: Date;
  updated_at: Date;
}

export interface IAnnouncementList {
  data: IAnnouncementRow[];
  meta: IPagination;
}

// -----------------------------

export interface IAdvertisementRow {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  file_path: string | null;
  file_name: string | null;
  ad_date: Date | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IAdvertisementList {
  data: IAdvertisementRow[];
  meta: IPagination;
}

// -----------------------------

export interface IPlayerAchievementRow {
  id: number;
  sport: string;
  name: string;
  slug: string;
  description: string;
  achievement_date: Date | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IPlayerAchievementList {
  data: IPlayerAchievementRow[];
  meta: IPagination;
}

// -----------------------------

export interface IAwardRow {
  id: number;
  name: string;
  slug: string;
  file_path: string;
  file_name: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IAwardList {
  data: IAwardRow[];
  meta: IPagination;
}

// -----------------------------

export interface IStadiumRow {
  id: number;
  name: string;
  slug: string;
  address: string | null;
  location: string;
  cover_img: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IStadiumList {
  data: IStadiumRow[];
  meta: IPagination;
}

interface IStadiumDetailsRow {
  id: number;
  stadium_id: number;
  description: string;
  created_at: Date;
  updated_at: Date;
}

interface IStadiumHighlightsRow {
  id: number;
  stadium_id: number;
  title: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IStadiumImageRow {
  id: number;
  stadium_id: number;
  image_path: string;
  created_at: Date;
  updated_at: Date;
}

export interface IStadiumSingle {
  id: number;
  name: string;
  location: string;
  address: string | null;
  cover_img: string | null;
  stadium_details: IStadiumDetailsRow;
  stadium_highlights: IStadiumHighlightsRow[] | null;
  stadium_images: IStadiumImageRow[] | null;
}

// -----------------------------

export interface IAssociationRow {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  address: string | null;
  website: string | null;
  email: string | null;
  phone_1: string | null;
  phone_2: string | null;
  fax: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IAssociationList {
  data: IAssociationRow[];
  meta: IPagination;
}

// -----------------------------

interface IFifaPhoto {
  id: number;
  fifa_id: number;
  image_path: string;
  created_at: Date;
  updated_at: Date;
}

export interface IFifaGalleryRow {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  event_date: Date | null;
  is_active: boolean;
  first_photo?: IFifaPhoto;
  photos?: IFifaPhoto[];
  created_at: Date;
  updated_at: Date;
}

export interface IFifaGalleryList {
  data: IFifaGalleryRow[];
  meta: IPagination;
}

// -----------------------------

export interface ISportsPolicyRow {
  id: number;
  name: string;
  slug: string;
  file_path: string;
  file_name: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ISportsPolicyList {
  data: ISportsPolicyRow[];
  meta: IPagination;
}

// -----------------------------

export interface IAssocSiteRow {
  id: number;
  title: string;
  slug: string;
  url: string;
  last_updated: Date | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IAssocSiteList {
  data: IAssocSiteRow[];
  meta: IPagination;
}

// -----------------------------

export interface IPhotoRow {
  id: number;
  gallery_id: number;
  image_path: string;
  created_at: Date;
  updated_at: Date;
}

export interface IPhotoGalleryRow {
  id: number;
  category: string;
  title: string;
  slug: string;
  description: string | null;
  cover_img: string | null;
  event_date: Date | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  photos_count: number;
}

export interface IPhotoGalleryList {
  data: IPhotoGalleryRow[];
  meta: IPagination;
}

export interface IPhotoGallerySingle {
  id: number;
  category: string;
  title: string;
  slug: string;
  description: string | null;
  cover_img: string | null;
  event_date: Date | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  photos_count: number;
  photos: IPhotoRow[];
}

// -----------------------------

export interface IAudioVisualRow {
  id: number;
  title: string | null;
  video_link: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IAudioVisualList {
  data: IAudioVisualRow[];
  meta: IPagination;
}

// -----------------------------

export interface IBulletinRow {
  id: number;
  name: string;
  slug: string;
  file_path: string;
  event_date: Date | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IBulletinList {
  data: IBulletinRow[];
  meta: IPagination;
}

// -----------------------------

export interface IAmphanPhotoRow {
  id: number;
  image_path: string;
  title: string;
  created_at: Date;
  updated_at: Date;
}

export interface IAmphanPhotoList {
  data: IAmphanPhotoRow[];
  meta: IPagination;
}
