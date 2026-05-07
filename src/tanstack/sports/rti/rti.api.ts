import { customFetch } from '@/axios/custom.fetch';
import { sportsApp } from '@/constants/api.sports';
import type { RtiNoticeSchema } from '@/schema/sports/rti.schema';
import { parseDate } from '@/utils/date.utils';

type ListProps = {
  page?: number;
  search?: string;
  signal: AbortSignal;
};

export const getRtiNotices = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(sportsApp.rti.notices.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// -----------------------------------

const formatRtiNoticePayload = (data: RtiNoticeSchema) => {
  const payload = new FormData();
  const startDate =
    data.startDate instanceof Date ? parseDate(data.startDate) : null;
  const endDate = data.endDate instanceof Date ? parseDate(data.endDate) : null;

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'startDate' && startDate) {
      payload.append('startDate', startDate);
      return;
    }

    if (key === 'endDate' && endDate) {
      payload.append('endDate', endDate);
      return;
    }

    if (key === 'newFile' && value instanceof File) {
      payload.append('newFile', value);
      return;
    }

    if (value != null && value !== '') {
      payload.append(key, String(value));
    }
  });
  return payload;
};

// -----------------------------------

export const rtiNoticeCreate = async (data: RtiNoticeSchema) => {
  const payload = formatRtiNoticePayload(data);

  const res = await customFetch.post(sportsApp.rti.notices.create, payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

// -----------------------------------

export const rtiNoticeUpdate = async (id: number, data: RtiNoticeSchema) => {
  const payload = formatRtiNoticePayload(data);
  payload.append('_method', 'PUT');

  const res = await customFetch.post(
    sportsApp.rti.notices.update(id),
    payload,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return res.data;
};
