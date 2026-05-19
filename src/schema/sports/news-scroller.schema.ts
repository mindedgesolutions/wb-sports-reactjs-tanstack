import { fileSizes, fileTypes } from '@/utils/format.validation';
import z from 'zod';

export const newsScrollerSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(255, 'Title cannot be more than 255 characters'),
    description: z
      .string()
      .max(255, 'Description cannot be more than 255 characters')
      .nullable(),
    newsDate: z.coerce.date().optional(),
    newFile: z.instanceof(File).or(z.undefined()),
    existingFile: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { newsDate, newFile, existingFile } = data;

    if (newsDate && newsDate > new Date()) {
      ctx.addIssue({
        code: 'custom',
        path: ['newsDate'],
        message: 'News date cannot be in future',
      });
    }

    if (!existingFile && !newFile) {
      ctx.addIssue({
        code: 'custom',
        path: ['newFile'],
        message: 'News attachment is required',
      });
    }

    if (newFile) {
      if (!fileTypes().anyTypes.includes(newFile.type)) {
        ctx.addIssue({
          code: 'custom',
          path: ['newFile'],
          message: 'Invalid file selected',
        });
      }

      if (newFile.size > fileSizes().max10mb) {
        ctx.addIssue({
          code: 'custom',
          path: ['newFile'],
          message: 'File size cannot be more than 10MB',
        });
      }
    }
  });
export type NewsScrollerSchema = z.input<typeof newsScrollerSchema>;
