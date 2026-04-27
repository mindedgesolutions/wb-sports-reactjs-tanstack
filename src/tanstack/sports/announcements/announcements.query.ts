import { useQuery } from '@tanstack/react-query';
import { getAdvertisements, getAnnouncements } from './announcements.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const useAnnouncements = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['announcements', { page, search }],
    queryFn: ({ signal }) => getAnnouncements({ page, search, signal }),
  });
};

// -------------------------------

export const useAdvertisements = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['advertisements', { page, search }],
    queryFn: ({ signal }) => getAdvertisements({ page, search, signal }),
  });
};
