import {
  SpwPageBanner,
  SpwParagraphWrapper,
  SpwSectionWrapper,
  WbLoader,
  WbLoadMore,
} from '@/components';
import { titles } from '@/constants';
import type { ISportsEventRow } from '@/interface/sports.interface';
import { useSportsEventsWb } from '@/tanstack/sports/sports/sports.query';
import { useEffect, useRef } from 'react';

const SpwSportsEvents = () => {
  document.title = `Sports Events | ${titles.SPORTS_APP_NAME}`;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSportsEventsWb();
  console.log(data);

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
      <SpwPageBanner title="Sports Events" />
      <SpwSectionWrapper className="max-w-7xl mx-auto">
        <ol className="list-disc list-inside md:list-outside marker:text-primary marker:text-sm md:marker:text-2xl">
          {isLoading && <WbLoader />}
          {rows.map((item: ISportsEventRow) => (
            <li
              key={item.id}
              className="mb-4 md:mb-8 text-xs md:text-sm font-roboto tracking-normal md:tracking-wider leading-normal md:leading-relaxed text-justify last-of-type:mb-0 ml-0 md:ml-4"
            >
              {item.title}
            </li>
          ))}
        </ol>
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
export default SpwSportsEvents;
