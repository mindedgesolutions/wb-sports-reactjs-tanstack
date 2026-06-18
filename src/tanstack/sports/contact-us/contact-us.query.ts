import { useQuery } from '@tanstack/react-query';
import {
  getContactUs,
  getContactUsAll,
  getContactUsAllWb,
} from './contact-us.api';

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

// ----------------------------------

export const useContactUsAll = () => {
  return useQuery({
    queryKey: ['contact-us-all'],
    queryFn: ({ signal }: { signal: AbortSignal }) => getContactUsAll(signal),
  });
};

// ----------------------------------

export const useContactUsAllWb = () => {
  return useQuery({
    queryKey: ['contact-us-all-web'],
    queryFn: ({ signal }: { signal: AbortSignal }) => getContactUsAllWb(signal),
  });
};
