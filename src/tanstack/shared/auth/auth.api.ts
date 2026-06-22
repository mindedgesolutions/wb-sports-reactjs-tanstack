import { customFetch } from '@/axios/custom.fetch';
import { simpleFetch } from '@/axios/refresh.fetch';

export const getCaptcha = async () => {
  const res = await simpleFetch.get(`/auth/captcha`);
  return res.data;
};

// ------------------------

export const login = async (data: any) => {
  const res = await simpleFetch.post(`/auth/login`, data);
  return res;
};

// ------------------------

export const logout = async (org: string) => {
  const res = await customFetch.post(`/${org}/auth/logout/${org}`);
  return res;
};

// ------------------------

export const currentUser = async (org: string) => {
  const res = await customFetch.get(`/${org}/auth/me`);
  return res.data.data;
};
