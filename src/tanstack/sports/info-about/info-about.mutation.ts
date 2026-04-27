import type {
  AssociationSchema,
  StadiumSchema,
} from '@/schema/sports/info-about.schema';
import { useMutation } from '@tanstack/react-query';
import {
  associationCreate,
  associationUpdate,
  stadiumCreate,
  stadiumUpdate,
} from './info-about.api';
import { queryClient } from '@/tanstack/query.client';

export const useStadiumCreate = () => {
  return useMutation({
    mutationFn: stadiumCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stadiums'] });
    },
  });
};

// -------------------------------

type StadiumPayload = {
  data: StadiumSchema;
  id: number;
};

export const useStadiumUpdate = () => {
  return useMutation({
    mutationFn: ({ data, id }: StadiumPayload) => stadiumUpdate(data, id),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['fetch-stadium', variables.id], data);
      queryClient.invalidateQueries({
        queryKey: ['stadiums'],
      });
    },
  });
};

// -------------------------------

export const useAssociationCreate = () => {
  return useMutation({
    mutationFn: associationCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['associations'] });
    },
  });
};

// -------------------------------

type AssociationPayload = {
  data: AssociationSchema;
  id: number;
};

export const useAssociationUpdate = () => {
  return useMutation({
    mutationFn: ({ data, id }: AssociationPayload) =>
      associationUpdate(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['associations'] });
    },
  });
};
