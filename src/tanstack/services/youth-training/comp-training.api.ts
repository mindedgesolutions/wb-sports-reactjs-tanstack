import { customFetch } from '@/axios/custom.fetch';
import { servicesApp } from '@/constants/api.services';
import type {
  CompCourseDetailsSchema,
  CompTrainingCentreSchema,
  CourseSyllabusSchema,
} from '@/schema/services/youth-training.schema';

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

// -----------------------------

const formatSyllabusPayload = (data: CourseSyllabusSchema) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'newFile' && value instanceof File) {
      formData.append('newFile', value);
      return;
    }
    if (value !== '' && value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  return formData;
};

// -----------------------------

export const compSyllabusCreate = async (data: CourseSyllabusSchema) => {
  const formData = formatSyllabusPayload(data);

  const res = await customFetch.post(
    servicesApp.youthTraining.compTraining.courseSyllabus.create,
    formData,
    { headers: { 'Content-Type': 'Multipart/form-data' } },
  );
  return res.data;
};

// -----------------------------

export const compSyllabusUpdate = async (
  id: number,
  data: CourseSyllabusSchema,
) => {
  const formData = formatSyllabusPayload(data);
  formData.append('_method', 'PUT');

  const res = await customFetch.post(
    servicesApp.youthTraining.compTraining.courseSyllabus.update(id),
    formData,
    { headers: { 'Content-Type': 'Multipart/form-data' } },
  );
  return res.data;
};

// -----------------------------

export const getCompTrainingCentres = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(
    servicesApp.youthTraining.compTraining.trainingCentres.list,
    { params: { page, search }, signal },
  );
  return res.data;
};

// -----------------------------

export const compTrainingCentreCreate = async (
  data: CompTrainingCentreSchema,
) => {
  const res = await customFetch.post(
    servicesApp.youthTraining.compTraining.trainingCentres.create,
    data,
  );
  return res.data;
};

// -----------------------------

export const compTrainingCentreUpdate = async (
  id: number,
  data: CompTrainingCentreSchema,
) => {
  const res = await customFetch.put(
    servicesApp.youthTraining.compTraining.trainingCentres.update(id),
    data,
  );
  return res.data;
};
