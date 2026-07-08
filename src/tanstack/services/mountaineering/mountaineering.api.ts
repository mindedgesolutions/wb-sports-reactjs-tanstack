import { customFetch } from '@/axios/custom.fetch';
import { servicesApp } from '@/constants/api.services';
import type { MountainGeneralBodySchema } from '@/schema/services/mountaineering.schema';

type ListProps = {
  page?: number;
  search?: string;
  signal: AbortSignal;
};

export const getMountainGeneralBody = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(servicesApp.mountaineering.gbMembers.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// -----------------------------

export const getMountainGeneralBodyAll = async ({
  signal,
}: {
  signal: AbortSignal;
}) => {
  const res = await customFetch.get(servicesApp.mountaineering.gbMembers.all, {
    signal,
  });
  return res.data;
};

// -----------------------------

export const mountainGeneralBodyCreate = async (
  data: MountainGeneralBodySchema,
) => {
  const res = await customFetch.post(
    servicesApp.mountaineering.gbMembers.create,
    data,
  );
  return res.data;
};

// -----------------------------

export const mountainGeneralBodyUpdate = async (
  id: number,
  data: MountainGeneralBodySchema,
) => {
  const res = await customFetch.put(
    servicesApp.mountaineering.gbMembers.update(id),
    data,
  );
  return res.data;
};

// -----------------------------

export const getMountainCourses = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(
    servicesApp.mountaineering.courseDetails.list,
    { params: { page, search }, signal },
  );
  return res.data;
};

// -----------------------------

export const mountainCourseCreate = async (data: any) => {
  const res = await customFetch.post(
    servicesApp.mountaineering.courseDetails.create,
    data,
  );
  return res.data;
};

// -----------------------------

export const mountainCourseUpdate = async (id: number, data: any) => {
  const res = await customFetch.put(
    servicesApp.mountaineering.courseDetails.update(id),
    data,
  );
  return res.data;
};
