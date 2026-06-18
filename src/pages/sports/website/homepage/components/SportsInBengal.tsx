import {
  SpwParagraphWrapper,
  SpwSectionTitleWrapper,
  SpwSectionWrapper,
} from '@/components';
import { Button } from '@/components/ui/button';
import NewsScroller from './NewsScroller';

const SportsInBengal = () => {
  return (
    <SpwSectionWrapper className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 py-4 md:py-8 -mt-4 md:mt-0">
        <div className="col-span-1">
          <SpwSectionTitleWrapper
            title="Sports in Bengal"
            className="text-card-foreground text-center md:text-left"
          />
          <SpwParagraphWrapper className="mb-8 text-justify [text-align-last:center] md:[text-align-last:left]">
            Bengal's sports culture is vibrant, despite of absence of
            world-class performance by participants. It's the love for sports
            and games among the people that creates this vibrancy. That love may
            remain unrewarded with trophies, yet ardent passion for sports
            continues unabated.
          </SpwParagraphWrapper>
          <SpwParagraphWrapper className="mb-8 text-justify [text-align-last:center] md:[text-align-last:left]">
            Kolkata (Calcutta) can easily draw in more than 100,000 spectators
            to even a domestic soccer encounter whereas even international
            football elsewhere will find it difficult to duplicate that kind of
            passion for a match ...
          </SpwParagraphWrapper>
          <div className="flex justify-center md:justify-start">
            <Button
              size={'lg'}
              className="rounded-none text-xs text-primary-foreground"
            >
              Read More
            </Button>
          </div>
        </div>
        <NewsScroller />
      </div>
    </SpwSectionWrapper>
  );
};
export default SportsInBengal;
