import { useQuery } from '@tanstack/react-query';
import {
  getAwards,
  getAwardsWb,
  getPlayersAchievements,
  getPlayersAchievementsWb,
} from './achievements-awards.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const usePlayersAchievements = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['players-achievements', { page, search }],
    queryFn: ({ signal }) => getPlayersAchievements({ page, search, signal }),
  });
};

// ------------------------------

export const usePlayersAchievementsWb = ({
  sport,
  enabled = true,
}: {
  sport: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ['players-achievements-web', { sport }],
    queryFn: ({ signal }) => getPlayersAchievementsWb({ sport, signal }),
    enabled,
  });
};

// ------------------------------

export const useAwards = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['awards', { page, search }],
    queryFn: ({ signal }) => getAwards({ page, search, signal }),
  });
};

// ------------------------------

export const useAwardsWb = () => {
  return useQuery({
    queryKey: ['awards-web'],
    queryFn: ({ signal }) => getAwardsWb({ signal }),
  });
};
