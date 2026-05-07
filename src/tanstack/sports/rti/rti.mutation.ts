import { useMutation } from '@tanstack/react-query';
import { rtiNoticeCreate, rtiNoticeUpdate } from './rti.api';
import { queryClient } from '@/tanstack/query.client';

export const useRtiNoticeCreate = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await rtiNoticeCreate(data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rti-notices'] });
      queryClient.invalidateQueries({ queryKey: ['rti-notice-selected'] });
    },
  });
};

// -----------------------------------

export const useRtiNoticeUpdate = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await rtiNoticeUpdate(id, data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rti-notices'] });
      queryClient.invalidateQueries({ queryKey: ['rti-notice-selected'] });
    },
  });
};
