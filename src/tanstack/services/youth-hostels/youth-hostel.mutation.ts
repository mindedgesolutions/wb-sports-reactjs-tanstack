import { useMutation } from '@tanstack/react-query';
import { youthHostelCreate, youthHostelUpdate } from './youth-hostel.api';
import { queryClient } from '@/tanstack/query.client';
import type { YouthHostelSchema } from '@/schema/services/youth-hostel.schema';

export const useYouthHostelCreate = () => {
  return useMutation({
    mutationFn: youthHostelCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['youth-hostels'] });
      queryClient.invalidateQueries({ queryKey: ['youth-hostel'] });
    },
  });
};

// ----------------------------------

type YouthHostelPayload = {
  id: number;
  data: YouthHostelSchema;
};

export const useYouthHostelUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: YouthHostelPayload) =>
      youthHostelUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['youth-hostels'] });
      queryClient.invalidateQueries({ queryKey: ['youth-hostel'] });
    },
  });
};
