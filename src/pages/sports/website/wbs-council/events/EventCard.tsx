import {
  SpwParagraphWrapper,
  SpwSectionTitleWrapper,
  SpwSectionWrapper,
} from '@/components';
import type { ElementType } from 'react';

type Paragraph = {
  paragraph: string;
};

type CardProps = {
  icon: ElementType;
  title: string;
  text: Paragraph[];
};

const EventCard = ({ icon: Icon, title, text }: CardProps) => {
  return (
    <>
      <SpwSectionWrapper className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-8">
          <div className="col-span-1 w-full flex justify-center md:justify-start items-center md:items-start mb-4 md:mb-0">
            <Icon className="w-full h-32 md:h-40 text-primary" />
          </div>
          <div className="col-span-4 flex flex-col justify-center md:justify-start items-center md:items-start">
            <SpwSectionTitleWrapper
              title={title}
              className="text-center md:text-left -mb-4 md:mb-0"
            />
            <div className="flex flex-col gap-4 md:gap-8">
              {text.map((p) => (
                <SpwParagraphWrapper
                  key={p.paragraph}
                  className="[text-align-last:center] md:[text-align-last:left]"
                >
                  {p.paragraph}
                </SpwParagraphWrapper>
              ))}
            </div>
          </div>
        </div>
      </SpwSectionWrapper>
    </>
  );
};
export default EventCard;
