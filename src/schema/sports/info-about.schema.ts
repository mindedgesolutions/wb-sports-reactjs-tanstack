import {
  fileSizes,
  fileTypes,
  validEmail,
  validNumber,
  validUrl,
} from '@/utils/format.validation';
import z from 'zod';

export const stadiumSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(255, 'Name must be less than 255 characters'),
  location: z
    .string()
    .min(1, 'Location is required')
    .max(255, 'Location must be less than 255 characters'),
  address: z
    .string()
    .max(255, 'Address must be less than 255 characters')
    .optional(),
  coverImg: z.instanceof(File).optional().or(z.undefined()),
  oldCoverImg: z.string().optional(),
  description: z.string().optional(),
  highlights: z.array(
    z.object({
      value: z
        .string()
        .max(500, 'Highlight must be less than 500 characters')
        .optional(),
    }),
  ),
  newGalleryImg: z.array(z.instanceof(File)).optional(),
  existingGalleryImg: z.array(z.string()).optional(),
});
export type StadiumSchema = z.input<typeof stadiumSchema>;

// -----------------------------

export const associationSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Assoc. name is required')
      .max(255, 'Assoc. name must be less than 255 characters'),
    address: z
      .string()
      .max(255, 'Address must be less than 255 characters')
      .optional(),
    website: z.string().optional(),
    email: z.string().optional(),
    phoneOne: z.string().optional(),
    phoneTwo: z.string().optional(),
    fax: z.string().optional(),
    newImg: z.instanceof(File).optional().or(z.undefined()),
    oldImg: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { website, email, phoneOne, phoneTwo, fax, newImg } = data;

    if (website && !validUrl(website)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Invalid URL',
      });
    }

    if (email && !validEmail(email)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Invalid email',
      });
    }

    if (phoneOne && !validNumber(phoneOne, 10)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Invalid phone no.',
      });
    }

    if (phoneTwo && !validNumber(phoneTwo, 10)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Invalid phone no.',
      });
    }

    if (fax && !validNumber(fax, 10)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Invalid FAX no.',
      });
    }

    if (newImg) {
      if (!fileTypes().imageTypes.includes(newImg.type)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Only JPEG, PNG, and GIF images are allowed',
        });
      }

      if (newImg.size > fileSizes().max1mb) {
        ctx.addIssue({
          code: 'custom',
          message: 'Image size must be less than 1MB',
        });
      }
    }
  });
export type AssociationSchema = z.input<typeof associationSchema>;
