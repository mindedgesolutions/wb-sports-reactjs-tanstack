import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getRtiNotices, getRtiNoticesWb } from './rti.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const useRtiNotices = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['rti-notices', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getRtiNotices({ page, search, signal }),
  });
};

// -----------------------------------

export const useRtiNoticesWb = ({ search }: { search?: string }) => {
  return useInfiniteQuery({
    queryKey: ['rti-notices-web', { search }],
    queryFn: ({ pageParam = 1, signal }) =>
      getRtiNoticesWb({ page: pageParam, search, signal }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1;
      }
      return undefined;
    },
  });
};
