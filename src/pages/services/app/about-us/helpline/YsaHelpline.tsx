import { AppBodyWrapper, AppTitleWrapper } from '@/components';
import { titles } from '@/constants';

const YsaHelpline = () => {
  document.title = `Helpline | ${titles.SERVICES_APP_NAME}`;

  return (
    <>
      <AppTitleWrapper title="Helpline" />
      <AppBodyWrapper>
        <span className="text-xs tracking-wider">This is a static page</span>
      </AppBodyWrapper>
    </>
  );
};
export default YsaHelpline;
