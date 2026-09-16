import { YswPageBanner } from '@/components';
import { useYswPageSetup } from '@/hooks/use-ysw-page-setup';

const YswFairsPrograms = () => {
  const setup = useYswPageSetup(`Fairs & Programmes`);

  if (setup.isError) console.log(setup.error);

  const banner = {
    data: setup.data?.data,
  };

  return (
    <>
      <YswPageBanner
        title="Fairs & Programmes"
        subtitle="The official portal of the Government of West Bengal"
        {...banner}
      />
      YswFairsPrograms
    </>
  );
};
export default YswFairsPrograms;
