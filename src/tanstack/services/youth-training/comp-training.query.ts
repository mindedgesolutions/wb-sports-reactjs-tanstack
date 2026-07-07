import { useQuery } from '@tanstack/react-query';
import {
  getCompCourseDetails,
  getCompSyllabus,
  getCompTrainingCentres,
} from './comp-training.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const useCompCourseDetails = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['comp-course-details', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getCompCourseDetails({ page, search, signal }),
  });
};

// -----------------------------

export const useCompSyllabus = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['comp-syllabus', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getCompSyllabus({ page, search, signal }),
  });
};

// -----------------------------

export const useCompTrainingCentres = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['comp-training-centres', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getCompTrainingCentres({ page, search, signal }),
  });
};
