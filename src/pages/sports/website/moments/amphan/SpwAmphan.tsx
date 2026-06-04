import {
  SpwPageBanner,
  SpwParagraphWrapper,
  SpwSectionWrapper,
  WbLoader,
  WbLoadMore,
} from '@/components';
import { titles, icons } from '@/constants';
import type { IAmphanPhotoRow } from '@/interface/sports.interface';
import { useAmphanPhotosWb } from '@/tanstack/sports/moments/moments.query';
import { useEffect, useRef, useState } from 'react';

import Lightbox, {
  type CaptionsRef,
  type ThumbnailsRef,
  type ZoomRef,
} from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/plugins/counter.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/plugins/captions.css';

const SpwAmphan = () => {
  document.title = `Amphan | ${titles.SPORTS_APP_NAME}`;
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useAmphanPhotosWb();

  const rows = data?.pages.flatMap((page) => page.data) ?? [];

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const zoomRef = useRef<ZoomRef>(null);
  const captionsRef = useRef<CaptionsRef>(null);
  const thumbnailsRef = useRef<ThumbnailsRef>(null);
  const originals = [] as any[];

  const handleOpen = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  rows?.map((img: IAmphanPhotoRow) => {
    const src = `${titles.BASE_URL}${img.image_path}`;
    originals.push({ src: src });
  });

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
      <SpwPageBanner title="Amphan" />
      <SpwSectionWrapper className="max-w-7xl mx-auto mb-4 md:mb-8 gap-8 min-h-80">
        {isLoading && <WbLoader />}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-8">
          <Lightbox
            index={index}
            plugins={[Captions, Fullscreen, Counter, Zoom, Thumbnails]}
            captions={{ ref: captionsRef }}
            counter={{ container: { style: { top: 'unset', bottom: 0 } } }}
            zoom={{ ref: zoomRef }}
            thumbnails={{ ref: thumbnailsRef }}
            on={{
              click: () => {
                (captionsRef.current?.visible
                  ? captionsRef.current?.hide
                  : captionsRef.current?.show)?.();
                (thumbnailsRef.current!.visible
                  ? thumbnailsRef.current!.hide
                  : thumbnailsRef.current?.show)?.();
              },
            }}
            open={open}
            close={() => setOpen(false)}
            slides={originals}
          />
          {rows?.map((img: IAmphanPhotoRow, i: number) => {
            const hasImage = img.image_path && !imageErrors[img.image_path];

            return hasImage ? (
              <div key={img.id} className="col-span-1">
                <img
                  src={`${titles.BASE_URL}${img.image_path}`}
                  alt={img?.title}
                  className="w-full h-full max-h-44 rounded-xs cursor-pointer overflow-hidden object-cover"
                  onClick={() => handleOpen(i)}
                  onError={() =>
                    setImageErrors((prev) => ({
                      ...prev,
                      [img.image_path]: true,
                    }))
                  }
                />
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <icons.amphan className="h-32 w-32 text-muted-foreground/20" />
                <span className="text-xs font-roboto tracking-wider mt-4">{`<File missing>`}</span>
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
export default SpwAmphan;
