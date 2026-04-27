import { fileTypes } from '@/utils/format.validation';
import z from 'zod';

export const playersAchievementsSchema = z
  .object({
    sport: z.string().min(1, 'Sport is required'),
    name: z
      .string()
      .min(1, 'Player name is required')
      .max(255, 'Player name must be less than 255 characters'),
    description: z
      .string()
      .min(1, 'Achievement is required')
      .max(500, 'Achievement must be less than 500 characters'),
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
export type PlayersAchievementsSchema = z.input<
  typeof playersAchievementsSchema
>;

// ------------------------

export const awardsSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Award name is required')
      .max(255, 'Award name must be less than 255 characters'),
    newFile: z.instanceof(File).optional().or(z.undefined()),
    oldFile: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { newFile, oldFile } = data;

    if (!oldFile && !newFile) {
      ctx.addIssue({
        code: 'custom',
        path: ['newFile'],
        message: 'Award file is required',
      });
    }

    if (newFile && !fileTypes().documentTypes.includes(newFile.type)) {
      ctx.addIssue({
        code: 'custom',
        path: ['newFile'],
        message: 'Invalid file type',
      });
    }
  });
export type AwardsSchema = z.input<typeof awardsSchema>;
