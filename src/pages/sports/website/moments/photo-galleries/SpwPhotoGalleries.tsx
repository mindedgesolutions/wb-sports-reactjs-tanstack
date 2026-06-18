import {
  SpwPageBanner,
  SpwParagraphWrapper,
  SpwSectionWrapper,
  WbLoader,
  WbLoadMore,
} from '@/components';
import { titles, icons } from '@/constants';
import type { IPhotoGalleryRow } from '@/interface/sports.interface';
import { useMomentsPhotoGalleries } from '@/tanstack/sports/moments/moments.query';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const SpwPhotoGalleries = () => {
  document.title = `Photo Galleries | ${titles.SPORTS_APP_NAME}`;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMomentsPhotoGalleries();

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

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  return (
    <>
      <SpwPageBanner title="Photo Galleries" />
      <SpwSectionWrapper className="max-w-7xl mx-auto mb-4 md:mb-8 gap-8 min-h-80">
        {isLoading && <WbLoader />}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {rows?.map((t: IPhotoGalleryRow) => {
            const hasImage = t.cover_img && !imageErrors[t.slug];

            return (
              <div
                key={t.id}
                className="col-span-1 p-2 flex flex-col justify-center items-center hover:bg-muted hover:cursor-pointer"
              >
                <div className="w-40 h-40 flex justify-center items-center overflow-hidden">
                  <Link
                    key={t.slug}
                    to={`${titles.SPORTS_WEB_URL}/photo-gallery/${t.slug}`}
                    className="col-span-1 flex flex-col justify-center items-center gap-2 p-2"
                  >
                    {hasImage ? (
                      <img
                        src={`${titles.BASE_URL}${t?.cover_img}`}
                        alt={t.slug}
                        className="w-full h-full object-cover"
                        onError={() =>
                          setImageErrors((prev) => ({
                            ...prev,
                            [t.slug]: true,
                          }))
                        }
                      />
                    ) : (
                      <icons.photoGallery className="h-40 w-40 p-4 text-muted-foreground/20" />
                    )}
                  </Link>
                </div>
                <div className="p-2 text-xs font-inter tracking-wider text-center leading-5 uppercase">
                  {t.title}
                </div>
              </div>
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
export default SpwPhotoGalleries;
