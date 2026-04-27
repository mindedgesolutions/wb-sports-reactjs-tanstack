import { useMutation } from '@tanstack/react-query';
import {
  awardsCreate,
  awardsUpdate,
  playersAchievementsCreate,
  playersAchievementsUpdate,
} from './achievements-awards.api';
import { queryClient } from '@/tanstack/query.client';
import type {
  AwardsSchema,
  PlayersAchievementsSchema,
} from '@/schema/sports/achievements-awards.schema';

export const usePlayersAchievementCreate = () => {
  return useMutation({
    mutationFn: playersAchievementsCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players-achievements'] });
    },
  });
};

// ------------------------------

type PlayersAchievementsPayload = {
  data: PlayersAchievementsSchema;
  id: number;
};

export const usePlayersAchievementUpdate = () => {
  return useMutation({
    mutationFn: ({ data, id }: PlayersAchievementsPayload) =>
      playersAchievementsUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players-achievements'] });
    },
  });
};

// ------------------------------

export const useAwardCreate = () => {
  return useMutation({
    mutationFn: awardsCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['awards'] });
    },
  });
};

// ------------------------------

type AwardPayload = {
  data: AwardsSchema;
  id: number;
};

export const useAwardUpdate = () => {
  return useMutation({
    mutationFn: ({ data, id }: AwardPayload) => awardsUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['awards'] });
    },
  });
};
