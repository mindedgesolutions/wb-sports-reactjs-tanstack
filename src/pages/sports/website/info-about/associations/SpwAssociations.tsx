import {
  SpwPageBanner,
  SpwParagraphWrapper,
  SpwSectionWrapper,
  WbLoadMore,
} from '@/components';
import { titles } from '@/constants';
import { useAssociationsWb } from '@/tanstack/sports/info-about/info-about.query';
import { useEffect, useRef } from 'react';
import AssociationCard from './AssociationCard';
import type { IAssociationRow } from '@/interface/sports.interface';

const SpwAssociations = () => {
  document.title = `Associations | ${titles.SPORTS_APP_NAME}`;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useAssociationsWb();

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
      <SpwPageBanner title="Associations" />
      <SpwSectionWrapper className="max-w-7xl mx-auto mb-4 md:mb-8 gap-8 min-h-80">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rows?.map((assoc: IAssociationRow) => (
            <div key={assoc.id} className="col-span-1">
              <AssociationCard {...assoc} />
            </div>
          ))}
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
export default SpwAssociations;
