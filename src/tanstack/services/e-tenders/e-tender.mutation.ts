import { useMutation } from '@tanstack/react-query';
import { eTendersCreate, eTendersUpdate } from './e-tender.api';
import { queryClient } from '@/tanstack/query.client';

export const useEtenderCreate = () => {
  return useMutation({
    mutationFn: eTendersCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services-e-tenders'] });
      queryClient.invalidateQueries({
        queryKey: ['services-e-tender-selected'],
      });
    },
  });
};

// -----------------------------------

type EtenderPayload = {
  id: number;
  data: any;
};

export const useEtenderUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: EtenderPayload) => eTendersUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services-e-tenders'] });
      queryClient.invalidateQueries({
        queryKey: ['services-e-tender-selected'],
      });
    },
  });
};
