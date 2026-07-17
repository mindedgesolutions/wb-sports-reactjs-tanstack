import { fileSizes, fileTypes } from '@/utils/format.validation';
import z from 'zod';

const optionalUrl = z
  .string()
  .trim()
  .max(255, 'URL cannot be more than 255 characters')
  .refine((value) => value === '' || URL.canParse(value), 'Invalid URL');

export const homepageScrollerSchema = z
  .object({
    title: z
      .string()
      .nonempty('New title is required')
      .max(250, 'Title cannot be more than 250 characters'),
    eventDate: z.coerce.date().optional(),
    type: z.enum(['attachment', 'link']),
    newFile: z.instanceof(File).or(z.undefined()),
    existingFile: z.string().optional(),
    link: optionalUrl,
  })
  .superRefine((data, ctx) => {
    const { type, newFile, existingFile, link } = data;

    if (type === 'attachment') {
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
    }

    if (type === 'link' && !link) {
      ctx.addIssue({
        code: 'custom',
        path: ['link'],
        message: 'URL is required',
      });
    }
  });
export type HomepageScrollerSchema = z.input<typeof homepageScrollerSchema>;
