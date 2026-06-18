import {
  SpwPageBanner,
  SpwParagraphWrapper,
  SpwSectionWrapper,
  WbLoader,
} from '@/components';
import { titles } from '@/constants';
import type { IStadiumSingle } from '@/interface/sports.interface';
import { useFetchStadiumWb } from '@/tanstack/sports/info-about/info-about.query';
import { ucwords } from '@/utils/functions';
import { Link, useParams } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const SpwStadium = () => {
  const { slug } = useParams();
  const { data, isLoading } = useFetchStadiumWb({ slug: slug! }) as {
    data: IStadiumSingle;
    isLoading: boolean;
  };
  document.title = `${(data?.name && ucwords(data?.name)) || 'Stadium'} | ${titles.SPORTS_APP_NAME}`;
  const title = data?.name || 'Stadium details loading ...';

  return (
    <>
      <SpwPageBanner title={title} />
      <SpwSectionWrapper className="max-w-7xl mx-auto mb-4 md:mb-8 gap-8 min-h-80">
        {isLoading && <WbLoader />}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="text-primary/70 tracking-normal md:tracking-wider text-xs md:text-sm font-medium font-inter hover:text-primary/50">
              <Link to={`${titles.SPORTS_WEB_URL}/stadiums`}>STADIUMS</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-primary tracking-normal md:tracking-wider text-xs md:text-sm font-medium font-inter">
              {data?.name}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <SpwParagraphWrapper className="mt-8">
          {!data?.stadium_details?.description ? (
            <span>We will add more details soon!</span>
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: data?.stadium_details?.description,
              }}
            />
          )}
        </SpwParagraphWrapper>
        <SpwParagraphWrapper>
          {data?.stadium_highlights && data?.stadium_highlights?.length > 0 && (
            <>
              <div className="mt-8">
                <h1 className="text-primary text-lg font-medium uppercase tracking-wider mb-4">
                  Highlights
                </h1>
                <ol className="list-disc text-sm md:text-base list-inside md:list-outside marker:text-primary marker:text-lg md:marker:text-2xl text-justify">
                  {data?.stadium_highlights.map((highlight, index: number) => (
                    <li
                      key={index}
                      className="mb-2 md:mb-4 last-of-type:mb-0 ml-0 md:ml-4 text-xs md:text-sm font-inter"
                    >
                      {highlight.title}
                    </li>
                  ))}
                </ol>
              </div>
            </>
          )}
          {data?.stadium_images && data?.stadium_images?.length > 0 && (
            <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 mt-8">
              {data?.stadium_images.map((img) => (
                <div key={img.image_path} className="max-w-40 max-h-40">
                  <img
                    src={`${titles.BASE_URL}${img.image_path}`}
                    alt={img.image_path}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </SpwParagraphWrapper>
      </SpwSectionWrapper>
    </>
  );
};
export default SpwStadium;
