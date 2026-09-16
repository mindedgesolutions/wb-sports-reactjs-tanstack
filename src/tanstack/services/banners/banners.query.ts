import { useQuery } from '@tanstack/react-query';
import { getBanners, getPageBanner } from './banner.api';

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

// ------------------------

export const usePageBanner = ({ url }: { url: string }) => {
  return useQuery({
    queryKey: ['individual-page-banner', { url }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getPageBanner(url, signal),
  });
};
