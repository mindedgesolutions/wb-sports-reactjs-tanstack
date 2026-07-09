import { useQuery } from '@tanstack/react-query';
import { getFairProgrammes } from './fair-programme.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const useFairProgrammes = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['fair-programmes', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getFairProgrammes({ page, search, signal }),
  });
};
