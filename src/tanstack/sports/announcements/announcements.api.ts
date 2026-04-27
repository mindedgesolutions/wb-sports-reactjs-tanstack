import { customFetch } from '@/axios/custom.fetch';
import { sportsApp } from '@/constants/api.sports';
import type {
  AdvertisementSchema,
  AnnouncementSchema,
} from '@/schema/sports/announcements.schema';
import { parseDate } from '@/utils/date.utils';

type ListProps = {
  page?: number;
  search?: string;
  signal: AbortSignal;
};

// Announcements starts ----------

export const getAnnouncements = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(
    sportsApp.announcements.announcements.list,
    { params: { page, search }, signal },
  );
  return res.data;
};

// -------------------------------

const formatAnnouncementPayload = (data: AnnouncementSchema) => {
  const startDate =
    data.startDate instanceof Date ? parseDate(data.startDate) : null;
  const endDate = data.endDate instanceof Date ? parseDate(data.endDate) : null;

  const payload = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'startDate' && startDate) {
      payload.append('startDate', startDate);
    }
    if (key === 'endDate' && endDate) {
      payload.append('endDate', endDate);
    }
    if (key !== 'startDate' && key !== 'endDate') {
      if (value instanceof File) {
        payload.append('newFile', value);
      } else {
        payload.append(key, String(value));
      }
    }
  });
  return payload;
};

// -------------------------------

export const announcementCreate = async (data: AnnouncementSchema) => {
  const payload = formatAnnouncementPayload(data);

  const res = await customFetch.post(
    sportsApp.announcements.announcements.create,
    payload,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return res.data;
};

// -------------------------------

export const announcementUpdate = async (
  id: number,
  data: AnnouncementSchema,
) => {
  const payload = formatAnnouncementPayload(data);
  payload.append('_method', 'PUT');

  const res = await customFetch.post(
    sportsApp.announcements.announcements.update(id),
    payload,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return res.data;
};

// Announcements ends ----------

// Advertisements starts ----------

export const getAdvertisements = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(
    sportsApp.announcements.advertisements.list,
    { params: { page, search }, signal },
  );
  return res.data;
};

// -------------------------------

const formatAdvertisementPayload = (data: AdvertisementSchema) => {
  const adDate = data.adDate instanceof Date ? parseDate(data.adDate) : null;

  const payload = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'adDate' && adDate) {
      payload.append('adDate', adDate);
    }
    if (key !== 'adDate') {
      if (value instanceof File) {
        payload.append('newFile', value);
      } else {
        payload.append(key, String(value));
      }
    }
  });
  return payload;
};

// -------------------------------

export const advertisementCreate = async (data: any) => {
  const payload = formatAdvertisementPayload(data);

  const res = await customFetch.post(
    sportsApp.announcements.advertisements.create,
    payload,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data;
};

// -------------------------------

export const advertisementUpdate = async (id: number, data: any) => {
  const payload = formatAdvertisementPayload(data);
  payload.append('_method', 'PUT');

  const res = await customFetch.post(
    sportsApp.announcements.advertisements.update(id),
    payload,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return res.data;
};
