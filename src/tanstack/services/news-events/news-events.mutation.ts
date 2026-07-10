import { useMutation } from '@tanstack/react-query';
import { newsEventCreate, newsEventUpdate } from './news-events.api';
import { queryClient } from '@/tanstack/query.client';
import type { NewsEventsSchema } from '@/schema/services/news-events.schema';

export const useNewsEventsCreate = () => {
  return useMutation({
    mutationFn: newsEventCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news-events'] });
      queryClient.invalidateQueries({ queryKey: ['news-event-selected'] });
    },
  });
};

// ---------------------------------------

type NewsEventsPayload = {
  id: number;
  data: NewsEventsSchema;
};

export const useNewsEventsUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: NewsEventsPayload) => newsEventUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news-events'] });
      queryClient.invalidateQueries({ queryKey: ['news-event-selected'] });
    },
  });
};
