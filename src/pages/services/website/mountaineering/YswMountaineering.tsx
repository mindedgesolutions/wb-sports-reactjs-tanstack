import { YswPageBanner } from '@/components';
import { useYswPageSetup } from '@/hooks/use-ysw-page-setup';

const YswMountaineering = () => {
  const setup = useYswPageSetup(`Mountaineering`);

  if (setup.isError) console.log(setup.error);

  const banner = {
    data: setup.data?.data,
  };

  return (
    <>
      <YswPageBanner
        title="Mountaineering"
        subtitle="The official portal of the Government of West Bengal"
        {...banner}
      />
      YswMountaineering
    </>
  );
};
export default YswMountaineering;
