import { customFetch } from '@/axios/custom.fetch';
import { simpleFetch } from '@/axios/refresh.fetch';
import { sportsApp } from '@/constants/api.sports';
import { sportsWeb } from '@/constants/api.sports.website';
import type { HomepageSliderSchema } from '@/schema/sports/homepage-slider.schema';
import { optimizeImage } from '@/utils/image.utils';

type ListProps = {
  page?: number;
  signal: AbortSignal;
};

export const getHomepageSliders = async ({ page, signal }: ListProps) => {
  const res = await customFetch.get(
    sportsApp.homepageSliders.homepageSliders.list,
    { params: { page }, signal },
  );
  return res.data;
};

// ----------------------------------

export const homepageSliderCreate = async (data: HomepageSliderSchema) => {
  const payload = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (value instanceof File) {
      const optimizedFile = await optimizeImage(value);

      payload.append(key, optimizedFile);
    } else if (value !== undefined && value !== null) {
      payload.append(key, String(value));
    }
  }

  const res = await customFetch.post(
    sportsApp.homepageSliders.homepageSliders.create,
    data,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data;
};

// ----------------------------------

export const getHomepageSlidersWb = async (signal: AbortSignal) => {
  const res = await simpleFetch.get(sportsWeb.homepage.homepageSliders, {
    signal,
  });
  return res.data.data;
};
