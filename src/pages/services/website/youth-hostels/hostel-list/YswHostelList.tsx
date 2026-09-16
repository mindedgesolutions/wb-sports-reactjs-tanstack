import { YswPageBanner } from '@/components';
import { useYswPageSetup } from '@/hooks/use-ysw-page-setup';

const YswHostelList = () => {
  const setup = useYswPageSetup(`List of the Hostels`);

  if (setup.isError) console.log(setup.error);

  const banner = {
    data: setup.data?.data,
  };

  return (
    <>
      <YswPageBanner
        title="List of the Hostels"
        subtitle="The official portal of the Government of West Bengal"
        {...banner}
      />
      YswHostelList
    </>
  );
};
export default YswHostelList;
