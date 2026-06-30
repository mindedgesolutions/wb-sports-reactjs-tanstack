import { useMutation } from '@tanstack/react-query';
import {
  districtBlockOfficeCreate,
  districtBlockOfficeUpdate,
  orgChartCreate,
  orgChartUpdate,
} from './about-us.api';
import { queryClient } from '@/tanstack/query.client';
import type {
  DistrictBlockOfficeSchema,
  OrgChartSchema,
} from '@/schema/services/about-us.schema';

export const useOrgChartCreate = () => {
  return useMutation({
    mutationFn: orgChartCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['org-chart'] });
      queryClient.invalidateQueries({ queryKey: ['org-chart-all'] });
      queryClient.invalidateQueries({ queryKey: ['org-chart-selected'] });
    },
  });
};

// -----------------------------

type OrgChartPayload = {
  id: number;
  data: OrgChartSchema;
};

export const useOrgChartUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: OrgChartPayload) => orgChartUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['org-chart'] });
      queryClient.invalidateQueries({ queryKey: ['org-chart-all'] });
      queryClient.invalidateQueries({ queryKey: ['org-chart-selected'] });
    },
  });
};

// -----------------------------

export const useDistrictBlockOfficeCreate = () => {
  return useMutation({
    mutationFn: districtBlockOfficeCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['district-block-offices'] });
      queryClient.invalidateQueries({
        queryKey: ['district-block-office-selected'],
      });
    },
  });
};

// -----------------------------

type DistrictBlockOfficePayload = {
  id: number;
  data: DistrictBlockOfficeSchema;
};

export const useDistrictBlockOfficeUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: DistrictBlockOfficePayload) =>
      districtBlockOfficeUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['district-block-offices'] });
      queryClient.invalidateQueries({
        queryKey: ['district-block-office-selected'],
      });
    },
  });
};
