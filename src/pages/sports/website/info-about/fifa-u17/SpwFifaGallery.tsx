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

import { Link, useParams } from 'react-router-dom';
import { useFetchFifaGalleryWb } from '@/tanstack/sports/info-about/info-about.query';
import type { IFifaGalleryRow } from '@/interface/sports.interface';
import {
  SpwPageBanner,
  SpwParagraphWrapper,
  SpwSectionWrapper,
  WbLoader,
} from '@/components';
import { ucwords } from '@/utils/functions';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { titles, icons } from '@/constants';
import { useRef, useState } from 'react';

const SpwFifaGallery = () => {
  const { slug } = useParams();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const { data, isLoading } = useFetchFifaGalleryWb(slug!) as {
    data: IFifaGalleryRow;
    isLoading: boolean;
  };
  const photos = data?.photos ?? [];

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
        title={data?.name ? ucwords(data?.name) : `Images loading ...`}
      />
      <SpwSectionWrapper className="max-w-7xl mx-auto mb-4 md:mb-8 gap-8 min-h-80">
        {isLoading && <WbLoader />}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="text-primary/70 tracking-normal md:tracking-wider text-xs md:text-sm font-medium font-roboto hover:text-primary/50">
              <Link to={`${titles.SPORTS_WEB_URL}/fifa-u17-wc`}>
                FIFA U-17 World Cup
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-primary tracking-normal md:tracking-wider text-xs md:text-sm font-medium font-roboto">
              {data?.name}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8 mt-8">
          {data?.description && (
            <>
              <div className="grid-cols-2 md:grid-cols-4 mb-4 text-justify [text-align-last:center]">
                <p>{data?.description}</p>
              </div>
            </>
          )}
          {photos?.map((img, i) => {
            const hasImage = img.image_path && !imageErrors[data.slug];

            return hasImage ? (
              <div key={img.id} className="col-span-1">
                <img
                  src={`${titles.BASE_URL}${img.image_path}`}
                  alt={data?.name}
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
export default SpwFifaGallery;
