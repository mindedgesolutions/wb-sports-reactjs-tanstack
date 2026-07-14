import { AppBodyWrapper, AppTitleWrapper } from '@/components';
import { titles } from '@/constants';

const YsaHowToBook = () => {
  document.title = `How to Book Youth Hostel | ${titles.SERVICES_APP_NAME}`;

  return (
    <>
      <AppTitleWrapper title="How to Book Youth Hostel" />
      <AppBodyWrapper>
        <span className="text-xs tracking-wider">This is a static page</span>
      </AppBodyWrapper>
    </>
  );
};
export default YsaHowToBook;
