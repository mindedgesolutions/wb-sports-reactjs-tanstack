import { useMutation } from '@tanstack/react-query';
import {
  homepageScrollerCreate,
  homepageScrollerUpdate,
} from './homepage-scroller.api';
import { queryClient } from '@/tanstack/query.client';
import type { HomepageScrollerSchema } from '@/schema/services/homepage-scroller.schema';

export const useHomepageScrollerCreate = () => {
  return useMutation({
    mutationFn: homepageScrollerCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['services-homepage-scrollers'],
      });
      queryClient.invalidateQueries({
        queryKey: ['services-homepage-scroller-selected'],
      });
    },
  });
};

// --------------------------------

type ScrollerPayload = {
  id: number;
  data: HomepageScrollerSchema;
};

export const useHomepageScrollerUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: ScrollerPayload) =>
      homepageScrollerUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['services-homepage-scrollers'],
      });
      queryClient.invalidateQueries({
        queryKey: ['services-homepage-scroller-selected'],
      });
    },
  });
};
