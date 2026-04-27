import { AppBodyWrapper, AppTitleWrapper } from '@/components';
import { titles } from '@/constants';

const SpaGudingPrinciples = () => {
  document.title = `Guiding Principles | ${titles.SPORTS_APP_NAME}`;

  return (
    <>
      <AppTitleWrapper title="Guiding Principles" />
      <AppBodyWrapper>
        <span className="text-xs tracking-wider">This is a static page</span>
      </AppBodyWrapper>
    </>
  );
};
export default SpaGudingPrinciples;
