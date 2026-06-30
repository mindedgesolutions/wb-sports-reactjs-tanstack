import { AppBodyWrapper, AppTitleWrapper } from '@/components';
import { titles } from '@/constants';

const YsaAboutDepartment = () => {
  document.title = `About the Department | ${titles.SERVICES_APP_NAME}`;

  return (
    <>
      <AppTitleWrapper title="About the Department" />
      <AppBodyWrapper>
        <span className="text-xs tracking-wider">This is a static page</span>
      </AppBodyWrapper>
    </>
  );
};
export default YsaAboutDepartment;
