import { SpwPageBanner, SpwSectionWrapper } from '@/components';
import { titles } from '@/constants';
import { content } from './lookup';
import SportCard from './SportCard';

const SpwSportsInBengal = () => {
  document.title = `Sports in Bengal | ${titles.SPORTS_APP_NAME}`;

  return (
    <>
      <SpwPageBanner title="Sports in Bengal" />
      <SpwSectionWrapper className="max-w-7xl mx-auto flex flex-col gap-8 min-h-80">
        {content.map((c) => (
          <SportCard key={c.id} text={c.paragraph} />
        ))}
      </SpwSectionWrapper>
    </>
  );
};
export default SpwSportsInBengal;
