import { validNumber } from '@/utils/format.validation';
import z from 'zod';

export const sportsPersonnelSchema = z
  .object({
    sport: z.string().min(1, 'Sport is required'),
    name: z
      .string()
      .min(1, 'Name is required')
      .max(255, 'Name must be less than 255 characters'),
    address: z
      .string()
      .max(255, 'Address must be less than 255 characters')
      .optional(),
    dob: z.coerce.date().optional(),
    contactOne: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (!value) return true;
          return validNumber(value, 10);
        },
        { message: 'Invalid contact no.' },
      ),
    contactTwo: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (!value) return true;
          return validNumber(value, 10);
        },
        { message: 'Invalid contact no.' },
      ),
  })
  .superRefine((data, ctx) => {
    const { dob } = data;

    if (dob && dob > new Date()) {
      ctx.addIssue({
        code: 'custom',
        path: ['dob'],
        message: 'Date of birth cannot be in the future',
      });
    }
  });
export type SportsPersonnelSchema = z.input<typeof sportsPersonnelSchema>;

// -----------------------------

export const sportsEventsSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(500, 'Title must be less than 500 characters'),
  eventDate: z.coerce
    .date()
    .optional()
    .superRefine((value, ctx) => {
      if (!value) {
        ctx.addIssue({
          code: 'custom',
          message: 'Event date is required',
        });
        return;
      }
      if (value > new Date()) {
        ctx.addIssue({
          code: 'custom',
          message: 'Event date cannot be in the future',
        });
        return;
      }
    }),
});
export type SportsEventsSchema = z.input<typeof sportsEventsSchema>;
