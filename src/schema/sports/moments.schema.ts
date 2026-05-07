import { fileSizes, fileTypes } from '@/utils/format.validation';
import { getYoutubeVideoId } from '@/utils/functions';
import z from 'zod';

export const photoGallerySchema = z
  .object({
    title: z
      .string()
      .min(1, 'Gallery title is required')
      .max(255, 'Gallery title must be less than 255 characters'),
    description: z.string().optional(),
    eventDate: z.coerce.date().optional(),
    coverImg: z.instanceof(File).optional().or(z.undefined()),
    existingCoverImg: z.string().optional(),
    galleryImg: z.array(z.instanceof(File)).optional(),
    existingGalleryImg: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    const { coverImg } = data;

    if (coverImg) {
      if (!fileTypes().imageTypes.includes(coverImg.type)) {
        ctx.addIssue({
          code: 'custom',
          path: ['coverImg'],
          message: 'Only JPEG, PNG, and GIF images are allowed',
        });
      }

      if (!fileTypes().imageTypes.includes(coverImg.type)) {
        ctx.addIssue({
          code: 'custom',
          path: ['coverImg'],
          message: 'Image size must be less than 10MB',
        });
      }
    }
  });
export type PhotoGallerySchema = z.input<typeof photoGallerySchema>;

// ---------------------------------

export const audioVisualSchema = z.object({
  url: z
    .string()
    .trim()
    .refine(
      (value) => !!getYoutubeVideoId(value),
      'Please enter a valid YouTube video URL',
    ),
  title: z.string().max(255, 'Title must be less than 255 characters'),
});
export type AudioVisualSchema = z.input<typeof audioVisualSchema>;

// ---------------------------------

export const bulletinsSchema = z
  .object({
    name: z
      .string()
      .max(500, 'Title must be less than 255 characters')
      .optional(),
    eventDate: z.coerce.date().optional(),
    newFile: z.instanceof(File).optional().or(z.undefined()),
    oldFile: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { newFile, oldFile } = data;

    if (!oldFile && !newFile) {
      ctx.addIssue({
        code: 'custom',
        path: ['newFile'],
        message: 'Attchment is required',
      });
    }

    if (newFile) {
      if (!fileTypes().documentTypes.includes(newFile.type)) {
        ctx.addIssue({
          code: 'custom',
          path: ['newFile'],
          message: 'Only JPEG, PNG, and GIF images are allowed',
        });
      }

      if (newFile.size > fileSizes().max10mb) {
        ctx.addIssue({
          code: 'custom',
          path: ['newFile'],
          message: 'File size must be less than 10MB',
        });
      }
    }
  });
export type BulletinsSchema = z.input<typeof bulletinsSchema>;

// ---------------------------------

export const amphanPhotosSchema = z
  .object({
    newImage: z.instanceof(File).optional().or(z.undefined()),
    existingImage: z.string().optional(),
    title: z.string().max(255, 'Title must be less than 255 characters'),
  })
  .superRefine((data, ctx) => {
    const { newImage, existingImage } = data;

    if (!existingImage && !newImage) {
      ctx.addIssue({
        code: 'custom',
        path: ['newImage'],
        message: 'Image is required',
      });
    }

    if (newImage) {
      if (!fileTypes().imageTypes.includes(newImage.type)) {
        ctx.addIssue({
          code: 'custom',
          path: ['newImage'],
          message: 'Only JPEG, PNG, and GIF images are allowed',
        });
      }

      if (newImage.size > fileSizes().max10mb) {
        ctx.addIssue({
          code: 'custom',
          path: ['newImage'],
          message: 'Image size must be less than 10MB',
        });
      }
    }
  });
export type AmphanPhotosSchema = z.input<typeof amphanPhotosSchema>;
