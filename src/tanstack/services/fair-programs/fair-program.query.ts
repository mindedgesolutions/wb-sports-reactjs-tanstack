import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getFairProgramById, getFairPrograms } from './fair-program.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const useFairPrograms = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['fair-programs', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getFairPrograms({ page, search, signal }),
  });
};

// ---------------------------------------

type FairProgramOptions = Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>;

export const useFairProgram = (id: number, options: FairProgramOptions) => {
  return useQuery({
    queryKey: ['fair-program', id],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getFairProgramById(id, signal),
    enabled: true,
    ...options,
  });
};
