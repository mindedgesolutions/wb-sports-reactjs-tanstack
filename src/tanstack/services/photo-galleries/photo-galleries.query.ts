import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import {
  getServicesPhotoGalleries,
  getServicesPhotoGalleryById,
} from './photo-galleries.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const useServicesPhotoGalleries = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['services-photo-galleries', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getServicesPhotoGalleries({ page, search, signal }),
  });
};

// ---------------------------------------

type PhotoGalleryOptions = Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>;

export const useServicesPhotoGallery = (
  id: number,
  options: PhotoGalleryOptions,
) => {
  return useQuery({
    queryKey: ['services-photo-gallery', id],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getServicesPhotoGalleryById(id, signal),
    enabled: true,
    ...options,
  });
};
