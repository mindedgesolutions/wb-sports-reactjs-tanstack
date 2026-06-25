import { fileSizes, fileTypes } from '@/utils/format.validation';
import z from 'zod';

export const bannersSchema = z
  .object({
    page: z.string().nonempty('Select a page'),
    title: z.string().optional(),
    oldImg: z.string().optional(),
    newImg: z.instanceof(File).optional().or(z.undefined()),
  })
  .superRefine((data, ctx) => {
    const { newImg } = data;

    if (newImg && !fileTypes().imageTypes.includes(newImg.type)) {
      ctx.addIssue({
        code: 'custom',
        path: ['newImg'],
        message: 'Only JPEG, PNG, and GIF images are allowed',
      });
    }

    if (newImg && newImg.size > fileSizes().max10mb) {
      ctx.addIssue({
        code: 'custom',
        path: ['newImg'],
        message: 'Image size must be less than 1MB',
      });
    }
  });
export type BannersSchema = z.input<typeof bannersSchema>;
