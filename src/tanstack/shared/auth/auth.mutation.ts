import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, logout } from './auth.api';
import { userManager } from '@/axios/user.manager';

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: () => {},
    onError: () => {},
  });
};

// ------------------------

export const useLogout = (org: string) => {
  const queryClient = useQueryClient();

  const cleanup = () => {
    userManager.clear();
    queryClient.clear();
  };

  return useMutation({
    mutationFn: () => logout(org),
    onSuccess: cleanup,
    onError: cleanup,
  });
};
