import { SpwMentionCard, SpwSectionWrapper } from '@/components';
import { homepageMentions } from '@/constants';

const Mentions = () => {
  return (
    <SpwSectionWrapper className="-mt-4 mb-4">
      <div className="flex justify-center items-center gap-16">
        {homepageMentions.map((mention: IHomepageMention) => (
          <SpwMentionCard key={mention.name} mention={mention} />
        ))}
      </div>
    </SpwSectionWrapper>
  );
};
export default Mentions;
