import { customFetch } from '@/axios/custom.fetch';

export const toggleStatus = async (api: string, checked: boolean) => {
  const response = await customFetch.put(api, { checked });
  return response.data.data;
};
