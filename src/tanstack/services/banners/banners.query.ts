import { useQuery } from '@tanstack/react-query';
import { getBanners } from './banner.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const useBanners = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['page-banners', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getBanners({ page, search, signal }),
  });
};
