import { YswPageBanner } from '@/components';
import { useYswPageSetup } from '@/hooks/use-ysw-page-setup';

const YswAboutDepartment = () => {
  const setup = useYswPageSetup(`Home`);

  if (setup.isError) console.log(setup.error);

  const banner = {
    data: setup.data?.data,
  };

  return (
    <>
      <YswPageBanner
        title="About the Department"
        subtitle="The official portal of the Government of West Bengal"
        {...banner}
      />
      YswAboutDepartment
    </>
  );
};
export default YswAboutDepartment;
