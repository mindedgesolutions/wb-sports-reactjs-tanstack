import {
  fileSizes,
  fileTypes,
  validEmail,
  validNumber,
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
    website: z.union([z.literal(''), z.url()]).optional(),
    email: z.string().optional(),
    phoneOne: z.string().optional(),
    phoneTwo: z.string().optional(),
    fax: z.string().optional(),
    newImg: z.instanceof(File).optional().or(z.undefined()),
    oldImg: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { email, phoneOne, phoneTwo, fax, newImg } = data;

    if (email && !validEmail(email)) {
      ctx.addIssue({
        code: 'custom',
        path: ['email'],
        message: 'Invalid email',
      });
    }

    if (phoneOne && !validNumber(phoneOne, 10)) {
      ctx.addIssue({
        code: 'custom',
        path: ['phoneOne'],
        message: 'Invalid phone no.',
      });
    }

    if (phoneTwo && !validNumber(phoneTwo, 10)) {
      ctx.addIssue({
        code: 'custom',
        path: ['phoneTwo'],
        message: 'Invalid phone no.',
      });
    }

    if (fax && !validNumber(fax, 10)) {
      ctx.addIssue({
        code: 'custom',
        path: ['fax'],
        message: 'Invalid FAX no.',
      });
    }

    if (newImg) {
      if (!fileTypes().imageTypes.includes(newImg.type)) {
        ctx.addIssue({
          code: 'custom',
          path: ['newImg'],
          message: 'Only JPEG, PNG, and GIF images are allowed',
        });
      }

      if (newImg.size > fileSizes().max1mb) {
        ctx.addIssue({
          code: 'custom',
          path: ['newImg'],
          message: 'Image size must be less than 1MB',
        });
      }
    }
  });
export type AssociationSchema = z.input<typeof associationSchema>;

// -----------------------------

export const fifaGallerySchema = z
  .object({
    title: z
      .string()
      .min(1, 'Gallery title is required')
      .max(255, 'Gallery title must be less than 255 characters'),
    description: z.string().optional(),
    eventDate: z.coerce.date().optional(),
    newGalleryImg: z.array(z.instanceof(File)).optional(),
    existingGalleryImg: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    const { newGalleryImg, existingGalleryImg } = data;

    if (existingGalleryImg?.length === 0 && newGalleryImg?.length === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['newGalleryImg'],
        message: 'At least 1 image is required',
      });
    }
  });
export type FifaGallerySchema = z.input<typeof fifaGallerySchema>;

// -----------------------------

export const sportsPolicySchema = z
  .object({
    name: z
      .string()
      .min(1, 'Policy name is required')
      .max(255, 'Policy name must be less than 255 characters'),
    newFile: z.instanceof(File).optional().or(z.undefined()),
    existingFile: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { newFile, existingFile } = data;

    if (!existingFile && !newFile) {
      ctx.addIssue({
        code: 'custom',
        path: ['newFile'],
        message: 'Policy attachment is required',
      });
    }

    if (newFile) {
      if (newFile.size > fileSizes().max10mb) {
        ctx.addIssue({
          code: 'custom',
          path: ['newFile'],
          message: 'Policy attachment must be less than 10MB',
        });
      }

      if (!fileTypes().documentTypes.includes(newFile.type)) {
        ctx.addIssue({
          code: 'custom',
          path: ['newFile'],
          message: 'Invalid file type',
        });
      }
    }
  });
export type SportsPolicySchema = z.input<typeof sportsPolicySchema>;

// -----------------------------

export const assocSiteSchema = z.object({
  title: z
    .string()
    .min(1, 'Site title is required')
    .max(255, 'Site title must be less than 255 characters'),
  url: z.url().min(1, 'Site URL is required'),
});
export type AssocSiteSchema = z.input<typeof assocSiteSchema>;
