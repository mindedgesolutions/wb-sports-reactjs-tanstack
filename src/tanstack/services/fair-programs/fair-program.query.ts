import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getFairProgramById, getFairPrograms } from './fair-program.api';

type ParamProps = {
  type: string;
  page?: number;
  search?: string;
};

export const useFairPrograms = ({ page, search, type }: ParamProps) => {
  return useQuery({
    queryKey: ['fair-programs', { page, search, type }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getFairPrograms({ page, search, type, signal }),
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
