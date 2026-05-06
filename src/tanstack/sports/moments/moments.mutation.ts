import { useMutation } from '@tanstack/react-query';
import {
  audioVisualCreate,
  audioVisualUpdate,
  bulletinCreate,
  bulletinUpdate,
  photoGalleryCreate,
  photoGalleryUpdate,
  uploadGalleryImages,
} from './moments.api';
import { queryClient } from '@/tanstack/query.client';
import type {
  AudioVisualSchema,
  BulletinsSchema,
  PhotoGallerySchema,
} from '@/schema/sports/moments.schema';

export const usePhotoGalleryCreate = (
  onProgress?: (progress: number) => void,
) => {
  return useMutation({
    mutationFn: async (data: PhotoGallerySchema) => {
      const files = data.galleryImg ?? [];

      const payload = { ...data, galleryImg: undefined };

      const res = await photoGalleryCreate(payload);
      const galleryId = res.data.id;

      if (files.length > 0) {
        await uploadGalleryImages(galleryId, files, onProgress);
      }
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photo-galleries'] });
      queryClient.invalidateQueries({ queryKey: ['photo-gallery'] });
    },
  });
};

// -------------------------------

type PhotoGalleryPayload = {
  id: number;
  data: PhotoGallerySchema;
};

export const usePhotoGalleryUpdate = (
  onProgress?: (progress: number) => void,
) => {
  return useMutation({
    mutationFn: async ({ id, data }: PhotoGalleryPayload) => {
      const files = data.galleryImg ?? [];

      const payload = { ...data, galleryImg: undefined };

      const res = await photoGalleryUpdate(id, payload);
      if (files.length > 0) {
        await uploadGalleryImages(id, files, onProgress);
      }
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photo-galleries'] });
      queryClient.invalidateQueries({ queryKey: ['photo-gallery'] });
    },
  });
};

// -------------------------------

export const useAudioVisualCreate = () => {
  return useMutation({
    mutationFn: async (data: AudioVisualSchema) => {
      const res = await audioVisualCreate(data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audio-visuals'] });
    },
  });
};

// -------------------------------

export const useAudioVisualUpdate = () => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: AudioVisualSchema;
    }) => {
      const res = await audioVisualUpdate(id, data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audio-visuals'] });
    },
  });
};

// -------------------------------

export const useBulletinCreate = () => {
  return useMutation({
    mutationFn: async (data: BulletinsSchema) => {
      const res = await bulletinCreate(data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bulletins'] });
      queryClient.invalidateQueries({ queryKey: ['bulletin-selected'] });
    },
  });
};

// -------------------------------

export const useBulletinUpdate = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: BulletinsSchema }) => {
      const res = await bulletinUpdate(id, data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bulletins'] });
      queryClient.invalidateQueries({ queryKey: ['bulletin-selected'] });
    },
  });
};
