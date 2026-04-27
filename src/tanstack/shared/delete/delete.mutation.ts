import { useMutation } from '@tanstack/react-query';
import { deleteEntity } from './delete.api';
import { showSuccess } from '@/alerts/show.success';
import { showError } from '@/alerts/show.error';
import { queryClient } from '@/tanstack/query.client';

export const useDeleteEntity = (
  queryKey: string,
  deleteQueryKey: string,
  additionalQueryKeys?: string[],
) => {
  return useMutation({
    mutationFn: ({ url, id }: { url: string; id: number }) => deleteEntity(url),

    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });

      const selected = queryClient.getQueryData<any>([deleteQueryKey]);

      if (selected?.id === vars?.id) {
        queryClient.removeQueries({
          queryKey: [deleteQueryKey],
        });
      }

      if (additionalQueryKeys) {
        additionalQueryKeys.forEach((key) =>
          queryClient.invalidateQueries({ queryKey: [key] }),
        );
      }

      showSuccess('Entity deleted successfully');
    },

    onError: () => {
      showError('Failed to delete entity. Please try again.');
    },
  });
};
