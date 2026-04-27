import axios, { type AxiosInstance, type AxiosError } from 'axios';
import { refreshToken } from './auth.api';
import { userManager } from './user.manager';
import { getOrganisationFromPath } from './org.resolver';

let isRefreshing = false;
let failedQueue: {
  resolve: () => void;
  reject: (error: any) => void;
}[] = [];

const processQueue = (error?: any) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve();
  });
  failedQueue = [];
};

export const customFetch: AxiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 15000,
});

const org = getOrganisationFromPath();

customFetch.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes(`/auth/refresh/${org}`)) {
      return Promise.reject(error);
    }

    const status = error.response?.status;

    if ((status === 401 || status === 403) && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(customFetch(originalRequest)),
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshToken(org);

        processQueue();
        return customFetch(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        userManager.clear();
        window.dispatchEvent(new CustomEvent('force-logout'));

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
