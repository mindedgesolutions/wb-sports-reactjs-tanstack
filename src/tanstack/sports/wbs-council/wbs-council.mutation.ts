import { useMutation } from '@tanstack/react-query';
import { wbsCouncilCreate, wbsCouncilUpdate } from './wbs-council.api';
import { queryClient } from '@/tanstack/query.client';
import type { WbsCouncilSchema } from '@/schema/sports/wbs-council.schema';

export const useWbsCouncilCreate = () => {
  return useMutation({
    mutationFn: wbsCouncilCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wbs-council'] });
    },
  });
};

// ----------------------------

export const useWbsCouncilUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: WbsCouncilSchema }) =>
      wbsCouncilUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wbs-council'] });
    },
  });
};
