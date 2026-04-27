import { AppBodyWrapper, AppTitleWrapper } from '@/components';
import { titles } from '@/constants';

const SpaSportsInBengal = () => {
  document.title = `Sports in Bengal | ${titles.SPORTS_APP_NAME}`;

  return (
    <>
      <AppTitleWrapper title="Sports in Bengal" />
      <AppBodyWrapper>
        <span className="text-xs tracking-wider">This is a static page</span>
      </AppBodyWrapper>
    </>
  );
};
export default SpaSportsInBengal;
