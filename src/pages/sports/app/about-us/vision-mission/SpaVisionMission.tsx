import { AppBodyWrapper, AppTitleWrapper } from '@/components';
import { titles } from '@/constants';

const SpaVisionMission = () => {
  document.title = `Vision & Mission | ${titles.SPORTS_APP_NAME}`;

  return (
    <>
      <AppTitleWrapper title="Vision & Mission" />
      <AppBodyWrapper>
        <span className="text-xs tracking-wider">This is a static page</span>
      </AppBodyWrapper>
    </>
  );
};
export default SpaVisionMission;
