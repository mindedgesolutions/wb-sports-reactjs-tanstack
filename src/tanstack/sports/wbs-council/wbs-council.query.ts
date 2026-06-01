import { useQuery } from '@tanstack/react-query';
import {
  getAdvisoryBoardWb,
  getWbsCouncil,
  getWbsDesignations,
  getWbsDesignationsWb,
  getWorkingCommitteeWb,
} from './wbs-council.api';

type ParamProps = {
  page?: number;
  search?: string;
};

// ----------------------------

export const useWbsDesignations = () => {
  return useQuery({
    queryKey: ['wbs-council-designations'],
    queryFn: ({ signal }) => getWbsDesignations(signal),
  });
};

// ----------------------------

export const useWbsDesignationsWb = ({ type }: { type: string }) => {
  return useQuery({
    queryKey: ['wbs-council-designations-web', { type }],
    queryFn: ({ signal }) => getWbsDesignationsWb(type, signal),
  });
};

// ----------------------------

export const useWbsCouncil = ({ page, search }: ParamProps) => {
  return useQuery({
    queryKey: ['wbs-council', page, search],
    queryFn: ({ signal }) => getWbsCouncil({ page, search, signal }),
  });
};

// ----------------------------

export const useAdvisoryBoardWb = () => {
  return useQuery({
    queryKey: ['advisory-board-web'],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getAdvisoryBoardWb(signal),
  });
};

// ----------------------------

export const useWorkingCommitteeWb = () => {
  return useQuery({
    queryKey: ['working-committee-web'],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getWorkingCommitteeWb(signal),
  });
};
