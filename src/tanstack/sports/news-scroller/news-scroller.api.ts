import { customFetch } from '@/axios/custom.fetch';
import { simpleFetch } from '@/axios/refresh.fetch';
import { sportsApp } from '@/constants/api.sports';
import { sportsWeb } from '@/constants/api.sports.website';
import type { NewsScrollerSchema } from '@/schema/sports/news-scroller.schema';
import { parseDate } from '@/utils/date.utils';

type ListProps = {
  search?: string;
  page?: number;
  signal: AbortSignal;
};

export const getNewsScroller = async ({ search, page, signal }: ListProps) => {
  const res = await customFetch.get(sportsApp.newsScroller.newsScroller.list, {
    params: { search, page },
    signal,
  });
  return res.data;
};

// ------------------------------

const formatNewsScrollerPayload = (data: NewsScrollerSchema) => {
  const newsDate =
    data.newsDate instanceof Date ? parseDate(data.newsDate) : null;

  const payload = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'newsDate' && newsDate) {
      payload.append(key, newsDate);
      return;
    }

    if (value instanceof File) {
      payload.append('newFile', value);
      return;
    }

    if (value !== '' && value !== undefined && value !== null) {
      payload.append(key, String(value));
    }
  });
  return payload;
};

// ------------------------------

export const newsScrollerCreate = async (data: NewsScrollerSchema) => {
  const payload = formatNewsScrollerPayload(data);

  const res = await customFetch.post(
    sportsApp.newsScroller.newsScroller.create,
    payload,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data;
};

// ------------------------------

export const newsScrollerUpdate = async (
  id: number,
  data: NewsScrollerSchema,
) => {
  const payload = formatNewsScrollerPayload(data);
  payload.append('_method', 'PUT');

  const res = await customFetch.post(
    sportsApp.newsScroller.newsScroller.update(id),
    payload,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data;
};

// ------------------------------

export const getNewsScrollerWb = async () => {
  const res = await simpleFetch.get(sportsWeb.homepage.newsScroller);
  return res.data.data;
};
