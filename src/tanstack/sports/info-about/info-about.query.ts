import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { fetchStadium, getAssociations, getStadiums } from './info-about.api';

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
