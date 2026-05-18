import {
  SpwSectionTitleWrapper,
  SpwSectionWrapper,
  WbTopImageSlider,
} from '@/components';
import Mentions from './Mentions';
import Introduction from './Introduction';
import SportsInBengal from './SportsInBengal';

const SpwLanding = () => {
  // const imgArr = Array.from({ length: 4 }, (_, i) => i + 4);

  return (
    <div>
      <WbTopImageSlider />
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
