import { SpwPageBanner } from '@/components';
import { titles } from '@/constants';

const SpwAchievements = () => {
  document.title = `Achievements | ${titles.SPORTS_APP_NAME}`;

  return (
    <>
      <SpwPageBanner title="Achievements" />
      SpwAchievements
    </>
  );
};
export default SpwAchievements;
