import { useQuery } from '@tanstack/react-query';
import { getRtiNotices } from './rti.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const useRtiNotices = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['rti-notices', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getRtiNotices({ page, search, signal }),
  });
};
