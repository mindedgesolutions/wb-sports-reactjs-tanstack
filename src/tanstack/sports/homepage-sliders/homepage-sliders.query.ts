import { useQuery } from '@tanstack/react-query';
import {
  getHomepageSliders,
  getHomepageSlidersWb,
} from './homepage-sliders.api';

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

// -------------------------------

export const useHomepageSliderWeb = () => {
  return useQuery({
    queryKey: ['homepage-sliders-web'],
    queryFn: getHomepageSlidersWb,
  });
};
