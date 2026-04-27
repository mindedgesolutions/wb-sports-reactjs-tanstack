import { customFetch } from '@/axios/custom.fetch';

export const deleteEntity = async (api: string) => {
  await customFetch.delete(api);
  return;
};
