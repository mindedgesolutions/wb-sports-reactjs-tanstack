import { AppBodyWrapper, AppTitleWrapper } from '@/components';
import { titles } from '@/constants';

const SpaSportsInfrastructure = () => {
  document.title = `Sports Infrastructure | ${titles.SPORTS_APP_NAME}`;

  return (
    <div>
      <AppTitleWrapper title="Sports Infrastructure" />
      <AppBodyWrapper>
        <span className="text-xs tracking-wider">This is a static page</span>
      </AppBodyWrapper>
    </div>
  );
};
export default SpaSportsInfrastructure;
