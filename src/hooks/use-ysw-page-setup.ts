import { titles } from '@/constants';
import { usePageBanner } from '@/tanstack/services/banners/banners.query';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useYswPageSetup = (pageTitle: string) => {
  const { pathname } = useLocation();

  const { data, isLoading, isFetching, error, isError } = usePageBanner({
    url: pathname,
  });

  useEffect(() => {
    document.title = `${pageTitle} | ${titles.SERVICES_APP_NAME}`;
  }, [pageTitle]);

  return {
    data,
    isLoading,
    isFetching,
    error,
    isError,
    pathname,
    hasBanner: !!data,
  };
};
