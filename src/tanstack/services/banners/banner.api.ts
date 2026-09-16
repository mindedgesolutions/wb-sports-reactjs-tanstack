import { customFetch } from '@/axios/custom.fetch';
import { simpleFetch } from '@/axios/refresh.fetch';
import { servicesApp } from '@/constants/api.services';
import { servicesWeb } from '@/constants/api.services.website';
import type { BannersSchema } from '@/schema/services/banners.schema';
import { optimizeImage } from '@/utils/image.utils';

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

const formatBannerPayload = async (data: BannersSchema): Promise<FormData> => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (value instanceof File) {
      const optimizedFile = await optimizeImage(value);
      formData.append(key, optimizedFile);
      continue;
    }

    if (value !== '' && value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  }

  return formData;
};

// -----------------------------

export const bannerCreate = async (data: BannersSchema) => {
  const formData = await formatBannerPayload(data);

  const res = await customFetch.post(
    servicesApp.banners.banners.create,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data;
};

// -----------------------------

export const bannerUpdate = async (id: number, data: BannersSchema) => {
  const formData = await formatBannerPayload(data);
  formData.append('_method', 'PUT');

  const res = await customFetch.post(
    servicesApp.banners.banners.update(id),
    formData,
  );
  return res.data;
};

// -----------------------------

export const getPageBanner = async (url: string, signal: AbortSignal) => {
  const res = await simpleFetch.get(servicesWeb.common.banners, {
    params: { url },
    signal,
  });
  return res.data;
};
