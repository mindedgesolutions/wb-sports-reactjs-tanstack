import { customFetch } from '@/axios/custom.fetch';
import { servicesApp } from '@/constants/api.services';
import type { BannersSchema } from '@/schema/services/banners.schema';

type ListProps = {
  page?: number;
  search?: string;
  signal: AbortSignal;
};

export const getBanners = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(servicesApp.banners.banners.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// -----------------------------

const formatBannerPayload = (data: BannersSchema) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    if (value !== '' && value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  return formData;
};

// -----------------------------

export const bannerCreate = async (data: BannersSchema) => {
  const formData = formatBannerPayload(data);

  const res = await customFetch.post(
    servicesApp.banners.banners.create,
    formData,
  );
  return res.data;
};

// -----------------------------

export const bannerUpdate = async (id: number, data: BannersSchema) => {
  const formData = formatBannerPayload(data);
  formData.append('_method', 'PUT');

  const res = await customFetch.post(
    servicesApp.banners.banners.update(id),
    formData,
  );
  return res.data;
};
