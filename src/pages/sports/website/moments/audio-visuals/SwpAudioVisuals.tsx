import { SpwPageBanner, SpwSectionWrapper, WbLoader } from '@/components';
import { titles } from '@/constants';
import type { IAudioVisualRow } from '@/interface/sports.interface';
import { useAudioVisualsWb } from '@/tanstack/sports/moments/moments.query';
import { getYoutubeVideoId } from '@/utils/functions';

const SwpAudioVisuals = () => {
  document.title = `Audio Visuals | ${titles.SPORTS_APP_NAME}`;

  const { data, isLoading } = useAudioVisualsWb();

  return (
    <>
      <SpwPageBanner title="Audio Visuals" />
      <SpwSectionWrapper className="max-w-7xl mx-auto mb-4 md:mb-8 gap-8 min-h-80">
        {isLoading && <WbLoader />}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8 mt-4">
          {data?.map((t: IAudioVisualRow) => {
            const videoId = getYoutubeVideoId(t.video_link);
            if (!videoId) return null;
            const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

            return (
              <div className="col-span-1 w-full max-h-52 border border-dashed">
                <a href={t.video_link} target="_blank">
                  <img
                    src={thumbnail}
                    alt="YouTube Thumbnail"
                    className="w-full h-44 object-cover"
                  />
                </a>
              </div>
            );
          })}
        </div>
      </SpwSectionWrapper>
    </>
  );
};
export default SwpAudioVisuals;
