import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getYouthHostelById, getYouthHostels } from './youth-hostel.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const useYouthHostels = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['youth-hostels', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getYouthHostels({ page, search, signal }),
  });
};

// ---------------------------------

type FairProgramOptions = Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>;

export const useYouthHostel = (id: number, options: FairProgramOptions) => {
  return useQuery({
    queryKey: ['youth-hostel', id],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getYouthHostelById(id, signal),
    enabled: true,
    ...options,
  });
};
