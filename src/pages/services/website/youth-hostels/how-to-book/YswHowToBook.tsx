import { YswPageBanner } from '@/components';
import { useYswPageSetup } from '@/hooks/use-ysw-page-setup';

const YswHowToBook = () => {
  const setup = useYswPageSetup(`How to book Youth Hostel / Phone Number`);

  if (setup.isError) console.log(setup.error);

  const banner = {
    data: setup.data?.data,
  };

  return (
    <>
      <YswPageBanner
        title="How to book Youth Hostel / Phone Number"
        subtitle="The official portal of the Government of West Bengal"
        {...banner}
      />
      YswHowToBook
    </>
  );
};
export default YswHowToBook;
