import { SpwPageBanner, SpwSectionWrapper, WbLoader } from '@/components';
import { titles } from '@/constants';
import type { IAdminStructureRow } from '@/interface/sports.interface';
import { useAdminStructureAllWb } from '@/tanstack/sports/about-us/about-us.query';
import { PiArrowDownBold } from 'react-icons/pi';

const SpwAdminStructure = () => {
  document.title = `Administrative Structure | ${titles.SPORTS_APP_NAME}`;

  const { data, isLoading } = useAdminStructureAllWb() as {
    data: IAdminStructureRow[];
    isLoading: boolean;
  };

  return (
    <>
      <SpwPageBanner title="Administrative Structure" />
      {isLoading ? (
        <WbLoader />
      ) : (
        <>
          <SpwSectionWrapper className="max-w-7xl mx-auto">
            <div className="flex flex-col justify-center items-center text-center gap-1">
              {data.map((t: IAdminStructureRow, index: number) => {
                return (
                  <div
                    key={t.show_order}
                    className="flex flex-col items-center"
                  >
                    <section className="p-4 min-w-48 bg-primary dark:bg-card text-primary-foreground font-inter text-xs tracking-wider">
                      {t.designation}
                    </section>
                    {index !== data.length - 1 && (
                      <PiArrowDownBold className="text-primary" />
                    )}
                  </div>
                );
              })}
            </div>
          </SpwSectionWrapper>
        </>
      )}
    </>
  );
};
export default SpwAdminStructure;
