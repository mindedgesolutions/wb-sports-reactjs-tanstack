import { useMutation } from '@tanstack/react-query';
import {
  vocSchemeCreate,
  vocSchemeUpdate,
  vocTrainingCentreCreate,
  vocTrainingCentreUpdate,
} from './voc-training.api';
import { queryClient } from '@/tanstack/query.client';
import type {
  VocSchemeSchema,
  VocTrainingCentreSchema,
} from '@/schema/services/youth-training.schema';

export const useVocSchemeCreate = () => {
  return useMutation({
    mutationFn: vocSchemeCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voc-schemes'] });
      queryClient.invalidateQueries({ queryKey: ['voc-schemes-all'] });
      queryClient.invalidateQueries({ queryKey: ['voc-scheme-selected'] });
    },
  });
};

// -------------------------------------

type VocSchemePaylod = {
  id: number;
  data: VocSchemeSchema;
};

export const useVocSchemeUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: VocSchemePaylod) => vocSchemeUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voc-schemes'] });
      queryClient.invalidateQueries({ queryKey: ['voc-schemes-all'] });
      queryClient.invalidateQueries({ queryKey: ['voc-scheme-selected'] });
    },
  });
};

// -------------------------------------

export const useVocTrainingCentreCreate = () => {
  return useMutation({
    mutationFn: vocTrainingCentreCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voc-training-centres'] });
      queryClient.invalidateQueries({
        queryKey: ['voc-training-centre-selected'],
      });
    },
  });
};

// -------------------------------------

type VocTrainingCentrePayload = {
  id: number;
  data: VocTrainingCentreSchema;
};

export const useVocTrainingCentreUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: VocTrainingCentrePayload) =>
      vocTrainingCentreUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voc-training-centres'] });
      queryClient.invalidateQueries({
        queryKey: ['voc-training-centre-selected'],
      });
    },
  });
};
