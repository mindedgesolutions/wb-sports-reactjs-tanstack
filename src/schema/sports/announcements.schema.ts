import { fileTypes } from '@/utils/format.validation';
import z from 'zod';

export const announcementSchema = z
  .object({
    type: z.string().min(1, 'Announcement type is required'),
    annNo: z.string().min(1, 'Announcement no. is required'),
    subject: z.string().min(1, 'Subject is required'),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    newFile: z.instanceof(File).optional().or(z.undefined()),
    oldFile: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { startDate, endDate, newFile, oldFile } = data;

    if (startDate && endDate && startDate > endDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['endDate'],
        message: 'End date must be after start date',
      });
    }

    if (!newFile && !oldFile) {
      ctx.addIssue({
        code: 'custom',
        path: ['newFile'],
        message: 'File is required',
      });
    }

    if (newFile) {
      if (
        !fileTypes().documentTypes.includes(newFile.type) &&
        !fileTypes().imageTypes.includes(newFile.type)
      ) {
        ctx.addIssue({
          code: 'custom',
          path: ['newFile'],
          message: 'Invalid file type',
        });
      }
    }
  });
export type AnnouncementSchema = z.input<typeof announcementSchema>;

// -----------------------------------

export const advertisementSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    description: z
      .string()
      .max(500, 'Description must be less than 500 characters')
      .optional(),
    adDate: z.coerce.date().optional(),
    newFile: z.instanceof(File).optional().or(z.undefined()),
    oldFile: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { newFile, oldFile } = data;

    if (!oldFile && !newFile) {
      ctx.addIssue({
        code: 'custom',
        path: ['newFile'],
        message: 'File is required',
      });
    }

    if (newFile) {
      if (
        !fileTypes().documentTypes.includes(newFile.type) &&
        !fileTypes().imageTypes.includes(newFile.type)
      ) {
        ctx.addIssue({
          code: 'custom',
          path: ['newFile'],
          message: 'Invalid file type',
        });
      }
    }
  });
export type AdvertisementSchema = z.input<typeof advertisementSchema>;
