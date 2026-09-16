import { YswPageBanner } from '@/components';
import { useYswPageSetup } from '@/hooks/use-ysw-page-setup';

const YswTwoThousandSix = () => {
  const setup = useYswPageSetup(`RTI Rules 2006`);

  if (setup.isError) console.log(setup.error);

  const banner = {
    data: setup.data?.data,
  };

  return (
    <>
      <YswPageBanner
        title="RTI Rules 2006"
        subtitle="The official portal of the Government of West Bengal"
        {...banner}
      />
      YswTwoThousandSix
    </>
  );
};
export default YswTwoThousandSix;
