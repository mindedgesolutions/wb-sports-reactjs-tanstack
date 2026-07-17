import {
  fileSizes,
  fileTypes,
  validEmail,
  validNumber,
} from '@/utils/format.validation';
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

// ---------------------------

export const profileSchema = z
  .object({
    name: z
      .string()
      .nonempty('Name is required')
      .max(250, 'Name cannot be more than 250 characters'),
    email: z.string().optional(),
    mobile: z.string().optional(),
    password: z.string().optional(),
    password_confirmation: z.string().optional(),
    newImg: z.instanceof(File).or(z.undefined()),
    existingImg: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { mobile, password, password_confirmation, newImg } = data;

    if (mobile && !validNumber(mobile, 10)) {
      ctx.addIssue({
        code: 'custom',
        path: ['mobile'],
        message: 'Invalid mobile no.',
      });
    }

    if (password && !password_confirmation) {
      ctx.addIssue({
        code: 'custom',
        path: ['password_confirmation'],
        message: 'Confirm new password',
      });
    }

    if (password_confirmation && !password) {
      ctx.addIssue({
        code: 'custom',
        path: ['password'],
        message: 'New password is required',
      });
    }

    if (password !== password_confirmation) {
      ctx.addIssue({
        code: 'custom',
        path: ['password_confirmation'],
        message: 'Passwords do not match',
      });
    }

    if (newImg) {
      if (!fileTypes().imageTypes.includes(newImg.type)) {
        ctx.addIssue({
          code: 'custom',
          path: ['newImg'],
          message: 'Invalid file type',
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
export type ProfileSchema = z.input<typeof profileSchema>;
