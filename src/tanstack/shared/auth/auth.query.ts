import { useQuery } from '@tanstack/react-query';
import { currentUser, getCaptcha } from './auth.api';

export const useGetCaptcha = () => {
  return useQuery({
    queryKey: ['captcha'],
    queryFn: getCaptcha,
    staleTime: 0,
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

// ------------------------

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: currentUser,
    retry: false,
  });
};
