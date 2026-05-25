import { WbSliderPlaceholder, WbTopImageSlider } from '@/components';
import Mentions from './components/Mentions';
import Introduction from './components/Introduction';
import SportsInBengal from './components/SportsInBengal';
import { titles } from '@/constants';
import { useHomepageSliderWeb } from '@/tanstack/sports/homepage-sliders/homepage-sliders.query';
import type { IHomepageSliderRow } from '@/interface/sports.interface';
import { useGetPhotoGalleryWb } from '@/tanstack/sports/moments/moments.query';
import VisionMission from './components/VisionMission';
import ImageScroller from './components/ImageScroller';

const SpwLanding = () => {
  document.title = `Home | ${titles.SPORTS_APP_NAME}`;

  const { data: sliders, isLoading: sliderLoading } = useHomepageSliderWeb();
  const imagePaths: { id: number; path: string }[] = [];
  sliders?.map((slider: IHomepageSliderRow) =>
    imagePaths.push({ id: slider.id, path: slider.image_path }),
  );
  const { data: visionMissionImages } = useGetPhotoGalleryWb(4);
  const { data: thumbnails } = useGetPhotoGalleryWb(8);

  return (
    <div>
      {sliderLoading ? (
        <WbSliderPlaceholder />
      ) : (
        <WbTopImageSlider slides={imagePaths} />
      )}
      <Mentions />
      <Introduction />
      <SportsInBengal />
      {thumbnails && <ImageScroller thumbnails={thumbnails} />}
      <VisionMission images={visionMissionImages} />
    </div>
  );
};
export default SpwLanding;
