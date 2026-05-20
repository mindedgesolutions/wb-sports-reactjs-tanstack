import { validEmail, validNumber } from '@/utils/format.validation';
import z from 'zod';

export const contactUsSchema = z
  .object({
    designation: z
      .string()
      .min(1, 'Designation is required')
      .max(255, 'Designation cannot be more than 255 characters'),
    name: z
      .string()
      .min(1, 'Name is required')
      .max(255, 'Name cannot be more than 255 characters'),
    address: z
      .string()
      .max(255, 'Name cannot be more than 255 characters')
      .nullable(),
    email: z
      .string()
      .max(255, 'Email cannot be more than 255 characters')
      .optional(),
    phone_1: z.string().optional(),
    phone_2: z.string().optional(),
    fax: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { email, phone_1, phone_2, fax } = data;

    if (email && !validEmail(email)) {
      ctx.addIssue({
        code: 'custom',
        path: ['email'],
        message: 'Invalid email',
      });
    }

    if (phone_1 && !validNumber(phone_1, 10)) {
      ctx.addIssue({
        code: 'custom',
        path: ['phone_1'],
        message: 'Invalid phone no.',
      });
    }

    if (phone_2 && !validNumber(phone_2, 10)) {
      ctx.addIssue({
        code: 'custom',
        path: ['phone_2'],
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
  });
export type ContactUsSchema = z.input<typeof contactUsSchema>;
