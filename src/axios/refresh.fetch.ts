import axios from 'axios';

export const refreshFetch = axios.create({
  baseURL: `/api`,
  withCredentials: true,
});
