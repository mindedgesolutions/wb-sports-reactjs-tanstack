import { AppBodyWrapper, AppTitleWrapper } from '@/components';
import { titles } from '@/constants';

const SpaDashboard = () => {
  document.title = `Admin Dashboard | ${titles.SPORTS_APP_NAME}`;

  return (
    <>
      <AppTitleWrapper title="Admin Dashboard" />
      <AppBodyWrapper>
        <span className="text-xs tracking-wider">This is admin dashboard</span>
      </AppBodyWrapper>
    </>
  );
};
export default SpaDashboard;
