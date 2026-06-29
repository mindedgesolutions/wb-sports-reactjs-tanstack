import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePageParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') ?? '1');

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    setSearchParams(params);
  };
  return { currentPage, onPageChange };
};

// -------------------------------

export const useEnsureValidPage = (currentPage: number, lastPage?: number) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!lastPage) return;

    if (currentPage > lastPage) {
      const params = new URLSearchParams(searchParams);
      params.set('page', String(lastPage));
      setSearchParams(params, { replace: true });
    }
  }, [currentPage, lastPage]);
};
