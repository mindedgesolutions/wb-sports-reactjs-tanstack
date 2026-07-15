import { customFetch } from '@/axios/custom.fetch';
import { servicesApp } from '@/constants/api.services';
import type { EtenderSchema } from '@/schema/services/e-tender.schema';
import { parseDate } from '@/utils/date.utils';

type ListProps = {
  page?: number;
  search?: string;
  signal: AbortSignal;
};

export const getEtenders = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(servicesApp.eTenders.eTenders.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// -----------------------------------

const formatEtenderPayload = (data: EtenderSchema) => {
  const payload = new FormData();
  const tDate =
    data.tenderDate instanceof Date ? parseDate(data.tenderDate) : null;

  for (const [key, value] of Object.entries(data)) {
    if (value == null) continue;

    if (key === 'newFile' && value instanceof File) {
      payload.append(key, value);
      continue;
    }
    if (key === 'tenderDate' && tDate) {
      payload.append('tenderDate', tDate);
      continue;
    }
    if (value !== '' && value !== undefined && value !== null) {
      payload.append(key, String(value));
      continue;
    }
  }
  return payload;
};

// -----------------------------------

export const eTendersCreate = async (data: EtenderSchema) => {
  const payload = formatEtenderPayload(data);

  const res = await customFetch.post(
    servicesApp.eTenders.eTenders.create,
    payload,
    { headers: { 'Content-Type': 'Multipart/form-data' } },
  );
  return res.data;
};

// -----------------------------------

export const eTendersUpdate = async (id: number, data: EtenderSchema) => {
  const payload = formatEtenderPayload(data);
  payload.append('_method', 'PUT');

  const res = await customFetch.post(
    servicesApp.eTenders.eTenders.update(id),
    payload,
    { headers: { 'Content-Type': 'Multipart/form-data' } },
  );
  return res.data;
};
