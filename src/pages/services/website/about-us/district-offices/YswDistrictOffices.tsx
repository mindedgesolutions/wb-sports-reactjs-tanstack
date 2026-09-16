import { YswPageBanner } from '@/components';
import { useYswPageSetup } from '@/hooks/use-ysw-page-setup';

const YswDistrictOffices = () => {
  const setup = useYswPageSetup(`District / Block Offices`);

  if (setup.isError) console.log(setup.error);

  const banner = {
    data: setup.data?.data,
  };

  return (
    <>
      <YswPageBanner
        title="District / Block Offices"
        subtitle="The official portal of the Government of West Bengal"
        {...banner}
      />
      YswDistrictOffices
    </>
  );
};
export default YswDistrictOffices;
