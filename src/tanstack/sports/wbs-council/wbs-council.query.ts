import { useQuery } from '@tanstack/react-query';
import { getWbsCouncil, getWbsDesignations } from './wbs-council.api';

type ParamProps = {
  page?: number;
  search?: string;
};

// ----------------------------

export const useWbsDesignations = () => {
  return useQuery({
    queryKey: ['wbs-council-designations'],
    queryFn: ({ signal }) => getWbsDesignations(signal),
  });
};

// ----------------------------

export const useWbsCouncil = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['wbs-council', page, search],
    queryFn: ({ signal }) => getWbsCouncil({ page, search, signal }),
  });
};
