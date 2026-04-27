import { titles } from '@/constants';
import { useEffect, useState } from 'react';
import { z } from 'zod';

export const serialNo = ({
  page,
  index,
}: {
  page: number;
  index: number;
}): number => {
  return (page - 1) * 10 + index + 1;
};

// -----------------------

export const showLess = (text: string, length: number): string => {
  if (text.length <= length) return text;

  return text.slice(0, length) + '...';
};

// Pagination starts ------
export const constructUrl = ({
  pageNumber,
  search,
  pathname,
}: {
  pageNumber?: number;
  search?: string;
  pathname?: string;
}): string => {
  const searchParams = new URLSearchParams(search);
  pageNumber && searchParams.set('page', pageNumber.toString());
  return `${pathname}?${searchParams.toString()}`;
};

export const constructPrevOrNext = ({
  curretPage,
  pageCount,
  search,
  pathname,
}: {
  curretPage: number;
  pageCount: number;
  search: string;
  pathname: string;
}) => {
  let prevPage = curretPage - 1;
  if (prevPage < 1) prevPage = 1;
  const prevUrl = constructUrl({ pageNumber: prevPage, search, pathname });

  let nextPage = curretPage + 1;
  if (nextPage > pageCount) nextPage = pageCount;
  const nextUrl = constructUrl({ pageNumber: nextPage, search, pathname });

  return { prevUrl, nextUrl };
};
// Pagination ends ------

export function useDebounce<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

// -----------------------

export const quickFilterSchema = z.object({
  search: z.string().optional(),
});
export type QuickFilterSchema = z.infer<typeof quickFilterSchema>;

// -----------------------

export const isPreviewable = (fileName: string) => {
  const previewable = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'webp'];
  const ext = fileName.split('.').pop()?.toLowerCase();
  return previewable.includes(ext || '');
};

// -----------------------

export const handleDownload = async (filePath: string, fileName: string) => {
  try {
    const encodedPath = encodeURIComponent(filePath);
    const encodedName = encodeURIComponent(fileName);
    const url = `${titles.BASE_URL}/api/download?filePath=${encodedPath}&fileName=${encodedName}`;
    window.open(url, '_blank');
  } catch (error) {
    console.log(error);
    throw new Error('Failed to download file');
  }
};
