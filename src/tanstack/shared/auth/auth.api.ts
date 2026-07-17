import { customFetch } from '@/axios/custom.fetch';
import { simpleFetch } from '@/axios/refresh.fetch';
import { servicesApp } from '@/constants/api.services';
import { sportsApp } from '@/constants/api.sports';
import type {
  ForgotPasswordSchema,
  ProfileSchema,
  ResetPasswordSchema,
} from '@/schema/auth.schema';
import { optimizeImage } from '@/utils/image.utils';

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

// ------------------------

const formatProfilePayload = async (data: ProfileSchema) => {
  const payload = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (value instanceof File) {
      const optimizedFile = await optimizeImage(value);
      payload.append(key, optimizedFile);
      continue;
    }

    if (value !== '' && value !== undefined && value !== null) {
      payload.append(key, String(value));
    }
  }
  return payload;
};

// ------------------------

export const profileUpdateServices = async (data: ProfileSchema) => {
  const payload = await formatProfilePayload(data);

  const res = await customFetch.post(
    servicesApp.profile.profile.update,
    payload,
    {
      headers: { 'Content-Type': 'Multipart/form-data' },
    },
  );
  return res.data;
};

// ------------------------

export const profileUpdateSports = async (data: ProfileSchema) => {
  const payload = await formatProfilePayload(data);

  const res = await customFetch.post(
    sportsApp.profile.profile.update,
    payload,
    {
      headers: { 'Content-Type': 'Multipart/form-data' },
    },
  );
  return res.data;
};

// ------------------------

export const forgotPassword = async (data: ForgotPasswordSchema) => {
  const res = await customFetch.post(`/auth/forgot-password`, data);
  return res.data;
};

// ------------------------

export const resetPassword = async (data: ResetPasswordSchema) => {
  const res = await customFetch.post(`/auth/reset-password`, data);
  return res.data;
};
