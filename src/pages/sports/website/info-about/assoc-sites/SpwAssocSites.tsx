import { SpwPageBanner, SpwSectionWrapper, WbLoader } from '@/components';
import { titles } from '@/constants';
import type { IAssocSiteRow } from '@/interface/sports.interface';
import { useAssocSitesWb } from '@/tanstack/sports/info-about/info-about.query';

const SpwAssocSites = () => {
  document.title = `Associated Sites | ${titles.SPORTS_APP_NAME}`;

  const { data, isLoading } = useAssocSitesWb();

  return (
    <>
      <SpwPageBanner title="Associated Sites" />
      <SpwSectionWrapper className="max-w-7xl mx-auto mb-4 md:mb-8 gap-8 min-h-80">
        {isLoading && <WbLoader />}
        <ol className="list-disc text-xs list-inside md:list-outside marker:text-primary marker:text-lg md:marker:text-2xl text-justify">
          {data?.map((site: IAssocSiteRow) => (
            <a
              key={site.id}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-1 last-of-type:mb-0 ml-0 md:ml-4 font-roboto tracking-wider text-justify hover:text-primary"
            >
              <li>{site.title}</li>
            </a>
          ))}
        </ol>
      </SpwSectionWrapper>
    </>
  );
};
export default SpwAssocSites;
