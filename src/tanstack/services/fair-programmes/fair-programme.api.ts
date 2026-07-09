import { customFetch } from '@/axios/custom.fetch';
import { servicesApp } from '@/constants/api.services';

type ListProps = {
  page?: number;
  search?: string;
  signal: AbortSignal;
};

export const getFairProgrammes = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(servicesApp.fairProgrammes.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// ---------------------------------------

export const fairProgrammeCreate = async (data: any) => {};

// ---------------------------------------

export const fairProgrammeUpdate = async (id: number, data: any) => {};
