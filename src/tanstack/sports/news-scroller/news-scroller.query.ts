import { useQuery } from '@tanstack/react-query';
import { getNewsScroller, getNewsScrollerWb } from './news-scroller.api';

export const useNewsScroller = ({
  search,
  page,
}: {
  search?: string;
  page?: number;
}) => {
  return useQuery({
    queryKey: ['news-scroller', { search, page }],
    queryFn: async ({ signal }: { signal: AbortSignal }) => {
      const res = await getNewsScroller({ search, page, signal });
      return res;
    },
  });
};

// ------------------------------

export const useNewsScrollerWb = () => {
  return useQuery({
    queryKey: ['news-scroller-web'],
    queryFn: getNewsScrollerWb,
  });
};
