import { useQuery } from '@tanstack/react-query';
import { getHomepageSliders } from './homepage-sliders.api';

type ParamProps = {
  page?: number;
};

export const useHomepageSlider = ({ page }: ParamProps) => {
  return useQuery({
    queryKey: ['homepage-sliders', { page }],
    queryFn: async ({ signal }: { signal: AbortSignal }) => {
      const res = await getHomepageSliders({ page, signal });
      return res;
    },
  });
};
