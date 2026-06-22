import { SpwMentionCard, SpwSectionWrapper } from '@/components';
import { homepageMentions } from '@/constants';

const Mentions = () => {
  return (
    <SpwSectionWrapper className="-mt-12 md:-mt-8 mb-0">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16">
        {homepageMentions
          .filter((p) => p.cm === true)
          .map((mention) => (
            <SpwMentionCard key={mention.designation} mention={mention} />
          ))}
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-64 mt-0 md:-mt-28">
        {homepageMentions
          .filter((p) => p.cm === false)
          .map((mention) => (
            <SpwMentionCard key={mention.designation} mention={mention} />
          ))}
      </div>
    </SpwSectionWrapper>
  );
};
export default Mentions;
