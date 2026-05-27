import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getAchievements,
  getAchievementsWb,
  getAdminStructure,
  getAdminStructureAll,
  getAdminStructureAllWb,
  getKeyPersonnel,
  getKeyPersonnelAll,
  getKeyPersonnelWb,
} from './about-us.api';

type ParamProps = {
  page?: number;
  search?: string;
};

// Admin structure starts ----------

export const useAdminStructure = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['admin-structure', { page, search }],
    queryFn: ({ signal }) => getAdminStructure({ page, search, signal }),
  });
};

// -----------------------------

export const useAdminStructureAll = () => {
  return useQuery({
    queryKey: ['admin-structure-all'],
    queryFn: ({ signal }) => getAdminStructureAll({ signal }),
  });
};

// -----------------------------

export const useAdminStructureAllWb = () => {
  return useQuery({
    queryKey: ['admin-structure-all-web'],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getAdminStructureAllWb(signal),
  });
};

// Admin structure ends ----------

// Key Personnel starts ----------

export const useKeyPersonnel = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['key-personnel', { page, search }],
    queryFn: ({ signal }) => getKeyPersonnel({ page, search, signal }),
  });
};

export const useKeyPersonnelWb = () => {
  return useQuery({
    queryKey: ['key-personnel-web'],
    queryFn: ({ signal }) => getKeyPersonnelWb(signal),
  });
};

// -----------------------------

export const useKeyPersonnelAll = () => {
  return useQuery({
    queryKey: ['key-personnel-all'],
    queryFn: ({ signal }) => getKeyPersonnelAll({ signal }),
  });
};

// Key Personnel ends ----------

// Achievements starts ----------

export const useAchievements = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['achievements', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getAchievements({ page, search, signal }),
  });
};

// -----------------------------

export const useAchievementsWb = () => {
  return useInfiniteQuery({
    queryKey: ['achievements-web'],
    queryFn: ({ pageParam = 1, signal }) =>
      getAchievementsWb({
        signal,
        page: pageParam,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1;
      }

      return undefined;
    },
  });
};

// Achievements ends ----------
