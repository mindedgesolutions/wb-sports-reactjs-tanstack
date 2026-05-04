import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getPhotoGalleries, getPhotoGallery } from './moments.api';

type ParamProps = {
  search?: string;
  page?: number;
};

export const usePhotoGalleries = ({ search, page }: ParamProps) => {
  return useQuery({
    queryKey: ['photo-galleries', { search, page }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getPhotoGalleries({ search, page, signal }),
  });
};

// -------------------------------

type GalleryQueryOptions = Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>;

export const usePhotoGallery = (id: number, options: GalleryQueryOptions) => {
  return useQuery({
    queryKey: ['photo-gallery', id],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getPhotoGallery(id, signal),
    enabled: true,
    ...options,
  });
};
