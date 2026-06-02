import { SpwPageBanner, SpwSectionWrapper, WbLoader } from '@/components';
import { titles } from '@/constants';
import type { IAwardRow } from '@/interface/sports.interface';
import { useAwardsWb } from '@/tanstack/sports/achievements-awards/achievements-awards.query';
import { handleFileOpen } from '@/utils/functions';
import { useState } from 'react';

const SpwAwards = () => {
  document.title = `Awards | ${titles.SPORTS_APP_NAME}`;

  const { data, isLoading } = useAwardsWb() as {
    data: IAwardRow[];
    isLoading: boolean;
  };
  const [selectedAward, setSelectedAward] = useState<string>(data?.[0].slug);

  return (
    <>
      <SpwPageBanner title="Awards" />
      <SpwSectionWrapper className="mb-4 md:mb-8 gap-8 min-h-80">
        {isLoading && <WbLoader />}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-2">
          {data?.map((t) => {
            const isSelected = selectedAward === t.slug;
            return (
              <div
                key={t.slug}
                className={`
                  col-span-1 p-4 border cursor-pointer text-xs font-medium text-center uppercase tracking-wider flex justify-center items-center
                  ${isSelected ? 'border-primary bg-primary text-primary-foreground font-medium' : 'border'}
                `}
                onClick={() => {
                  (setSelectedAward(t.slug),
                    handleFileOpen(t.file_path, t.file_name));
                }}
              >
                {t.name}
              </div>
            );
          })}
        </div>
      </SpwSectionWrapper>
    </>
  );
};
export default SpwAwards;
