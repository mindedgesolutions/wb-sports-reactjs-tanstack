import {
  fileSizes,
  fileTypes,
  validEmail,
  validNumber,
} from '@/utils/format.validation';
import z from 'zod';

export const wbsCouncilSchema = z
  .object({
    type: z.string().min(1, 'Committee type is required'),
    name: z.string().min(1, 'Name is required'),
    designation: z.string().min(1, 'Designation is required'),
    designationLabel: z
      .string()
      .max(255, 'Designation label must be less than 255 characters')
      .optional(),
    address: z
      .string()
      .max(255, 'Address must be less than 255 characters')
      .optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    fax: z.string().optional(),
    oldImg: z.string().optional(),
    newImg: z.instanceof(File).optional().or(z.undefined()),
  })
  .superRefine((data, ctx) => {
    const { email, phone, fax, newImg } = data;

    if (email && !validEmail(email)) {
      ctx.addIssue({
        code: 'custom',
        path: ['email'],
        message: 'Invalid email',
      });
    }

    if (phone && !validNumber(phone, 10)) {
      ctx.addIssue({
        code: 'custom',
        path: ['phone'],
        message: 'Invalid phone no.',
      });
    }

    if (fax && !validNumber(fax, 10)) {
      ctx.addIssue({
        code: 'custom',
        path: ['fax'],
        message: 'Invalid FAX no.',
      });
    }

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
export type WbsCouncilSchema = z.input<typeof wbsCouncilSchema>;
