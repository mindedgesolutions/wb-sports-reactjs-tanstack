import {
  SpwPageBanner,
  SpwParagraphWrapper,
  SpwSectionWrapper,
  WbLoader,
} from '@/components';
import { titles, icons } from '@/constants';
import type { IPhotoGallerySingle } from '@/interface/sports.interface';
import { useMomentsPhotoGallery } from '@/tanstack/sports/moments/moments.query';
import { ucwords } from '@/utils/functions';
import { Link, useParams } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

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
import { useRef, useState } from 'react';

const SpwPhotoGallery = () => {
  const { slug } = useParams();

  const { data, isLoading } = useMomentsPhotoGallery(slug!) as {
    data: IPhotoGallerySingle;
    isLoading: boolean;
  };
  document.title = `${data?.title ? ucwords(data.title) : `Photo Gallery`} | ${titles.SPORTS_APP_NAME}`;

  const photos = data?.photos ?? [];

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
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

  photos?.map((img) => {
    const src = `${titles.BASE_URL}${img.image_path}`;
    originals.push({ src: src });
  });

  return (
    <>
      <SpwPageBanner
        title={data?.title ? ucwords(data.title) : `Images loading ...`}
      />
      <SpwSectionWrapper className="max-w-7xl mx-auto mb-4 md:mb-8 gap-8 min-h-80">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="text-primary/70 tracking-normal md:tracking-wider text-xs md:text-sm font-medium font-roboto hover:text-primary/50 uppercase">
              <Link to={`${titles.SPORTS_WEB_URL}/photo-galleries`}>
                Photo Galleries
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-primary tracking-normal md:tracking-wider text-xs md:text-sm font-medium font-roboto uppercase">
              {data?.title}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {isLoading && <WbLoader />}
        {data && photos?.length === 0 && (
          <SpwParagraphWrapper className="mt-8">
            We will add images soon ...
          </SpwParagraphWrapper>
        )}
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8 mt-8">
          {data?.description && (
            <div className="col-span-1 md:col-span-4">
              <SpwParagraphWrapper className="text-justify [text-align-last:center]">
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.description,
                  }}
                />
              </SpwParagraphWrapper>
            </div>
          )}
          {photos?.map((img, i) => {
            const hasImage = img.image_path && !imageErrors[data.slug];

            return hasImage ? (
              <div key={img.id} className="col-span-1">
                <img
                  src={`${titles.BASE_URL}${img.image_path}`}
                  alt={data?.title}
                  className="w-full h-full max-h-44 rounded-xs cursor-pointer overflow-hidden object-cover"
                  onClick={() => handleOpen(i)}
                  onError={() =>
                    setImageErrors((prev) => ({
                      ...prev,
                      [data.slug]: true,
                    }))
                  }
                />
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <icons.football className="h-32 w-32 text-muted-foreground/20" />
                <span className="text-xs font-roboto tracking-wider mt-4">{`<File missing>`}</span>
              </div>
            );
          })}
        </div>
      </SpwSectionWrapper>
    </>
  );
};
export default SpwPhotoGallery;
