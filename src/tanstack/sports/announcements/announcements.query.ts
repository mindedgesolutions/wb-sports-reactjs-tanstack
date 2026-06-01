import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getAdvertisements,
  getAdvertisementsWb,
  getAnnouncements,
  getAnnouncementsWb,
} from './announcements.api';

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

export const useAnnouncementsWb = ({
  type,
  search,
}: {
  type: string;
  search?: string;
}) => {
  return useInfiniteQuery({
    queryKey: ['announcements-web', { type, search }],
    queryFn: ({ pageParam = 1, signal }) => {
      return getAnnouncementsWb({
        type,
        search,
        signal,
        page: pageParam,
      });
    },
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1;
      }
      return undefined;
    },
  });
};

// -------------------------------

export const useAdvertisements = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['advertisements', { page, search }],
    queryFn: ({ signal }) => getAdvertisements({ page, search, signal }),
  });
};

// -------------------------------

export const useAdvertisementsWb = () => {
  return useQuery({
    queryKey: ['advertisements-web'],
    queryFn: ({ signal }) => getAdvertisementsWb({ signal }),
  });
};
