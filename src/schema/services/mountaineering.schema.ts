import {
  fileSizes,
  fileTypes,
  validNumberWithMinMax,
  type NumericFieldOptions,
} from '@/utils/format.validation';
import z from 'zod';

export const mountainGeneralBodySchema = z.object({
  designation: z
    .string()
    .max(255, 'Designation cannot be more than 255 characters')
    .optional(),
  name: z
    .string()
    .nonempty('Name is required')
    .max(255, 'Name cannot be more than 255 characters'),
  description: z
    .string()
    .nonempty('Description is required')
    .max(255, 'Description cannot be more than 255 characters'),
});
export type MountainGeneralBodySchema = z.input<
  typeof mountainGeneralBodySchema
>;

// ---------------------------------

export const mountainCourseSchema = z
  .object({
    name: z
      .string()
      .nonempty('Course name is required')
      .max(255, 'Name cannot be more than 255 characters'),
    count: z.string().nonempty('Course count is required'),
    duration: z.string().nonempty('Course duration is required'),
    start: z.string().nonempty('Starting age group is required'),
    end: z.string().nonempty('Ending age group is required'),
    remarks: z
      .string()
      .max(500, 'Remarks cannot be more than 500 characters')
      .optional(),
    fee: z.string().optional(),
    newFile: z.instanceof(File).or(z.undefined()),
    oldFile: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { start, end, newFile } = data;

    const arr = [
      { name: 'count', label: 'Course count', max: 100 },
      { name: 'duration', label: 'Course duration', max: 100 },
      { name: 'start', label: 'Starting age group', min: 5 },
      { name: 'end', label: 'Ending age group', max: 70 },
      { name: 'fee', label: 'Course fee', min: 0 },
    ] satisfies NumericFieldOptions[];

    arr.forEach((field) => {
      validNumberWithMinMax(data[field.name], ctx, field);
    });

    if (Number(start) > Number(end)) {
      ctx.addIssue({
        code: 'custom',
        path: ['end'],
        message: 'Start cannot be greater than end',
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
export type MountainCourseSchema = z.input<typeof mountainCourseSchema>;
