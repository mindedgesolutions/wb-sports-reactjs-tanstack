import { AppBodyWrapper, AppTitleWrapper } from '@/components';
import { titles } from '@/constants';

const YsaAddressDepartment = () => {
  document.title = `Address of Department | ${titles.SERVICES_APP_NAME}`;

  return (
    <>
      <AppTitleWrapper title="Address of Department" />
      <AppBodyWrapper>
        <span className="text-xs tracking-wider">This is a static page</span>
      </AppBodyWrapper>
    </>
  );
};
export default YsaAddressDepartment;
