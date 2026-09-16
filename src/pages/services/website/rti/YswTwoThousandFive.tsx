import { YswPageBanner } from '@/components';
import { useYswPageSetup } from '@/hooks/use-ysw-page-setup';

const YswTwoThousandFive = () => {
  const setup = useYswPageSetup(`RTI Act 2005`);

  if (setup.isError) console.log(setup.error);

  const banner = {
    data: setup.data?.data,
  };

  return (
    <>
      <YswPageBanner
        title="RTI Act 2005"
        subtitle="The official portal of the Government of West Bengal"
        {...banner}
      />
      YswTwoThousandFive
    </>
  );
};
export default YswTwoThousandFive;
