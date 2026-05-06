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

// -----------------------

export const getYoutubeVideoId = (url: string): string | null => {
  try {
    const parsed = new URL(url);

    // youtu.be/<id>
    if (parsed.hostname === 'youtu.be') {
      const id = parsed.pathname.slice(1);
      return id || null;
    }

    // youtube.com/watch?v=<id>
    if (
      parsed.hostname === 'youtube.com' ||
      parsed.hostname === 'www.youtube.com' ||
      parsed.hostname === 'm.youtube.com'
    ) {
      // watch?v=
      if (parsed.pathname === '/watch') {
        return parsed.searchParams.get('v');
      }

      // /embed/<id>
      if (parsed.pathname.startsWith('/embed/')) {
        return parsed.pathname.split('/')[2] || null;
      }

      // /shorts/<id>
      if (parsed.pathname.startsWith('/shorts/')) {
        return parsed.pathname.split('/')[2] || null;
      }
    }

    return null;
  } catch {
    return null;
  }
};
