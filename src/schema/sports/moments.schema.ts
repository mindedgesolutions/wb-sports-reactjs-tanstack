import { fileTypes } from '@/utils/format.validation';
import z from 'zod';

export const photoGallerySchema = z
  .object({
    title: z
      .string()
      .min(1, 'Gallery title is required')
      .max(255, 'Gallery title must be less than 255 characters'),
    description: z.string().optional(),
    eventDate: z.coerce.date().optional(),
    coverImg: z.instanceof(File).optional().or(z.undefined()),
    existingCoverImg: z.string().optional(),
    galleryImg: z.array(z.instanceof(File)).optional(),
    existingGalleryImg: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    const { coverImg } = data;

    if (coverImg) {
      if (!fileTypes().imageTypes.includes(coverImg.type)) {
        ctx.addIssue({
          code: 'custom',
          path: ['coverImg'],
          message: 'Invalid file type',
        });
      }

      if (!fileTypes().imageTypes.includes(coverImg.type)) {
        ctx.addIssue({
          code: 'custom',
          path: ['coverImg'],
          message: 'Invalid file type',
        });
      }
    }
  });
export type PhotoGallerySchema = z.input<typeof photoGallerySchema>;
