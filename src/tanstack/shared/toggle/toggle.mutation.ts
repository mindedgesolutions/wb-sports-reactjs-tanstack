import { useMutation } from '@tanstack/react-query';
import { toggleStatus } from './toggle.api';
import { showSuccess } from '@/alerts/show.success';
import { showError } from '@/alerts/show.error';
import { queryClient } from '@/tanstack/query.client';

export const useToggleStatus = (queryKey: string) => {
  return useMutation({
    mutationFn: ({ url, checked }: { url: string; checked: boolean }) =>
      toggleStatus(url, checked),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      showSuccess('Status updated successfully');
    },

    onError: () => {
      showError('Failed to update status. Please try again.');
    },
  });
};
