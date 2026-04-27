interface IMenu {
  title: string;
  url?: string;
  icon: React.ElementType;
  isActive?: boolean;
  items?: ISubmenu[];
}

interface ISubmenu {
  title: string;
  url: string;
  isActive?: boolean;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  organisation: string;
  created_at: Date;
  updated_at: Date | null;
  user_details: IUserDetails;
}

interface IUserDetails {
  id: number;
  user_id: number;
  slug: string;
  mobile: string;
  profile_img: string | null;
  created_at: Date;
  updated_at: Date | null;
}

interface IPagination {
  total: number;
  current_page: number;
  last_page: number;
}

interface IListProps<T> {
  data: T;
  isLoading: boolean;
  page: number;
  onPageChange: (page: number) => void;
}
