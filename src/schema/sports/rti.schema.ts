import { fileSizes, fileTypes } from '@/utils/format.validation';
import z from 'zod';

export const rtiNoticeSchema = z
  .object({
    noticeNo: z
      .string()
      .min(1, 'Notice no. is required')
      .max(255, 'Notice no. cannot be more than 255 characters'),
    subject: z
      .string()
      .min(1, 'Subject is required')
      .max(500, 'Subject cannot be more than 255 characters'),
    isNew: z.string(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    newFile: z.instanceof(File).or(z.undefined()),
    existingFile: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { startDate, endDate, newFile, existingFile } = data;

    if (startDate && endDate && startDate > endDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['endDate'],
        message: 'End date must be after start date',
      });
    }

    if (!existingFile && !newFile) {
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

      if (newFile.size > fileSizes().max10mb) {
        ctx.addIssue({
          code: 'custom',
          path: ['newFile'],
          message: 'File size must be less than 10MB',
        });
      }
    }
  });
export type RtiNoticeSchema = z.input<typeof rtiNoticeSchema>;
