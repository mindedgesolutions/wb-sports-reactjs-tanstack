import { useQuery } from '@tanstack/react-query';
import {
  getAchievements,
  getAdminStructure,
  getAdminStructureAll,
  getKeyPersonnel,
  getKeyPersonnelAll,
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

// Admin structure ends ----------

// Key Personnel starts ----------

export const useKeyPersonnel = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['key-personnel', { page, search }],
    queryFn: ({ signal }) => getKeyPersonnel({ page, search, signal }),
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
    queryFn: ({ signal }) => getAchievements({ page, search, signal }),
  });
};

// Achievements ends ----------
