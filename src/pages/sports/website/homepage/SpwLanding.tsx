import {
  SpwSectionTitleWrapper,
  SpwSectionWrapper,
  WbTopImageSlider,
} from '@/components';
import Mentions from './Mentions';
import Introduction from './Introduction';
import SportsInBengal from './SportsInBengal';
import { titles } from '@/constants';
import { useHomepageSliderWeb } from '@/tanstack/sports/homepage-sliders/homepage-sliders.query';
import type { IHomepageSliderRow } from '@/interface/sports.interface';

const SpwLanding = () => {
  document.title = `Home | ${titles.SPORTS_APP_NAME}`;

  const { data: sliders } = useHomepageSliderWeb();
  const imagePaths: { id: number; path: string }[] = [];
  sliders?.map((slider: IHomepageSliderRow) =>
    imagePaths.push({ id: slider.id, path: slider.image_path }),
  );

  return (
    <div>
      {sliders && <WbTopImageSlider slides={imagePaths} />}
      <Mentions />
      <Introduction />
      <SportsInBengal />
      <div className="bg-muted-foreground/15">
        <SpwSectionWrapper className="max-w-7xl mx-auto">
          <div className="flex gap-16 py-8">
            <div className="col-span-1">
              <SpwSectionTitleWrapper
                title="Sports in Bengal"
                className="text-card-foreground"
              />
            </div>
          </div>
        </SpwSectionWrapper>
      </div>
    </div>
  );
};
export default SpwLanding;
