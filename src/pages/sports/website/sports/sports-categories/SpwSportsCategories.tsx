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
      <SpwSectionWrapper className="max-w-6xl mx-auto mb-4 md:mb-8 gap-8">
        <div className="flex flex-col gap-8">
          {data.map((t) => (
            <div key={t.id} className="flex gap-4 border border-muted p-1">
              <img
                src={t.image}
                alt={t.title}
                className="w-36 h-36 object-cover"
              />
              <div className="flex flex-col">
                <SpwSectionTitleWrapper title={t.title} />
                <SpwParagraphWrapper className="-mt-6">
                  {t.shortDescription.slice(0, 350) + ` ...`}
                </SpwParagraphWrapper>
              </div>
              <Button size={'default'} className="text-xs">
                Read More
              </Button>
            </div>
          ))}
        </div>
      </SpwSectionWrapper>
    </>
  );
};
export default SpwSportsCategories;
