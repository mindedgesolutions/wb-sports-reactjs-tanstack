import type { FairProgramSchema } from '@/schema/services/fair-program.schema';
import { useMutation } from '@tanstack/react-query';
import {
  fairProgrammeCreate,
  fairProgrammeUpdate,
  uploadGalleryImages,
} from './fair-program.api';
import { queryClient } from '@/tanstack/query.client';

export const useFairProgramCreate = (
  onProgress?: (progress: number) => void,
) => {
  return useMutation({
    mutationFn: async (data: FairProgramSchema) => {
      const files = data.galleryImg ?? [];

      const payload = { ...data, galleryImg: undefined };

      const res = await fairProgrammeCreate(payload);
      const galleryId = res.data.id;

      if (files.length > 0) {
        await uploadGalleryImages(galleryId, files, onProgress);
      }
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fair-programs'] });
      queryClient.invalidateQueries({ queryKey: ['fair-program'] });
    },
  });
};

// -------------------------------

type FairProgramPayload = {
  id: number;
  data: FairProgramSchema;
};

export const useFairProgramUpdate = (
  onProgress?: (progress: number) => void,
) => {
  return useMutation({
    mutationFn: async ({ id, data }: FairProgramPayload) => {
      const files = data.galleryImg ?? [];

      const payload = { ...data, galleryImg: undefined };

      const res = await fairProgrammeUpdate(id, payload);
      if (files.length > 0) {
        await uploadGalleryImages(id, files, onProgress);
      }
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fair-programs'] });
      queryClient.invalidateQueries({ queryKey: ['fair-program'] });
    },
  });
};
