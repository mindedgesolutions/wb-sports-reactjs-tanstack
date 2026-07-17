import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  forgotPassword,
  login,
  logout,
  profileUpdateServices,
  profileUpdateSports,
  resetPassword,
} from './auth.api';
import { userManager } from '@/axios/user.manager';
import { queryClient } from '@/tanstack/query.client';

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

// ------------------------

export const useProfileUpdateServices = () => {
  return useMutation({
    mutationFn: profileUpdateServices,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
    },
  });
};

// ------------------------

export const useProfileUpdateSports = () => {
  return useMutation({
    mutationFn: profileUpdateSports,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
    },
  });
};

// ------------------------

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

// ------------------------

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
