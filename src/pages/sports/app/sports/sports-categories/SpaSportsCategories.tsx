import { AppBodyWrapper, AppTitleWrapper } from '@/components';
import { titles } from '@/constants';

const SpaSportsCategories = () => {
  document.title = `Sports Categories | ${titles.SPORTS_APP_NAME}`;

  return (
    <div>
      <AppTitleWrapper title="Sports Categories" />
      <AppBodyWrapper>
        <span className="text-xs tracking-wider">This is a static page</span>
      </AppBodyWrapper>
    </div>
  );
};
export default SpaSportsCategories;
