import { validEmail } from '@/utils/format.validation';
import z from 'zod';

export const signinSchema = z
  .object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
    enteredCaptcha: z.string().min(1, 'Captcha is required'),
  })
  .superRefine((data, ctx) => {
    const { username } = data;

    if (!validEmail(username)) {
      ctx.addIssue({
        code: 'custom',
        path: ['username'],
        message: 'Invalid email',
      });
    }
  });
export type SigninSchema = z.infer<typeof signinSchema>;
