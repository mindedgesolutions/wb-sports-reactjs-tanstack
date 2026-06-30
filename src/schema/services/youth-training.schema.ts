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
