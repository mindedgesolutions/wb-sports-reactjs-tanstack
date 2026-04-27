import { customFetch } from '@/axios/custom.fetch';
import { sportsApp } from '@/constants/api.sports';
import type { WbsCouncilSchema } from '@/schema/sports/wbs-council.schema';

type ListProps = {
  page?: number;
  search?: string;
  signal: AbortSignal;
};

export const getWbsDesignations = async (signal: AbortSignal) => {
  const res = await customFetch.get(sportsApp.wbsCouncil.designations, {
    signal,
  });
  return res.data;
};

// ----------------------------

export const getWbsCouncil = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(sportsApp.wbsCouncil.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// ----------------------------

const formatWbsCouncilPayload = (data: WbsCouncilSchema) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  return formData;
};

// ----------------------------

export const wbsCouncilCreate = async (data: WbsCouncilSchema) => {
  const payload = formatWbsCouncilPayload(data);

  const res = await customFetch.post(sportsApp.wbsCouncil.create, payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

// ----------------------------

export const wbsCouncilUpdate = async (id: number, data: WbsCouncilSchema) => {
  const payload = formatWbsCouncilPayload(data);
  payload.append('_method', 'PUT');

  const res = await customFetch.post(sportsApp.wbsCouncil.update(id), payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};
