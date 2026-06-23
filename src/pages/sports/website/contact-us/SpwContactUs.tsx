import { SpwPageBanner, SpwSectionWrapper, WbLoader } from '@/components';
import { titles } from '@/constants';
import { useContactUsAllWb } from '@/tanstack/sports/contact-us/contact-us.query';
import PersonCard from './PersonCard';
import type { IContactUsRow } from '@/interface/sports.interface';

const SpwContactUs = () => {
  document.title = `Contact Us | ${titles.SPORTS_APP_NAME}`;

  const { data, isLoading } = useContactUsAllWb() as {
    data: IContactUsRow[];
    isLoading: boolean;
  };

  return (
    <>
      <SpwPageBanner title="Contact Us" />
      {isLoading ? (
        <WbLoader />
      ) : (
        <SpwSectionWrapper className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-y-12 mt-4 md:mt-8">
            {data.map((t: IContactUsRow) => {
              return <PersonCard key={t.id} {...t} />;
            })}
          </div>
        </SpwSectionWrapper>
      )}
    </>
  );
};
export default SpwContactUs;
