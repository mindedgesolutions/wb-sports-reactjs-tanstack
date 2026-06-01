import {
  SpwPageBanner,
  SpwParagraphWrapper,
  SpwSectionTitleWrapper,
  SpwSectionWrapper,
} from '@/components';
import { titles } from '@/constants';
import { data } from './lookup';

const SpwSportsInfrastructure = () => {
  document.title = `Sports Infrastructure | ${titles.SPORTS_APP_NAME}`;

  return (
    <>
      <SpwPageBanner title="Sports Infrastructure" />
      <SpwSectionWrapper className="max-w-7xl mx-auto">
        <SpwParagraphWrapper className="mb-8 [text-align-last:center] md:[text-align-last:left]">
          State-level sports infrastructure involves forming facilities that can
          support competitive training, talent development, and hosting of
          district, zonal, and state-level competitions. These infrastructures
          should be capable of accommodating a wide range of sports disciplines
          and athletes, from grassroots to top levels.
        </SpwParagraphWrapper>
        {data.map((t) => (
          <SpwSectionWrapper key={t.id} className="px-0 md:px-0 -mt-6">
            <SpwSectionTitleWrapper
              title={t.title}
              className="-mb-4 md:mb-0 text-center md:text-left"
            />
            <SpwParagraphWrapper className="mb-4 md:mb-0">
              <ol className="list-disc list-inside md:list-outside marker:text-primary marker:text-sm md:marker:text-2xl">
                {t.points.map((p) => (
                  <li
                    key={p.id}
                    className="mb-4 text-xs md:text-sm font-roboto tracking-normal md:tracking-wider leading-normal md:leading-relaxed text-justify last-of-type:mb-0 ml-0 md:ml-4"
                  >
                    {p.description}
                  </li>
                ))}
              </ol>
            </SpwParagraphWrapper>
          </SpwSectionWrapper>
        ))}
      </SpwSectionWrapper>
    </>
  );
};
export default SpwSportsInfrastructure;
