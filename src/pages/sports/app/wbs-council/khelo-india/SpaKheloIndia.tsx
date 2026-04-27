import { AppBodyWrapper, AppTitleWrapper } from '@/components';
import { titles } from '@/constants';

const SpaKheloIndia = () => {
  document.title = `Khelo India | ${titles.SPORTS_APP_NAME}`;

  return (
    <div>
      <AppTitleWrapper title="Khelo India" />
      <AppBodyWrapper>
        <span className="text-xs tracking-wider">This is a static page</span>
      </AppBodyWrapper>
    </div>
  );
};
export default SpaKheloIndia;
