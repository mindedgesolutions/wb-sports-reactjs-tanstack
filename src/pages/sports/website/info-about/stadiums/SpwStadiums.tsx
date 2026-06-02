import { SpwPageBanner, SpwSectionWrapper, WbLoader } from '@/components';
import { titles } from '@/constants';
import type { IStadiumRow } from '@/interface/sports.interface';
import { useStadiumsWb } from '@/tanstack/sports/info-about/info-about.query';
import StadiumCard from './StadiumCard';
import { Link } from 'react-router-dom';

const SpwStadiums = () => {
  document.title = `Stadiums | ${titles.SPORTS_APP_NAME}`;

  const { data, isLoading } = useStadiumsWb();

  return (
    <>
      <SpwPageBanner title="Stadiums" />
      <SpwSectionWrapper className="max-w-7xl mx-auto mb-4 md:mb-8 gap-8 min-h-80">
        {isLoading && <WbLoader />}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data?.map((st: IStadiumRow) => (
            <Link
              key={st.id}
              to={`${titles.SPORTS_WEB_URL}/stadium/${st.slug}`}
            >
              <StadiumCard {...st} />
            </Link>
          ))}
        </div>
      </SpwSectionWrapper>
    </>
  );
};
export default SpwStadiums;
