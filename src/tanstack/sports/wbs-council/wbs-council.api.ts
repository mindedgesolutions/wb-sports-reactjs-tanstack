import { customFetch } from '@/axios/custom.fetch';
import { simpleFetch } from '@/axios/refresh.fetch';
import { sportsApp } from '@/constants/api.sports';
import { sportsWeb } from '@/constants/api.sports.website';
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

export const getWbsDesignationsWb = async (
  type: string,
  signal: AbortSignal,
) => {
  const res = await simpleFetch.get(
    sportsWeb.wbsCouncil.wbsDesignations(type),
    {
      signal,
    },
  );
  return res.data.data;
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

export const getAdvisoryBoardWb = async (signal: AbortSignal) => {
  const res = await simpleFetch.get(sportsWeb.wbsCouncil.advisoryBoard, {
    signal,
  });

  return res.data.data;
};

// ----------------------------

export const getWorkingCommitteeWb = async (signal: AbortSignal) => {
  const res = await simpleFetch.get(sportsWeb.wbsCouncil.workingCommittee, {
    signal,
  });

  return res.data.data;
};

// ----------------------------

const formatWbsCouncilPayload = (data: WbsCouncilSchema) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    if (value !== '' && value !== undefined && value !== null) {
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
