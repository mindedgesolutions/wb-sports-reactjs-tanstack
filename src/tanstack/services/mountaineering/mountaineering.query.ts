import { useQuery } from '@tanstack/react-query';
import {
  getMountainGeneralBody,
  getMountainGeneralBodyAll,
} from './mountaineering.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const useMountainGeneralBody = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['mountain-general-bodies', { page, search }],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getMountainGeneralBody({ page, search, signal }),
  });
};

// -----------------------------

export const useMountainGeneralBodyAll = () => {
  return useQuery({
    queryKey: ['mountain-general-bodies-all'],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getMountainGeneralBodyAll({ signal }),
  });
};
