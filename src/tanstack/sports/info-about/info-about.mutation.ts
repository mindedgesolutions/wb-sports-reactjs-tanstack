import type {
  AssociationSchema,
  AssocSiteSchema,
  FifaGallerySchema,
  SportsPolicySchema,
  StadiumSchema,
} from '@/schema/sports/info-about.schema';
import { useMutation } from '@tanstack/react-query';
import {
  associationCreate,
  associationUpdate,
  assocSiteCreate,
  assocSiteUpdate,
  fifaGalleryCreate,
  fifaGalleryUpdate,
  sportsPolicyCreate,
  sportsPolicyUpdate,
  stadiumCreate,
  stadiumUpdate,
  uploadGalleryImages,
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

// -------------------------------

export const useFifaGalleryCreate = (
  onProgress?: (progress: number) => void,
) => {
  return useMutation({
    mutationFn: async (data: FifaGallerySchema) => {
      const files = data.newGalleryImg ?? [];

      const payload = { ...data, newGalleryImg: undefined };

      const res = await fifaGalleryCreate(payload);
      const galleryId = res.data.id;

      if (files.length > 0) {
        await uploadGalleryImages(galleryId, files, onProgress);
      }
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fifa-galleries'] });
      queryClient.invalidateQueries({ queryKey: ['fetch-fifa-gallery'] });
    },
  });
};

// -------------------------------

type FifaGalleryPayload = {
  data: FifaGallerySchema;
  id: number;
};

export const useFifaGalleryUpdate = (
  onProgress?: (progress: number) => void,
) => {
  return useMutation({
    mutationFn: async ({ id, data }: FifaGalleryPayload) => {
      const files = data.newGalleryImg ?? [];

      const payload = { ...data, newGalleryImg: undefined };

      const res = await fifaGalleryUpdate(id, payload);
      if (files.length > 0) {
        await uploadGalleryImages(id, files, onProgress);
      }
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fifa-galleries'] });
      queryClient.invalidateQueries({ queryKey: ['fetch-fifa-gallery'] });
    },
  });
};

// -------------------------------

export const useSportsPolicyCreate = () => {
  return useMutation({
    mutationFn: sportsPolicyCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sports-policies'] });
      queryClient.invalidateQueries({ queryKey: ['sports-policy-selected'] });
    },
  });
};

// -------------------------------

type SportsPolicyPayload = {
  data: SportsPolicySchema;
  id: number;
};

export const useSportsPolicyUpdate = () => {
  return useMutation({
    mutationFn: ({ data, id }: SportsPolicyPayload) =>
      sportsPolicyUpdate(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sports-policies'] });
      queryClient.invalidateQueries({ queryKey: ['sports-policy-selected'] });
    },
  });
};

// -------------------------------

export const useAssocSiteCreate = () => {
  return useMutation({
    mutationFn: assocSiteCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assoc-sites'] });
      queryClient.invalidateQueries({ queryKey: ['assoc-site-selected'] });
    },
  });
};

// -------------------------------

type AssocSitePayload = {
  data: AssocSiteSchema;
  id: number;
};

export const useAssocSiteUpdate = () => {
  return useMutation({
    mutationFn: ({ data, id }: AssocSitePayload) => assocSiteUpdate(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assoc-sites'] });
      queryClient.invalidateQueries({ queryKey: ['assoc-site-selected'] });
    },
  });
};
