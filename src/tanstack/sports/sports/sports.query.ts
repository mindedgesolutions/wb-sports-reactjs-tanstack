import { useQuery } from '@tanstack/react-query';
import { getSportsEvents, getSportsPersonnel } from './sports.api';

type ParamProps = {
  page?: number;
  search?: string;
};

// Sports personnel starts ----------

export const useSportsPersonnel = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['sports-personnel', { page, search }],
    queryFn: ({ signal }) => getSportsPersonnel({ page, search, signal }),
  });
};

// Sports personnel ends ----------

// Sports events starts ----------

export const useSportsEvents = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['sports-events', { page, search }],
    queryFn: ({ signal }) => getSportsEvents({ page, search, signal }),
  });
};

// Sports events ends ----------
