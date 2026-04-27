import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/tanstack/query.client';
import { sortList } from './sort-list.api';
import { showSuccess } from '@/alerts/show.success';
import { showError } from '@/alerts/show.error';

export const useSortList = (
  queryKey: string,
  additionalQueryKeys?: string[],
) => {
  return useMutation({
    mutationFn: sortList,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      if (additionalQueryKeys) {
        additionalQueryKeys.forEach((key) =>
          queryClient.invalidateQueries({ queryKey: [key] }),
        );
      }
      showSuccess('Order set successfully');
    },

    onError: () => {
      showError('Failed to set order. Please try again.');
    },
  });
};
