import { customFetch } from '@/axios/custom.fetch';
import { sportsApp } from '@/constants/api.sports';
import type { ContactUsSchema } from '@/schema/sports/contact-us.schema';

type ListProps = {
  page?: number;
  search?: string;
  signal: AbortSignal;
};

export const getContactUs = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(sportsApp.contactUs.contactUs.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// ----------------------------------

export const getContactUsAll = async (signal: AbortSignal) => {
  const res = await customFetch.get(sportsApp.contactUs.contactUs.all, {
    signal,
  });
  return res.data;
};

// ----------------------------------

export const contactUsCreate = async (data: ContactUsSchema) => {
  const res = await customFetch.post(
    sportsApp.contactUs.contactUs.create,
    data,
  );
  return res.data;
};

// ----------------------------------

export const contactUsUpdate = async (id: number, data: ContactUsSchema) => {
  const res = await customFetch.put(
    sportsApp.contactUs.contactUs.update(id),
    data,
  );
  return res.data;
};
