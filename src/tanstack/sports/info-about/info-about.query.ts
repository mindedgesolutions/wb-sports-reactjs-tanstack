import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import {
  fetchFifaGallery,
  fetchStadium,
  getAssociations,
  getFifaGallery,
  getStadiums,
} from './info-about.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const useStadiums = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['stadiums', { page, search }],
    queryFn: ({ signal }) => getStadiums({ page, search, signal }),
  });
};

// -------------------------------

type StadiumQueryOptions = Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>;

export const useFetchStadium = (id: number, options: StadiumQueryOptions) => {
  return useQuery({
    queryKey: ['fetch-stadium', id],
    queryFn: ({ signal }: { signal: AbortSignal }) => fetchStadium(id, signal),
    enabled: true,
    ...options,
  });
};

// -------------------------------

export const useAssociations = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['associations', { page, search }],
    queryFn: ({ signal }) => getAssociations({ page, search, signal }),
  });
};

// -------------------------------

export const useFifaGalleries = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['fifa-galleries', { page, search }],
    queryFn: ({ signal }) => getFifaGallery({ page, search, signal }),
  });
};

// -------------------------------

type FifaGalleryQueryOptions = Omit<
  UseQueryOptions<any>,
  'queryKey' | 'queryFn'
>;

export const useFetchFifaGallery = (
  id: number,
  options: FifaGalleryQueryOptions,
) => {
  return useQuery({
    queryKey: ['fetch-fifa-gallery', id],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      fetchFifaGallery(id, signal),
    enabled: true,
    ...options,
  });
};
