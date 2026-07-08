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
