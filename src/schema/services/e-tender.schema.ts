import { fileSizes, fileTypes } from '@/utils/format.validation';
import z from 'zod';

export const etenderSchema = z
  .object({
    name: z
      .string()
      .nonempty('E-tender name is required')
      .max(250, 'Name cannot be more than 250 characters'),
    tenderDate: z.coerce.date().optional(),
    newFile: z.instanceof(File).or(z.undefined()),
    existingFile: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { newFile, existingFile } = data;

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
      if (newFile.size > fileSizes().max5mb) {
        ctx.addIssue({
          code: 'custom',
          path: ['newFile'],
          message: 'File size cannot be more than 5MB',
        });
      }
    }
  });
export type EtenderSchema = z.input<typeof etenderSchema>;
