import {
  SpwPageBanner,
  SpwParagraphWrapper,
  SpwSectionTitleWrapper,
  SpwSectionWrapper,
} from '@/components';
import { titles } from '@/constants';
import { data } from './components/lookup';
import { Button } from '@/components/ui/button';

const SpwSportsCategories = () => {
  document.title = `Sports Categories | ${titles.SPORTS_APP_NAME}`;

  return (
    <>
      <SpwPageBanner title="Sports Categories" />
      <SpwSectionWrapper className="max-w-7xl mx-auto mb-4 md:mb-8 gap-8">
        <div className="flex flex-col gap-16">
          {data.map((t) => (
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
                <SpwParagraphWrapper className="-mt-6 [text-align-last:center] md:[text-align-last:left]">
                  {t.shortDescription.slice(0, 350) + ` ...`}
                </SpwParagraphWrapper>
                <span className="w-full text-center md:text-start">
                  <Button
                    size={'sm'}
                    className="mt-8 rounded-none text-xs text-primary-foreground"
                  >
                    Read More
                  </Button>
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
