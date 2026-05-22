import axios from 'axios';

export const simpleFetch = axios.create({
  baseURL: `/api`,
  withCredentials: true,
});
