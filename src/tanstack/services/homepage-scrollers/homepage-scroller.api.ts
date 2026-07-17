import { customFetch } from '@/axios/custom.fetch';
import { servicesApp } from '@/constants/api.services';
import type { HomepageScrollerSchema } from '@/schema/services/homepage-scroller.schema';
import { parseDate } from '@/utils/date.utils';

type ListProps = {
  page?: number;
  search?: string;
  signal: AbortSignal;
};

export const getHomepageScrollers = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(
    servicesApp.homepageScrollers.homepageScrollers.list,
    { params: { page, search }, signal },
  );
  return res.data;
};

// ------------------------------

const formatScrollerPayload = (data: HomepageScrollerSchema) => {
  const payload = new FormData();
  const eDate =
    data.eventDate instanceof Date ? parseDate(data.eventDate) : null;

  for (const [key, value] of Object.entries(data)) {
    if (value == null) continue;

    if (key === 'newFile' && value instanceof File) {
      payload.append(key, value);
      continue;
    }

    if (key === 'eventDate' && eDate) {
      payload.append('eventDate', eDate);
      continue;
    }

    if (value !== '' && value !== undefined && value !== null) {
      payload.append(key, String(value));
      continue;
    }
  }
  return payload;
};

// ------------------------------

export const homepageScrollerCreate = async (data: HomepageScrollerSchema) => {
  const payload = formatScrollerPayload(data);

  const res = await customFetch.post(
    servicesApp.homepageScrollers.homepageScrollers.create,
    payload,
    { headers: { 'Content-Type': 'Multipart/form-data' } },
  );
  return res.data;
};

// ------------------------------

export const homepageScrollerUpdate = async (
  id: number,
  data: HomepageScrollerSchema,
) => {
  const payload = formatScrollerPayload(data);
  payload.append('_method', 'PUT');

  const res = await customFetch.post(
    servicesApp.homepageScrollers.homepageScrollers.update(id),
    payload,
    { headers: { 'Content-Type': 'Multipart/form-data' } },
  );
  return res.data;
};
