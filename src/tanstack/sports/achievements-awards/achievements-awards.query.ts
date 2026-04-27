import { useQuery } from '@tanstack/react-query';
import { getAwards, getPlayersAchievements } from './achievements-awards.api';

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

export const useAwards = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['awards', { page, search }],
    queryFn: ({ signal }) => getAwards({ page, search, signal }),
  });
};
