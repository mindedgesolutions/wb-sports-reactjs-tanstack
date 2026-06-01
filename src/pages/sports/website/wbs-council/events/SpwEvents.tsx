import { SpwPageBanner } from '@/components';
import { titles } from '@/constants';
import { content } from './lookup';
import EventCard from './EventCard';

const SpwEvents = () => {
  document.title = `Events | ${titles.SPORTS_APP_NAME}`;

  return (
    <>
      <SpwPageBanner title="Events" />
      {content.map((c) => (
        <EventCard key={c.id} icon={c.icon} title={c.title} text={c.text} />
      ))}
    </>
  );
};
export default SpwEvents;
