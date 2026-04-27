import { useMutation } from '@tanstack/react-query';
import {
  sportsEventsCreate,
  sportsEventsUpdate,
  sportsPersonnelCreate,
  sportsPersonnelUpdate,
} from './sports.api';
import { queryClient } from '@/tanstack/query.client';
import type { SportsPersonnelSchema } from '@/schema/sports/sports.schema';

// Sports personnel starts ----------

export const useSportsPersonnelCreate = () => {
  return useMutation({
    mutationFn: sportsPersonnelCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sports-personnel'] });
      queryClient.invalidateQueries({
        queryKey: ['sports-person-selected'],
      });
    },
  });
};

// -----------------------------

type SportsPersonnelUpdateProps = {
  id: number;
  data: SportsPersonnelSchema;
};

export const useSportsPersonnelUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: SportsPersonnelUpdateProps) =>
      sportsPersonnelUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sports-personnel'] });
      queryClient.invalidateQueries({
        queryKey: ['sports-person-selected'],
      });
    },
  });
};

// Sports personnel ends ----------

// Sports events starts ----------

export const useSportsEventsCreate = () => {
  return useMutation({
    mutationFn: sportsEventsCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sports-events'] });
      queryClient.invalidateQueries({
        queryKey: ['sports-event-selected'],
      });
    },
  });
};

// -----------------------------

type SportsEventsUpdateProps = {
  id: number;
  data: any;
};

export const useSportsEventsUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: SportsEventsUpdateProps) =>
      sportsEventsUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sports-events'] });
      queryClient.invalidateQueries({
        queryKey: ['sports-event-selected'],
      });
    },
  });
};

// Sports events ends ----------
