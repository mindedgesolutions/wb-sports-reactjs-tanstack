import { useQuery } from '@tanstack/react-query';
import { getEtenders } from './e-tender.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const useEtenders = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['services-e-tenders', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getEtenders({ page, search, signal }),
  });
};
