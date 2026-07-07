import { useQuery } from '@tanstack/react-query';
import {
  getVocSchemes,
  getVocSchemesAll,
  getVocTrainingCentres,
} from './voc-training.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const useVocSchemes = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['voc-schemes', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getVocSchemes({ page, search, signal }),
  });
};

// -----------------------------

export const useVocSchemesAll = () => {
  return useQuery({
    queryKey: ['voc-schemes-all'],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getVocSchemesAll({ signal }),
  });
};

// -----------------------------

export const useVocTrainingCentres = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['voc-training-centres', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getVocTrainingCentres({ page, search, signal }),
  });
};
