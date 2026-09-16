import { YswPageBanner } from '@/components';
import { useYswPageSetup } from '@/hooks/use-ysw-page-setup';

const YswNewsEvents = () => {
  const setup = useYswPageSetup(`News & Events`);

  if (setup.isError) console.log(setup.error);

  const banner = {
    data: setup.data?.data,
  };
  return (
    <>
      <YswPageBanner
        title="News & Events"
        subtitle="The official portal of the Government of West Bengal"
        {...banner}
      />
      YswNewsEvents
    </>
  );
};
export default YswNewsEvents;
