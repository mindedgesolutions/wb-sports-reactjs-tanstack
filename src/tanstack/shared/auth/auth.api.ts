import { customFetch } from '@/axios/custom.fetch';
import { refreshFetch } from '@/axios/refresh.fetch';

export const getCaptcha = async () => {
  const res = await refreshFetch.get(`/auth/captcha`);
  return res.data;
};

// ------------------------

export const login = async (data: any) => {
  const res = await refreshFetch.post(`/auth/login`, data);
  return res;
};

// ------------------------

export const logout = async (org: string) => {
  const res = await customFetch.post(`/auth/logout/${org}`);
  return res;
};

// ------------------------

export const currentUser = async () => {
  const res = await customFetch.get(`/auth/me`);
  return res.data.data;
};
