import { SpwPageBanner, SpwSectionWrapper, WbLoader } from '@/components';
import { titles } from '@/constants';
import type { IKeyPersonnelRow } from '@/interface/sports.interface';
import { useKeyPersonnelWb } from '@/tanstack/sports/about-us/about-us.query';
import PersonCard from './PersonCard';

const SpwKeyPersonnel = () => {
  document.title = `Key Personnel | ${titles.SPORTS_APP_NAME}`;

  const { data, isLoading } = useKeyPersonnelWb() as {
    data: IKeyPersonnelRow[];
    isLoading: boolean;
  };

  return (
    <>
      <SpwPageBanner title="Key Personnel" />
      {isLoading ? (
        <WbLoader />
      ) : (
        <SpwSectionWrapper className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8 mt-4 md:mt-8">
            {data.map((t) => {
              return <PersonCard key={t.id} {...t} />;
            })}
          </div>
        </SpwSectionWrapper>
      )}
    </>
  );
};
export default SpwKeyPersonnel;
