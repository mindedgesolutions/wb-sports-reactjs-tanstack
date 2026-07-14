import {
  fileSizes,
  fileTypes,
  validEmail,
  validNumber,
} from '@/utils/format.validation';
import z from 'zod';

export const youthHostelSchema = z
  .object({
    districtId: z.string().nonempty('District is required'),
    name: z
      .string()
      .nonempty('Hostel name is required')
      .max(255, 'Name cannot be more than 255 characters'),
    address: z.string().nonempty('Address is required'),
    phone_1: z.string().optional(),
    phone_2: z.string().optional(),
    email: z.string().optional(),
    accommodation: z.string().optional(),
    reach: z.string().optional(),
    trainStation: z
      .string()
      .nonempty('Nearest train station is required')
      .max(255, 'Station name cannot be more than 255 characters'),
    busStop: z
      .string()
      .max(255, 'Bus stop name cannot be more than 255 characters')
      .optional(),
    airport: z
      .string()
      .max(255, 'Airport name cannot be more than 255 characters')
      .optional(),
    network: z.string().optional(),
    remarks: z.string().optional(),
    newImg: z.instanceof(File).or(z.undefined()),
    existingImg: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { phone_1, phone_2, email, newImg } = data;

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

    if (email && !validEmail(email)) {
      ctx.addIssue({
        code: 'custom',
        path: ['email'],
        message: 'Invalid email',
      });
    }

    if (newImg) {
      if (!fileTypes().imageTypes.includes(newImg.type)) {
        ctx.addIssue({
          code: 'custom',
          path: ['newImg'],
          message: 'Only JPEG, PNG, and GIF images are allowed',
        });
      }

      if (newImg.size > fileSizes().max5mb) {
        ctx.addIssue({
          code: 'custom',
          path: ['newImg'],
          message: 'File size cannot be more than 5MB',
        });
      }
    }
  });
export type YouthHostelSchema = z.input<typeof youthHostelSchema>;
