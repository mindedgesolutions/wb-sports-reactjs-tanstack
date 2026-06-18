import {
  SpwPageBanner,
  SpwParagraphWrapper,
  SpwSectionWrapper,
  WbLoader,
  WbLoadMore,
} from '@/components';
import { titles, icons } from '@/constants';
import type { IBulletinRow } from '@/interface/sports.interface';
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
        {isLoading && <WbLoader />}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-8">
          {rows?.map((t: IBulletinRow) => {
            return (
              <a
                key={t.id}
                href={`${titles.BASE_URL}${t.file_path}`}
                target="_blank"
                rel="noreferrer"
                className="col-span-1 flex flex-col relative"
              >
                {t?.file_path.endsWith('.pdf') ? (
                  <div className="w-full h-full">
                    <div className="w-full p-10 overflow-hidden">
                      <icons.pdf className="h-full w-full object-cover text-muted-foreground/20" />
                    </div>
                    <div className="p-2 text-center text-xs font-inter tracking-wider uppercase">
                      {t.name}
                    </div>
                  </div>
                ) : (
                  <img
                    src={`${titles.BASE_URL}${t?.file_path}`}
                    alt={t?.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </a>
            );
          })}
        </div>
        <div ref={loadMoreRef} />
        {isFetchingNextPage && <WbLoadMore />}
        {!hasNextPage && rows.length > 0 && (
          <SpwParagraphWrapper className="text-center text-muted-foreground mt-8">
            No further record found
          </SpwParagraphWrapper>
        )}
        {!isLoading && rows.length === 0 && (
          <SpwParagraphWrapper className="text-center text-muted-foreground mt-8">
            No records found
          </SpwParagraphWrapper>
        )}
      </SpwSectionWrapper>
    </>
  );
};
export default SpwBulletins;
