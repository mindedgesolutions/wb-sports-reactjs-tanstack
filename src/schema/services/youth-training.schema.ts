import {
  fileSizes,
  fileTypes,
  validEmail,
  validNumber,
} from '@/utils/format.validation';
import z from 'zod';

export const compCourseDetailsSchema = z
  .object({
    courseType: z.string().nonempty('Course type is required'),
    courseName: z
      .string()
      .nonempty('Course name is required')
      .max(255, 'Course name cannot be more than 255 characters'),
    duration: z.string().nonempty('Course duration is required'),
    courseFee: z.string().nonempty('Course fee is required'),
    eligibility: z
      .string()
      .nonempty('Course eligibility is required')
      .max(255, 'Eligibility cannot be more than 255 characters'),
  })
  .superRefine((data, ctx) => {
    const { courseFee } = data;
    const pattern = /^[0-9]+$/;
    if (!pattern.test(courseFee)) {
      ctx.addIssue({
        code: 'custom',
        path: ['courseFee'],
        message: 'Invalid number',
      });
    }
  });
export type CompCourseDetailsSchema = z.input<typeof compCourseDetailsSchema>;

// ---------------------------------

export const courseSyllabusSchema = z
  .object({
    syllabusName: z
      .string()
      .nonempty('Syllabus name is required')
      .max(255, 'Name cannot be more than 255 characters'),
    newFile: z.instanceof(File).or(z.undefined()),
    oldFile: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { newFile, oldFile } = data;

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
          message: 'Invalid file type. Allowed: PDF',
        });
      }

      if (newFile.size > fileSizes().max5mb) {
        ctx.addIssue({
          code: 'custom',
          path: ['newFile'],
          message: 'File size must be less than 5MB',
        });
      }
    }
  });
export type CourseSyllabusSchema = z.input<typeof courseSyllabusSchema>;

// ---------------------------------

export const compTrainingCentreSchema = z
  .object({
    districtId: z.string().nonempty('District is required'),
    name: z
      .string()
      .nonempty('YCTC name is required')
      .max(255, 'Name cannot be more than 255 characters'),
    code: z
      .string()
      .max(255, 'YCTC code cannot be more than 255 characters')
      .optional(),
    category: z.string().optional(),
    addressLine1: z
      .string()
      .nonempty('Address line 1 is required')
      .max(255, 'Line 1 cannot be more than 255 characters'),
    addressLine2: z
      .string()
      .max(255, 'Line 2 cannot be more than 255 characters')
      .optional(),
    addressLine3: z
      .string()
      .max(255, 'Line 3 cannot be more than 255 characters')
      .optional(),
    city: z
      .string()
      .max(255, 'City cannot be more than 255 characters')
      .optional(),
    pincode: z.string().optional(),
    inchargeName: z
      .string()
      .max(255, 'Incharge name cannot be more than 255 characters')
      .optional(),
    inchargeMobile: z.string().optional(),
    inchargeEmail: z.string().optional(),
    ownerName: z
      .string()
      .max(255, 'Owner name cannot be more than 255 characters')
      .optional(),
    ownerMobile: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { pincode, inchargeMobile, inchargeEmail, ownerMobile } = data;

    if (pincode && !validNumber(pincode, 6)) {
      ctx.addIssue({
        code: 'custom',
        path: ['pincode'],
        message: 'Invalid PIN code',
      });
    }

    if (inchargeMobile && !validNumber(inchargeMobile, 10)) {
      ctx.addIssue({
        code: 'custom',
        path: ['inchargeMobile'],
        message: 'Invalid mobile no.',
      });
    }

    if (inchargeEmail && !validEmail(inchargeEmail)) {
      ctx.addIssue({
        code: 'custom',
        path: ['inchargeEmail'],
        message: 'Invalid email',
      });
    }

    if (ownerMobile && !validNumber(ownerMobile, 10)) {
      ctx.addIssue({
        code: 'custom',
        path: ['ownerMobile'],
        message: 'Invalid mobile no.',
      });
    }
  });
export type CompTrainingCentreSchema = z.input<typeof compTrainingCentreSchema>;
