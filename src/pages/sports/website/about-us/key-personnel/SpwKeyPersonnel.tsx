import { SpwPageBanner } from '@/components';
import { titles } from '@/constants';

const SpwKeyPersonnel = () => {
  document.title = `Key Personnel | ${titles.SPORTS_APP_NAME}`;

  return (
    <>
      <SpwPageBanner title="Key Personnel" />
      SpwKeyPersonnel
    </>
  );
};
export default SpwKeyPersonnel;
