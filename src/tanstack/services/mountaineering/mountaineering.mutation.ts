import { useMutation } from '@tanstack/react-query';
import {
  mountainGeneralBodyCreate,
  mountainGeneralBodyUpdate,
} from './mountaineering.api';
import { queryClient } from '@/tanstack/query.client';
import type { MountainGeneralBodySchema } from '@/schema/services/mountaineering.schema';

export const useMountainGeneralBodyCreate = () => {
  return useMutation({
    mutationFn: mountainGeneralBodyCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mountain-general-bodies'] });
      queryClient.invalidateQueries({
        queryKey: ['mountain-general-bodies-all'],
      });
      queryClient.invalidateQueries({
        queryKey: ['mountain-general-body-selected'],
      });
    },
  });
};

// -----------------------------

type MountainGBPayload = {
  id: number;
  data: MountainGeneralBodySchema;
};

export const useMountainGeneralBodyUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: MountainGBPayload) =>
      mountainGeneralBodyUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mountain-general-bodies'] });
      queryClient.invalidateQueries({
        queryKey: ['mountain-general-bodies-all'],
      });
      queryClient.invalidateQueries({
        queryKey: ['mountain-general-body-selected'],
      });
    },
  });
};
