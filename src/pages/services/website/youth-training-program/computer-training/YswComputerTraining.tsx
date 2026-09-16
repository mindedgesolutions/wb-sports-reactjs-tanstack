import { YswPageBanner } from '@/components';
import { useYswPageSetup } from '@/hooks/use-ysw-page-setup';

const YswComputerTraining = () => {
  const setup = useYswPageSetup(`Computer Training`);

  if (setup.isError) console.log(setup.error);

  const banner = {
    data: setup.data?.data,
  };

  return (
    <>
      <YswPageBanner
        title="Computer Training"
        subtitle="The official portal of the Government of West Bengal"
        {...banner}
      />
      YswComputerTraining
    </>
  );
};
export default YswComputerTraining;
