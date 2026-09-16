import { YswPageBanner } from '@/components';
import { useYswPageSetup } from '@/hooks/use-ysw-page-setup';

const YswAboutDepartment = () => {
  const setup = useYswPageSetup(`Home`);

  if (setup.isError) console.log(setup.error);

  const banner = {
    data: setup.data?.data,
    isLoading: setup.isLoading,
    isFetching: setup.isFetching,
  };

  return (
    <>
      <YswPageBanner
        title="Department of Youth Services & Sports (Youth Services Wing)"
        subtitle="The official portal of the Government of West Bengal"
        {...banner}
      />
      YswAboutDepartment
    </>
  );
};
export default YswAboutDepartment;
