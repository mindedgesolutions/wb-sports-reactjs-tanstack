import { customFetch } from '@/axios/custom.fetch';
import { sportsApp } from '@/constants/api.sports';

type ListProps = {
  search?: string;
  page?: number;
  signal: AbortSignal;
};

export const getNewsScroller = async ({ search, page, signal }: ListProps) => {
  const res = await customFetch.get(sportsApp.newsScroller.newsScroller.list, {
    params: { search, page },
    signal,
  });
  return res.data;
};
