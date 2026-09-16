import { YswPageBanner } from '@/components';
import { useYswPageSetup } from '@/hooks/use-ysw-page-setup';

const YswAddressDepartment = () => {
  const setup = useYswPageSetup(`Address of Department / Director`);

  if (setup.isError) console.log(setup.error);

  const banner = {
    data: setup.data?.data,
  };
  return (
    <>
      <YswPageBanner
        title="Address of Department / Director"
        subtitle="The official portal of the Government of West Bengal"
        {...banner}
      />
      YswAddressDepartment
    </>
  );
};
export default YswAddressDepartment;
