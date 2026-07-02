import { fileSizes, fileTypes } from '@/utils/format.validation';
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
