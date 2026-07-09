import {
  useInfiniteQuery,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';
import {
  getAmphanPhotos,
  getAudioVisuals,
  getBulletins,
  getPhotoGalleries,
  getMomentsPhotoGalleries,
  getPhotoGallery,
  getPhotoGalleryWb,
  getMomentsPhotoGallery,
  getAudioVisualsWb,
  getBulletinsWb,
  getAmphanPhotosWb,
} from './moments.api';

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

export const useMomentsPhotoGalleries = () => {
  return useInfiniteQuery({
    queryKey: ['moments-photo-galleries-web'],
    queryFn: ({ pageParam = 1, signal }) =>
      getMomentsPhotoGalleries({
        page: pageParam,
        signal,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1;
      }

      return undefined;
    },
  });
};

// -------------------------------

export const useMomentsPhotoGallery = (slug: string) => {
  return useQuery({
    queryKey: ['moments-photo-gallery-web', slug],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getMomentsPhotoGallery(slug, signal),
  });
};

// -------------------------------

export const useGetPhotoGalleryWb = (count: number) => {
  return useQuery({
    queryKey: ['photo-gallery-web', count],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getPhotoGalleryWb(count, signal),
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

// -------------------------------

export const useAudioVisuals = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['audio-visuals', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getAudioVisuals({ page, search, signal }),
  });
};

// -------------------------------

export const useAudioVisualsWb = () => {
  return useQuery({
    queryKey: ['audio-visuals-web'],
    queryFn: ({ signal }: { signal: AbortSignal }) => getAudioVisualsWb(signal),
  });
};

// -------------------------------

export const useBulletins = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['bulletins', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getBulletins({ page, search, signal }),
  });
};

// -------------------------------

export const useBulletinsWb = () => {
  return useInfiniteQuery({
    queryKey: ['bulletins-web'],
    queryFn: ({ pageParam = 1, signal }) =>
      getBulletinsWb({ page: pageParam, signal }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1;
      }
      return undefined;
    },
  });
};

// -------------------------------

export const useAmphanPhotos = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['amphan-photos', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getAmphanPhotos({ page, search, signal }),
  });
};

// -------------------------------

export const useAmphanPhotosWb = () => {
  return useInfiniteQuery({
    queryKey: ['amphan-photos-web'],
    queryFn: ({ pageParam = 1, signal }) =>
      getAmphanPhotosWb({ page: pageParam, signal }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1;
      }
      return undefined;
    },
  });
};
