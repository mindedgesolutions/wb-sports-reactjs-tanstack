import {
  SpwParagraphWrapper,
  SpwSectionTitleWrapper,
  SpwSectionWrapper,
} from '@/components';
import { Button } from '@/components/ui/button';
import { titles } from '@/constants';
import type { IPhotoRow } from '@/interface/sports.interface';
import { Link } from 'react-router-dom';

const VisionMission = ({ images }: { images: IPhotoRow[] }) => {
  return (
    <SpwSectionWrapper className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 py-4 md:py-8">
        <div className="col-span-1 grid grid-cols-2 gap-2 md:gap-4">
          {images?.map((img: IPhotoRow) => (
            <div className="col-span-1 h-full" key={img.image_path}>
              <img
                src={`${titles.BASE_URL}${img.image_path}`}
                alt=""
                className="w-full h-full max-h-36 object-cover"
              />
            </div>
          ))}
        </div>
        <div className="col-span-1 md:col-span-2">
          <SpwSectionTitleWrapper
            title="Vision & Mission"
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
            passion for ...
          </SpwParagraphWrapper>
          <div className="flex justify-center md:justify-start">
            <Link to={`${titles.SPORTS_WEB_URL}/vision-mission`}>
              <Button
                size={'lg'}
                className="rounded-none text-xs text-primary-foreground"
              >
                Read More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </SpwSectionWrapper>
  );
};
export default VisionMission;
