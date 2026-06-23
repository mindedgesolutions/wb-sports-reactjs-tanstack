import { validEmail, validNumber } from '@/utils/format.validation';
import z from 'zod';

export const feedbackSchema = z
  .object({
    feedbackType: z.string().nonempty('Feedback type is required'),
    name: z
      .string()
      .nonempty('Enter your name')
      .max(255, 'Name cannot be more than 255 characters'),
    mobileNo: z.string().nonempty('Mobile no. is required'),
    email: z
      .string()
      .nonempty('Email is required')
      .max(255, 'Email cannot be more than 255 characters'),
    address: z
      .string()
      .max(255, 'Address cannot be more than 255 characters')
      .optional(),
    subject: z
      .string()
      .nonempty('Subject is required')
      .max(100, 'Subject cannot be more than 100 characters'),
    message: z
      .string()
      .nonempty('Message is required')
      .max(500, 'Message cannot be more than 500 characters'),
  })
  .superRefine((data, ctx) => {
    const { mobileNo, email } = data;

    if (mobileNo && !validNumber(mobileNo, 10)) {
      ctx.addIssue({
        code: 'custom',
        path: ['mobileNo'],
        message: 'Invalid mobile no.',
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
export type FeedbackSchema = z.input<typeof feedbackSchema>;
