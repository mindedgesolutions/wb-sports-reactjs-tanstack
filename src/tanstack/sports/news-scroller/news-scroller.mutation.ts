import type { NewsScrollerSchema } from '@/schema/sports/news-scroller.schema';
import { useMutation } from '@tanstack/react-query';
import { newsScrollerCreate, newsScrollerUpdate } from './news-scroller.api';
import { queryClient } from '@/tanstack/query.client';

export const useNewsScrollerCreate = () => {
  return useMutation({
    mutationFn: async (data: NewsScrollerSchema) => {
      const res = await newsScrollerCreate(data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news-scroller'] });
    },
  });
};

// -------------------------------

type NewsScrollerPayload = {
  data: NewsScrollerSchema;
  id: number;
};

export const useNewsScrollerUpdate = () => {
  return useMutation({
    mutationFn: async ({ id, data }: NewsScrollerPayload) => {
      const res = await newsScrollerUpdate(id, data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news-scroller'] });
    },
  });
};
