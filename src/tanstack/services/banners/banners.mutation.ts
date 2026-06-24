import { useMutation } from '@tanstack/react-query';
import { bannerCreate, bannerUpdate } from './banner.api';
import { queryClient } from '@/tanstack/query.client';
import type { BannersSchema } from '@/schema/services/banners.schema';

export const useBannerCreate = () => {
  return useMutation({
    mutationFn: bannerCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-banners'] });
      queryClient.removeQueries({ queryKey: ['page-banner-selected'] });
    },
  });
};

// -----------------------------

type BannerPayload = {
  id: number;
  data: BannersSchema;
};

export const useBannerUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: BannerPayload) => bannerUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-banners'] });
      queryClient.removeQueries({ queryKey: ['page-banner-selected'] });
    },
  });
};
