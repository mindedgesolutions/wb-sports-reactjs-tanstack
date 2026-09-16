import { YswPageBanner } from '@/components';
import { useYswPageSetup } from '@/hooks/use-ysw-page-setup';

const YswVocationalTraining = () => {
  const setup = useYswPageSetup(`Vocational Training`);

  if (setup.isError) console.log(setup.error);

  const banner = {
    data: setup.data?.data,
  };

  return (
    <>
      <YswPageBanner
        title="Vocational Training"
        subtitle="The official portal of the Government of West Bengal"
        {...banner}
      />
      YswVocationalTraining
    </>
  );
};
export default YswVocationalTraining;
