import { customFetch } from '@/axios/custom.fetch';
import { servicesApp } from '@/constants/api.services';
import type { NewsEventsSchema } from '@/schema/services/news-events.schema';
import { parseDate } from '@/utils/date.utils';

type ListProps = {
  page?: number;
  search?: string;
  signal: AbortSignal;
};

export const getNewsEvents = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(servicesApp.newsEvents.newsEvents.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// ---------------------------------------

const formatNewsEventPayload = (data: NewsEventsSchema) => {
  const formattedDate =
    data.eventDate instanceof Date ? parseDate(data.eventDate) : null;

  const payload = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (value == null) continue;

    if (key === 'newFile' && value instanceof File) {
      payload.append(key, value);
      continue;
    }

    if (key === 'eventDate' && formattedDate) {
      payload.append('eventDate', formattedDate);
      continue;
    }

    if (value !== '' && value !== undefined && value !== null) {
      payload.append(key, String(value));
      continue;
    }
  }
  return payload;
};

// ---------------------------------------

export const newsEventCreate = async (data: NewsEventsSchema) => {
  const payload = formatNewsEventPayload(data);

  const res = await customFetch.post(
    servicesApp.newsEvents.newsEvents.create,
    payload,
    { headers: { 'Content-Type': 'Multipart/form-data' } },
  );
  return res.data;
};

// ---------------------------------------

export const newsEventUpdate = async (id: number, data: NewsEventsSchema) => {
  const payload = formatNewsEventPayload(data);
  payload.append('_method', 'PUT');

  const res = await customFetch.post(
    servicesApp.newsEvents.newsEvents.update(id),
    payload,
    { headers: { 'Content-Type': 'Multipart/form-data' } },
  );
  return res.data;
};
