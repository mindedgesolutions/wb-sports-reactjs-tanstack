import { fileSizes, fileTypes } from '@/utils/format.validation';
import z from 'zod';

export const homepageSliderSchema = z
  .object({
    newImage: z.instanceof(File).or(z.undefined()),
    existingImage: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { newImage, existingImage } = data;

    if (!existingImage && !newImage) {
      ctx.addIssue({
        code: 'custom',
        path: ['newImage'],
        message: 'Image is required',
      });
    }

    if (newImage) {
      if (!fileTypes().imageTypes.includes(newImage.type)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Invalid file type',
        });
      }

      if (newImage.size > fileSizes().max10mb) {
        ctx.addIssue({
          code: 'custom',
          message: 'File size cannot be more than 10MB',
        });
      }
    }
  });
export type HomepageSliderSchema = z.input<typeof homepageSliderSchema>;
