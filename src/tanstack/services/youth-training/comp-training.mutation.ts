import type { CompCourseDetailsSchema } from '@/schema/services/youth-training.schema';
import { useMutation } from '@tanstack/react-query';
import {
  compCourseDetailsCreate,
  compCourseDetailsUpdate,
} from './comp-training.api';
import { queryClient } from '@/tanstack/query.client';

export const useCompCourseDetailsCreate = () => {
  return useMutation({
    mutationFn: compCourseDetailsCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comp-course-details'] });
      queryClient.invalidateQueries({
        queryKey: ['comp-course-details-selected'],
      });
    },
  });
};

// -----------------------------

type CompCourseDetailsPayload = {
  id: number;
  data: CompCourseDetailsSchema;
};

export const useCompCourseDetailsUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: CompCourseDetailsPayload) =>
      compCourseDetailsUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comp-course-details'] });
      queryClient.invalidateQueries({
        queryKey: ['comp-course-details-selected'],
      });
    },
  });
};
