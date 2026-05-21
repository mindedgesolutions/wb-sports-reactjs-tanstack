import type { HomepageSliderSchema } from '@/schema/sports/homepage-slider.schema';
import { useMutation } from '@tanstack/react-query';
import { homepageSliderCreate } from './homepage-sliders.api';
import { queryClient } from '@/tanstack/query.client';

export const useHomepageSliderCreate = () => {
  return useMutation({
    mutationFn: async (data: HomepageSliderSchema) => {
      const res = await homepageSliderCreate(data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homepage-sliders'] });
    },
  });
};
