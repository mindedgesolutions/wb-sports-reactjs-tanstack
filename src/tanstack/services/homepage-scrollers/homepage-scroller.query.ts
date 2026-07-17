import { useQuery } from '@tanstack/react-query';
import { getHomepageScrollers } from './homepage-scroller.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const useHomepageScrollers = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['services-homepage-scrollers', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getHomepageScrollers({ page, search, signal }),
  });
};
