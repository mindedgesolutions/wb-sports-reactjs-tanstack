import type { MountainCourseSchema } from '@/schema/services/mountaineering.schema';
import z from 'zod';

export const validEmail = (value: string): boolean => {
  if (value === null || value === undefined || value === '') return true;
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(value);
};

// -------------------------------

export const validNumber = (
  value: string | number | undefined | null,
  length: number,
) => {
  if (value === null || value === undefined || value === '') return true;
  const str = String(value);
  const pattern = /^[0-9]+$/;
  return str.length === length && pattern.test(str);
};

// -------------------------------

export const fileSizes = () => {
  const max1mb = 1024 * 1024;
  const max2mb = 2 * max1mb;
  const max5mb = 5 * max1mb;
  const max10mb = 10 * max1mb;

  return { max1mb, max2mb, max5mb, max10mb };
};

// -------------------------------

export const fileTypes = () => {
  const imageTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const documentTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];
  const anyTypes = [...imageTypes, ...documentTypes];

  return { imageTypes, documentTypes, anyTypes };
};

// -------------------------------

export type NumericFieldOptions = {
  name: keyof MountainCourseSchema;
  label: string;
  min?: number;
  max?: number;
};

export const validNumberWithMinMax = (
  value: string | undefined,
  ctx: z.RefinementCtx,
  { name, label, min, max }: NumericFieldOptions,
) => {
  if (value === undefined || value === '') {
    return;
  }

  if (!/^\d+$/.test(value)) {
    ctx.addIssue({
      code: 'custom',
      path: [name],
      message: `${label} must be a number`,
    });
    return;
  }

  const num = Number(value);

  if (min !== undefined && num < min) {
    ctx.addIssue({
      code: 'custom',
      path: [name],
      message: `${label} cannot be less than ${min}`,
    });
  }

  if (max !== undefined && num > max) {
    ctx.addIssue({
      code: 'custom',
      path: [name],
      message: `${label} cannot be more than ${max}`,
    });
  }
};
