import { useMutation } from '@tanstack/react-query';
import {
  achievementsCreate,
  achievementsUpdate,
  adminStructureCreate,
  adminStructureUpdate,
  keyPersonnelCreate,
  keyPersonnelUpdate,
} from './about-us.api';
import { queryClient } from '@/tanstack/query.client';
import type {
  AchievementSchema,
  AdminStructureSchema,
  KeyPersonnelSchema,
} from '@/schema/sports/about-us.schema';

// Admin structure starts ----------

export const useAdminStructureCreate = () => {
  return useMutation({
    mutationFn: adminStructureCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-structure'] });
      queryClient.invalidateQueries({ queryKey: ['admin-structure-all'] });
      queryClient.removeQueries({ queryKey: ['admin-structure-selected'] });
    },
  });
};

// -----------------------------

type AdminStructurePayload = {
  id: number;
  data: AdminStructureSchema;
};

export const useAdminStructureUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: AdminStructurePayload) =>
      adminStructureUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-structure'] });
      queryClient.invalidateQueries({ queryKey: ['admin-structure-all'] });
      queryClient.removeQueries({ queryKey: ['admin-structure-selected'] });
    },
  });
};

// Admin structure ends ----------

// Key Personnel starts ----------

export const useKeyPersonnelCreate = () => {
  return useMutation({
    mutationFn: keyPersonnelCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['key-personnel'] });
      queryClient.invalidateQueries({ queryKey: ['key-personnel-all'] });
      queryClient.removeQueries({ queryKey: ['key-personnel-selected'] });
    },
  });
};

// -----------------------------

type KeyPersonnelPayload = {
  id: number;
  data: KeyPersonnelSchema;
};

export const useKeyPersonnelUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: KeyPersonnelPayload) =>
      keyPersonnelUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['key-personnel'] });
      queryClient.invalidateQueries({ queryKey: ['key-personnel-all'] });
      queryClient.removeQueries({ queryKey: ['key-personnel-selected'] });
    },
  });
};

// Key Personnel ends ----------

// Achievements starts ----------

export const useAchievementsCreate = () => {
  return useMutation({
    mutationFn: achievementsCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['achievements'] });
      queryClient.removeQueries({ queryKey: ['achievement-selected'] });
    },
  });
};

// -----------------------------

type AchievementPayload = {
  id: number;
  data: AchievementSchema;
};

export const useAchievementsUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: AchievementPayload) =>
      achievementsUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['achievements'] });
      queryClient.removeQueries({ queryKey: ['achievement-selected'] });
    },
  });
};
