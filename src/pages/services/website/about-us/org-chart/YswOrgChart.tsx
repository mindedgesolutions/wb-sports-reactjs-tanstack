import { YswPageBanner } from '@/components';
import { useYswPageSetup } from '@/hooks/use-ysw-page-setup';

const YswOrgChart = () => {
  const setup = useYswPageSetup(`Organisation Chart`);

  if (setup.isError) console.log(setup.error);

  const banner = {
    data: setup.data?.data,
  };

  return (
    <>
      <YswPageBanner
        title="Organisation Chart"
        subtitle="The official portal of the Government of West Bengal"
        {...banner}
      />
      YswOrgChart
    </>
  );
};
export default YswOrgChart;
