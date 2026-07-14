import { customFetch } from '@/axios/custom.fetch';
import { servicesApp } from '@/constants/api.services';

type ListProps = {
  page?: number;
  search?: string;
  signal: AbortSignal;
};

export const getServicesPhotoGalleries = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(
    servicesApp.photoGalleries.photoGalleries.list,
    { params: { page, search }, signal },
  );
  console.log(res);
  return res.data;
};

// ---------------------------------------

export const getServicesPhotoGalleryById = async (
  id: number,
  signal: AbortSignal,
) => {
  const res = await customFetch.get(
    servicesApp.photoGalleries.photoGalleries.show(id),
    { signal },
  );
  return res.data;
};
