import { YswPageBanner } from '@/components';
import { useYswPageSetup } from '@/hooks/use-ysw-page-setup';

const YswHelpline = () => {
  const setup = useYswPageSetup(`Helpline`);

  if (setup.isError) console.log(setup.error);

  const banner = {
    data: setup.data?.data,
  };

  return (
    <>
      <YswPageBanner
        title="Helpline"
        subtitle="The official portal of the Government of West Bengal"
        {...banner}
      />
      YswHelpline
    </>
  );
};
export default YswHelpline;
