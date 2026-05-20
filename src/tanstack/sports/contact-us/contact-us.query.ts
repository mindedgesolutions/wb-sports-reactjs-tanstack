import { useQuery } from '@tanstack/react-query';
import { getContactUs } from './contact-us.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const useContactUs = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['contact-us', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getContactUs({ page, search, signal }),
  });
};
