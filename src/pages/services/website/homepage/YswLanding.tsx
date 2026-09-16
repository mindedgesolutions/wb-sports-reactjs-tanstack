import { WbSliderPlaceholder, YswPageBanner } from '@/components';
import { useYswPageSetup } from '@/hooks/use-ysw-page-setup';

const YswLanding = () => {
  const setup = useYswPageSetup(`Home`);

  if (setup.isError) console.log(setup.error);

  const banner = {
    data: setup.data?.data,
  };

  return (
    <>
      {setup.isLoading || setup.isFetching ? (
        <WbSliderPlaceholder />
      ) : (
        <YswPageBanner
          title="Department of Youth Services & Sports (Youth Services Wing)"
          subtitle="The official portal of the Government of West Bengal"
          {...banner}
        />
      )}
      YswLanding
    </>
  );
};
export default YswLanding;
