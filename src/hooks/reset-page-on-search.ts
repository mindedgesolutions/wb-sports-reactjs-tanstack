import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useResetPaginationOnSearch = (search?: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const prevSearchRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (search !== prevSearchRef.current) {
      prevSearchRef.current = search;

      if (searchParams.get('page') !== '1') {
        setSearchParams((prev) => {
          const params = new URLSearchParams(prev);
          params.set('page', '1');
          return params;
        });
      }
    }
  }, [search, setSearchParams]);
};
