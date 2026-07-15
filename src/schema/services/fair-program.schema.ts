import { fileSizes, fileTypes } from '@/utils/format.validation';
import z from 'zod';

export const fairProgramSchema = z
  .object({
    type: z.string().optional(),
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
    const { coverImg, existingCoverImg } = data;

    if (!existingCoverImg && !coverImg) {
      ctx.addIssue({
        code: 'custom',
        path: ['coverImg'],
        message: 'Cover image is required',
      });
    }

    if (coverImg) {
      if (!fileTypes().imageTypes.includes(coverImg.type)) {
        ctx.addIssue({
          code: 'custom',
          path: ['coverImg'],
          message: 'Only JPEG, PNG, and GIF images are allowed',
        });
      }

      if (coverImg.size > fileSizes().max5mb) {
        ctx.addIssue({
          code: 'custom',
          path: ['coverImg'],
          message: 'Image size must be less than 5MB',
        });
      }
    }
  });
export type FairProgramSchema = z.input<typeof fairProgramSchema>;
