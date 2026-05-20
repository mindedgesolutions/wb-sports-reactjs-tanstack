import type { ContactUsSchema } from '@/schema/sports/contact-us.schema';
import { useMutation } from '@tanstack/react-query';
import { contactUsCreate, contactUsUpdate } from './contact-us.api';
import { queryClient } from '@/tanstack/query.client';

export const useContactUsCreate = () => {
  return useMutation({
    mutationFn: (data: ContactUsSchema) => contactUsCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-us'] });
    },
  });
};

// --------------------------------------

type ContactUsPayload = {
  id: number;
  data: ContactUsSchema;
};

export const useContactUsUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: ContactUsPayload) => contactUsUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-us'] });
    },
  });
};
