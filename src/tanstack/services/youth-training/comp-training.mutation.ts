import type {
  CompCourseDetailsSchema,
  CompTrainingCentreSchema,
  CourseSyllabusSchema,
} from '@/schema/services/youth-training.schema';
import { useMutation } from '@tanstack/react-query';
import {
  compCourseDetailsCreate,
  compCourseDetailsUpdate,
  compSyllabusCreate,
  compSyllabusUpdate,
  compTrainingCentreCreate,
  compTrainingCentreUpdate,
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

// -----------------------------

export const useCompSyllabusCreate = () => {
  return useMutation({
    mutationFn: compSyllabusCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comp-syllabus'] });
      queryClient.invalidateQueries({ queryKey: ['comp-syllabus-selected'] });
    },
  });
};

// -----------------------------

type CompSyllabusPayload = {
  id: number;
  data: CourseSyllabusSchema;
};

export const useCompSyllabusUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: CompSyllabusPayload) =>
      compSyllabusUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comp-syllabus'] });
      queryClient.invalidateQueries({ queryKey: ['comp-syllabus-selected'] });
    },
  });
};

// -----------------------------

export const useCompTrainingCentreCreate = () => {
  return useMutation({
    mutationFn: compTrainingCentreCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comp-training-centres'] });
      queryClient.invalidateQueries({
        queryKey: ['comp-training-centre-selected'],
      });
    },
  });
};

// -----------------------------

type CompTrainingCentrePayload = {
  id: number;
  data: CompTrainingCentreSchema;
};

export const useCompTrainingCentreUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: CompTrainingCentrePayload) =>
      compTrainingCentreUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comp-training-centres'] });
      queryClient.invalidateQueries({
        queryKey: ['comp-training-centre-selected'],
      });
    },
  });
};
