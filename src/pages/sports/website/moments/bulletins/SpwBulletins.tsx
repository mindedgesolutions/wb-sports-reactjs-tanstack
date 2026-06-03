import { SpwPageBanner, SpwSectionWrapper } from '@/components';
import { titles } from '@/constants';
import { useBulletinsWb } from '@/tanstack/sports/moments/moments.query';
import { useEffect, useRef } from 'react';

const SpwBulletins = () => {
  document.title = `Bulletins | ${titles.SPORTS_APP_NAME}`;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBulletinsWb();

  const rows = data?.pages.flatMap((page) => page.data) ?? [];

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      <SpwPageBanner title="Bulletins" />
      <SpwSectionWrapper className="max-w-7xl mx-auto mb-4 md:mb-8 gap-8 min-h-80">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8"></div>
      </SpwSectionWrapper>
    </>
  );
};
export default SpwBulletins;
