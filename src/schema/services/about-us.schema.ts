import {
  fileSizes,
  fileTypes,
  validEmail,
  validNumber,
} from '@/utils/format.validation';
import z from 'zod';

export const orgChartSchema = z
  .object({
    name: z
      .string()
      .nonempty('Name is required')
      .max(255, 'Name cannot be more than 255 characters'),
    designation: z
      .string()
      .nonempty('Designation is required')
      .max(255, 'Designation cannot be more than 255 characters'),
    department: z.string().nonempty('Department is required'),
    rank: z
      .string()
      .max(255, 'Designation cannot be more than 255 characters')
      .optional(),
    message: z
      .string()
      .max(500, 'Message cannot be more than 500 characters')
      .optional(),
    oldImg: z.string().optional(),
    newImg: z.instanceof(File).optional().or(z.undefined()),
  })
  .superRefine((data, ctx) => {
    const { newImg } = data;

    if (newImg) {
      if (!fileTypes().imageTypes.includes(newImg.type)) {
        ctx.addIssue({
          code: 'custom',
          path: ['newImg'],
          message: 'Invalid file type',
        });
      }

      if (newImg.size > fileSizes().max10mb) {
        ctx.addIssue({
          code: 'custom',
          path: ['newImg'],
          message: 'File size cannot be more than 10MB',
        });
      }
    }
  });
export type OrgChartSchema = z.input<typeof orgChartSchema>;

// ------------------------------

export const districtBlockOfficeSchema = z
  .object({
    districtId: z.string().nonempty('District is required'),
    name: z
      .string()
      .nonempty('Office name is required')
      .max(255, 'Name cannot be more than 255 characters'),
    address: z
      .string()
      .nonempty('Office address is required')
      .max(255, 'Address cannot be more than 255 characters'),
    landline: z.string().optional(),
    email: z.string().optional(),
    mobile_1: z.string().optional(),
    mobile_2: z.string().optional(),
    officerName: z
      .string()
      .max(255, 'Name cannot be more than 255 characters')
      .optional(),
    officerDesignation: z
      .string()
      .nonempty('Officer designation is required')
      .max(255, 'Designation cannot be more than 255 characters'),
    officerMobile: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { landline, email, mobile_1, mobile_2, officerMobile } = data;

    if (landline && !validNumber(landline, 10)) {
      ctx.addIssue({
        code: 'custom',
        path: ['landline'],
        message: 'Enter 10 digit valid landline no.',
      });
    }
    if (mobile_1 && !validNumber(mobile_1, 10)) {
      ctx.addIssue({
        code: 'custom',
        path: ['mobile_1'],
        message: 'Enter 10 digit valid mobile no.',
      });
    }
    if (mobile_2 && !validNumber(mobile_2, 10)) {
      ctx.addIssue({
        code: 'custom',
        path: ['mobile_2'],
        message: 'Enter 10 digit valid mobile no.',
      });
    }
    if (officerMobile && !validNumber(officerMobile, 10)) {
      ctx.addIssue({
        code: 'custom',
        path: ['officerMobile'],
        message: 'Enter 10 digit valid mobile no.',
      });
    }

    if (email && !validEmail(email)) {
      ctx.addIssue({
        code: 'custom',
        path: ['email'],
        message: 'Invalid email',
      });
    }
  });
export type DistrictBlockOfficeSchema = z.input<
  typeof districtBlockOfficeSchema
>;
