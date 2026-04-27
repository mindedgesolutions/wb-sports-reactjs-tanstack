import { fileSizes, fileTypes } from '@/utils/format.validation';
import z from 'zod';

export const adminStructureSchema = z.object({
  designation: z.string().min(1, 'Designation is required'),
});
export type AdminStructureSchema = z.infer<typeof adminStructureSchema>;

// -------------------------------

export const keyPersonnelSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .max(255, 'Name must be less than 255 characters'),
    rank: z
      .string()
      .max(255, 'Rank must be less than 255 characters')
      .optional(),
    designation: z
      .string()
      .min(1, 'Designation is required')
      .max(255, 'Designation must be less than 255 characters'),
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

    if (newImg && newImg.size > fileSizes().max1mb) {
      ctx.addIssue({
        code: 'custom',
        path: ['newImg'],
        message: 'Image size must be less than 1MB',
      });
    }
  });
export type KeyPersonnelSchema = z.input<typeof keyPersonnelSchema>;

// ------------------------------

export const achievementSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(500, 'Title must be less than 500 characters'),
    description: z
      .string()
      .max(500, 'Description must be less than 500 characters')
      .optional(),
    achievementDate: z.coerce.date().optional(),
  })
  .superRefine((data, ctx) => {
    const { achievementDate } = data;

    if (achievementDate && achievementDate > new Date()) {
      ctx.addIssue({
        code: 'custom',
        path: ['achievementDate'],
        message: 'Achievement date cannot be in the future',
      });
    }
  });
export type AchievementSchema = z.input<typeof achievementSchema>;
