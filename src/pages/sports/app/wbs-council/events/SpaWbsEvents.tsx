import { AppBodyWrapper, AppTitleWrapper } from '@/components';
import { titles } from '@/constants';

const SpaWbsEvents = () => {
  document.title = `Events | ${titles.SPORTS_APP_NAME}`;

  return (
    <div>
      <AppTitleWrapper title="Events" />
      <AppBodyWrapper>
        <span className="text-xs tracking-wider">This is a static page</span>
      </AppBodyWrapper>
    </div>
  );
};
export default SpaWbsEvents;
