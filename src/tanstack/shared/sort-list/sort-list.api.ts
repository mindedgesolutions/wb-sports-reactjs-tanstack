import { customFetch } from '@/axios/custom.fetch';

export const sortList = async ({
  api,
  data,
}: {
  api: string;
  data: { id: number; show: number }[];
}) => {
  try {
    await customFetch.put(api, data);
    return;
  } catch (error) {
    console.error(error);
  }
};
