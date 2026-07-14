import { customFetch } from '@/axios/custom.fetch';
import { servicesApp } from '@/constants/api.services';
import type { YouthHostelSchema } from '@/schema/services/youth-hostel.schema';
import { optimizeImage } from '@/utils/image.utils';

type ListProps = {
  page?: number;
  search?: string;
  signal: AbortSignal;
};

export const getYouthHostels = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(
    servicesApp.youthHostels.youthHostels.list,
    { params: { page, search }, signal },
  );
  return res.data;
};

// ----------------------------

export const getYouthHostelById = async (id: number, signal: AbortSignal) => {
  const res = await customFetch.get(
    servicesApp.youthHostels.youthHostels.show(id),
    { signal },
  );
  return res.data.data;
};

// ----------------------------

const formatYouthHostelPayload = async (data: YouthHostelSchema) => {
  const payload = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (value == null) continue;

    if (key === 'newImg' && value instanceof File) {
      const optimizedFile = await optimizeImage(value);
      payload.append(key, optimizedFile);
      continue;
    }

    if (value !== '' && value !== undefined && value !== null) {
      payload.append(key, String(value));
      continue;
    }
  }
  return payload;
};

// ----------------------------

export const youthHostelCreate = async (data: YouthHostelSchema) => {
  const payload = await formatYouthHostelPayload(data);

  const res = await customFetch.post(
    servicesApp.youthHostels.youthHostels.create,
    payload,
    { headers: { 'Content-Type': 'Multipart/form-data' } },
  );
  return res.data;
};

// ----------------------------

export const youthHostelUpdate = async (
  id: number,
  data: YouthHostelSchema,
) => {
  const payload = await formatYouthHostelPayload(data);
  payload.append('_method', 'PUT');

  const res = await customFetch.post(
    servicesApp.youthHostels.youthHostels.update(id),
    payload,
    { headers: { 'Content-Type': 'Multipart/form-data' } },
  );
  return res.data;
};
