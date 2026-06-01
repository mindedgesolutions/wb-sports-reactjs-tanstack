import {
  SpwPageBanner,
  SpwParagraphWrapper,
  SpwSectionTitleWrapper,
  SpwSectionWrapper,
} from '@/components';
import { titles } from '@/constants';

const SpwVisionMission = () => {
  document.title = `Vision & Mission | ${titles.SPORTS_APP_NAME}`;

  return (
    <>
      <SpwPageBanner title="Vision & Mission" />
      <SpwSectionWrapper className="max-w-7xl mx-auto mb-4 md:mb-8 flex flex-col gap-8 min-h-80">
        <section>
          <SpwSectionTitleWrapper
            title="Vision"
            className="text-center md:text-left"
          />
          <SpwParagraphWrapper className="[text-align-last:center] md:[text-align-last:left]">
            New possibilities in sports by offering a professional setting that
            equips youth with knowledge, skills, and life skills to develop
            their minds and strengthen the basis of their future.
          </SpwParagraphWrapper>
        </section>
        <section>
          <SpwSectionTitleWrapper
            title="Mission"
            className="text-center md:text-left"
          />
          <SpwParagraphWrapper className="[text-align-last:center] md:[text-align-last:left]">
            New possibilities in sports by offering a professional setting that
            equips youth with knowledge, skills, and life skills to develop
            their minds and strengthen the basis of their future.
          </SpwParagraphWrapper>
        </section>
      </SpwSectionWrapper>
    </>
  );
};
export default SpwVisionMission;
