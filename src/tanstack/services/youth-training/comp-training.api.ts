import { customFetch } from '@/axios/custom.fetch';
import { servicesApp } from '@/constants/api.services';
import type { CompCourseDetailsSchema } from '@/schema/services/youth-training.schema';

type ListProps = {
  page?: number;
  search?: string;
  signal: AbortSignal;
};

export const getCompCourseDetails = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(
    servicesApp.youthTraining.compTraining.courseDetails.list,
    { params: { page, search }, signal },
  );
  return res.data;
};

// -----------------------------

export const compCourseDetailsCreate = async (
  data: CompCourseDetailsSchema,
) => {
  const res = await customFetch.post(
    servicesApp.youthTraining.compTraining.courseDetails.create,
    data,
  );
  return res.data;
};

// -----------------------------

export const compCourseDetailsUpdate = async (
  id: number,
  data: CompCourseDetailsSchema,
) => {
  const res = await customFetch.put(
    servicesApp.youthTraining.compTraining.courseDetails.update(id),
    data,
  );
  return res.data;
};

// -----------------------------

export const getCompSyllabus = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(
    servicesApp.youthTraining.compTraining.courseSyllabus.list,
    { params: { page, search }, signal },
  );
  return res.data;
};
