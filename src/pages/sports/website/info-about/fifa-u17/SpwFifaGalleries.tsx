import { SpwPageBanner, SpwSectionWrapper, WbLoader } from '@/components';
import { titles, icons } from '@/constants';
import type { IFifaGalleryRow } from '@/interface/sports.interface';
import { useFifaGalleriesWb } from '@/tanstack/sports/info-about/info-about.query';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SpwFifaGalleries = () => {
  document.title = `FIFA U-17 World Cup | ${titles.SPORTS_APP_NAME}`;
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const { data, isLoading } = useFifaGalleriesWb();

  return (
    <>
      <SpwPageBanner title="FIFA U-17 World Cup" />
      <SpwSectionWrapper className="max-w-7xl mx-auto mb-4 md:mb-8 gap-8 min-h-80">
        {isLoading && <WbLoader />}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {data?.map((gallery: IFifaGalleryRow) => {
            const hasImage =
              gallery.first_photo?.image_path && !imageErrors[gallery.slug];

            return (
              <Link
                key={gallery.slug}
                to={`${titles.SPORTS_WEB_URL}/fifa-gallery/${gallery.slug}`}
                className="col-span-1 flex flex-col justify-center items-center gap-2 p-2 bg-muted"
              >
                {hasImage ? (
                  <img
                    src={`${titles.BASE_URL}${gallery?.first_photo?.image_path}`}
                    alt={gallery.name}
                    className="w-full h-full object-cover"
                    onError={() =>
                      setImageErrors((prev) => ({
                        ...prev,
                        [gallery.slug]: true,
                      }))
                    }
                  />
                ) : (
                  <icons.football className="h-full w-full p-8 text-muted-foreground/20" />
                )}
                <h1 className="text-xs font-inter font-normal md:font-medium text-center tracking-widest md:uppercase">
                  {gallery.name}
                </h1>
              </Link>
            );
          })}
        </div>
      </SpwSectionWrapper>
    </>
  );
};
export default SpwFifaGalleries;
