import { fileSizes, fileTypes } from '@/utils/format.validation';
import z from 'zod';

export const newsEventsSchema = z
  .object({
    type: z.string().nonempty('Type is required'),
    title: z
      .string()
      .nonempty('Event title is required')
      .max(255, 'Title cannot be more than 255 characters'),
    description: z
      .string()
      .max(500, 'Description cannot be more than 255 characters')
      .optional(),
    eventDate: z.coerce.date().optional(),
    newFile: z.instanceof(File).or(z.undefined()),
    oldFile: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { eventDate, newFile, oldFile } = data;

    if (!eventDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['eventDate'],
        message: 'Event date is required',
      });
    }

    if (!oldFile && !newFile) {
      ctx.addIssue({
        code: 'custom',
        path: ['newFile'],
        message: 'Attachment is required',
      });
    }

    if (newFile) {
      if (!fileTypes().documentTypes.includes(newFile.type)) {
        ctx.addIssue({
          code: 'custom',
          path: ['newFile'],
          message: 'Invalid file type',
        });
      }

      if (newFile.size > fileSizes().max5mb) {
        ctx.addIssue({
          code: 'custom',
          path: ['newFile'],
          message: 'File size cannot be more than 5MB',
        });
      }
    }
  });
export type NewsEventsSchema = z.input<typeof newsEventsSchema>;
