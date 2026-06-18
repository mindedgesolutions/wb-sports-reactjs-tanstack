import {
  SpwPageBanner,
  SpwParagraphWrapper,
  SpwSectionTitleWrapper,
  SpwSectionWrapper,
} from '@/components';
import { titles } from '@/constants';
import { data } from './lookup';
import CategoryModal from './CategoryModal';

type SportsDetailsProps = {
  id: string;
  title: string;
  para1: string;
  para2?: string;
  para3?: string;
  para4?: string;
  sport: string;
  image1: string;
  image2?: string;
};

type SportsCategoryProps = {
  id: number;
  title: string;
  image: string;
  shortDescription: string;
  details: SportsDetailsProps;
};

const SpwSportsCategories = () => {
  document.title = `Sports Categories | ${titles.SPORTS_APP_NAME}`;

  return (
    <>
      <SpwPageBanner title="Sports Categories" />
      <SpwSectionWrapper className="max-w-7xl mx-auto mb-4 md:mb-8 gap-8">
        <div className="flex flex-col gap-16">
          {data.map((t: SportsCategoryProps) => (
            <div
              key={t.id}
              className="flex flex-col md:flex-row justify-center items-center gap-8 p-1"
            >
              <img
                src={t.image}
                alt={t.title}
                className="w-44 h-44 object-cover"
              />
              <div className="flex flex-col pr-2">
                <SpwSectionTitleWrapper
                  title={t.title}
                  className="text-center md:text-start"
                />
                <SpwParagraphWrapper className="-mt-2 [text-align-last:center] md:[text-align-last:left]">
                  {t.shortDescription.slice(0, 350) + ` ...`}
                </SpwParagraphWrapper>
                <span className="w-full text-center md:text-start">
                  <CategoryModal key={t.details.id} {...t.details} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </SpwSectionWrapper>
    </>
  );
};
export default SpwSportsCategories;
