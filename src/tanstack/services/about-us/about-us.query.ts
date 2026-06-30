import { useQuery } from '@tanstack/react-query';
import {
  getDistrictBlockOffices,
  getOrganisationChart,
  getOrganisationChartAll,
} from './about-us.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const useOrganisationChart = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['org-chart', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getOrganisationChart({ page, search, signal }),
  });
};

// -----------------------------

export const useOrganisationChartAll = () => {
  return useQuery({
    queryKey: ['org-chart-all'],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getOrganisationChartAll({ signal }),
  });
};

// -----------------------------

export const useDistrictBlockOffices = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['district-block-offices', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getDistrictBlockOffices({ page, search, signal }),
  });
};
