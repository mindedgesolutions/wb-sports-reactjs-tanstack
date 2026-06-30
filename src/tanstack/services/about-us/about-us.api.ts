import { customFetch } from '@/axios/custom.fetch';
import { servicesApp } from '@/constants/api.services';
import type {
  DistrictBlockOfficeSchema,
  OrgChartSchema,
} from '@/schema/services/about-us.schema';
import { optimizeImage } from '@/utils/image.utils';

type ListProps = {
  page?: number;
  search?: string;
  signal: AbortSignal;
};

export const getOrganisationChart = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(servicesApp.aboutUs.orgChart.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// -----------------------------

export const getOrganisationChartAll = async ({
  signal,
}: {
  signal: AbortSignal;
}) => {
  const res = await customFetch.get(servicesApp.aboutUs.orgChart.all, {
    signal,
  });
  return res.data;
};

// -----------------------------

const formatOrgChartPayload = async (
  data: OrgChartSchema,
): Promise<FormData> => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (value instanceof File) {
      const optimizedFile = await optimizeImage(value);
      formData.append(key, optimizedFile);
      continue;
    }

    if (value !== '' && value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  }
  return formData;
};

// -----------------------------

export const orgChartCreate = async (data: OrgChartSchema) => {
  const formData = await formatOrgChartPayload(data);

  const res = await customFetch.post(
    servicesApp.aboutUs.orgChart.create,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data;
};

// -----------------------------

export const orgChartUpdate = async (id: number, data: OrgChartSchema) => {
  const formData = await formatOrgChartPayload(data);
  formData.append('_method', 'PUT');

  const res = await customFetch.post(
    servicesApp.aboutUs.orgChart.update(id),
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data;
};

// -----------------------------

export const getDistrictBlockOffices = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(
    servicesApp.aboutUs.districtBlockOffices.list,
    { params: { page, search }, signal },
  );
  return res.data;
};

// -----------------------------

export const districtBlockOfficeCreate = async (
  data: DistrictBlockOfficeSchema,
) => {
  const res = await customFetch.post(
    servicesApp.aboutUs.districtBlockOffices.create,
    data,
  );
  return res.data;
};

// -----------------------------

export const districtBlockOfficeUpdate = async (
  id: number,
  data: DistrictBlockOfficeSchema,
) => {
  const res = await customFetch.put(
    servicesApp.aboutUs.districtBlockOffices.update(id),
    data,
  );
  return res.data;
};
