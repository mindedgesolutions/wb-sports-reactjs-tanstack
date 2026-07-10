import { useQuery } from '@tanstack/react-query';
import { getNewsEvents } from './news-events.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const useNewsEvents = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['news-events', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getNewsEvents({ page, search, signal }),
  });
};
