import { customFetch } from '@/axios/custom.fetch';
import { servicesApp } from '@/constants/api.services';
import type {
  VocSchemeSchema,
  VocTrainingCentreSchema,
} from '@/schema/services/youth-training.schema';

type ListProps = {
  page?: number;
  search?: string;
  signal: AbortSignal;
};

export const getVocSchemes = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(
    servicesApp.youthTraining.vocTraining.schemes.list,
    { params: { page, search }, signal },
  );
  return res.data;
};

// -----------------------------

export const getVocSchemesAll = async ({ signal }: { signal: AbortSignal }) => {
  const res = await customFetch.get(
    servicesApp.youthTraining.vocTraining.schemes.all,
    { signal },
  );
  return res.data;
};

// -----------------------------

export const vocSchemeCreate = async (data: VocSchemeSchema) => {
  const res = await customFetch.post(
    servicesApp.youthTraining.vocTraining.schemes.create,
    data,
  );
  return res.data;
};

// -----------------------------

export const vocSchemeUpdate = async (id: number, data: VocSchemeSchema) => {
  const res = await customFetch.put(
    servicesApp.youthTraining.vocTraining.schemes.update(id),
    data,
  );
  return res.data;
};

// -----------------------------

export const getVocTrainingCentres = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(
    servicesApp.youthTraining.vocTraining.trainingCentres.list,
    { params: { page, search }, signal },
  );
  return res.data;
};

// -----------------------------

export const vocTrainingCentreCreate = async (
  data: VocTrainingCentreSchema,
) => {
  const res = await customFetch.post(
    servicesApp.youthTraining.vocTraining.trainingCentres.create,
    data,
  );
  return res.data;
};

// -----------------------------

export const vocTrainingCentreUpdate = async (
  id: number,
  data: VocTrainingCentreSchema,
) => {
  const res = await customFetch.put(
    servicesApp.youthTraining.vocTraining.trainingCentres.update(id),
    data,
  );
  return res.data;
};
