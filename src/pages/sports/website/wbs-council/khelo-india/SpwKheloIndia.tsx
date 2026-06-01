import {
  SpwPageBanner,
  SpwParagraphWrapper,
  SpwSectionTitleWrapper,
  SpwSectionWrapper,
} from '@/components';
import { titles } from '@/constants';

const SpwKheloIndia = () => {
  document.title = `Khelo India | ${titles.SPORTS_APP_NAME}`;

  return (
    <>
      <SpwPageBanner title="Khelo India" />
      <SpwSectionWrapper className="max-w-7xl mx-auto mb-4 md:mb-8 flex flex-col gap-8 min-h-80">
        <section>
          <SpwSectionTitleWrapper
            title="introduction"
            className="text-center md:text-left"
          />
          <SpwParagraphWrapper className="[text-align-last:center] md:[text-align-last:left]">
            Khelo India is a flagship programme of the Government of India aimed
            at promoting sports culture, increasing mass participation, and
            nurturing young sporting talent through improved infrastructure and
            structured training.
          </SpwParagraphWrapper>
        </section>
        <section>
          <SpwSectionTitleWrapper
            title="objective"
            className="text-center md:text-left"
          />
          <SpwParagraphWrapper className="[text-align-last:center] md:[text-align-last:left]">
            Its main objective is to build a strong sports ecosystem by
            identifying talented athletes, encouraging youth involvement in
            sports, and preparing them for national and international
            competitions.
          </SpwParagraphWrapper>
        </section>
        <section>
          <SpwSectionTitleWrapper
            title="components of the scheme"
            className="text-center md:text-left"
          />
          <SpwParagraphWrapper className="[text-align-last:center] md:[text-align-last:left]">
            Key components include playfield development, community coaching,
            establishment of Khelo India Centres, talent identification and
            scholarships, support to sports academies, sports promotion for
            women, inclusive sports initiatives, conduct of Khelo India
            Youth/University Games, and development of sports infrastructure.
          </SpwParagraphWrapper>
          <SpwParagraphWrapper className="mt-8 [text-align-last:center] md:[text-align-last:left]">
            Key components include playfield development, community coaching,
            establishment of Khelo India Centres, talent identification and
            scholarships, support to sports academies, sports promotion for
            women, inclusive sports initiatives, conduct of Khelo India
            Youth/University Games, and development of sports infrastructure.
          </SpwParagraphWrapper>
        </section>
      </SpwSectionWrapper>
    </>
  );
};
export default SpwKheloIndia;
