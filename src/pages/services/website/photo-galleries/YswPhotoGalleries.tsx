import { YswPageBanner } from '@/components';
import { useYswPageSetup } from '@/hooks/use-ysw-page-setup';

const YswPhotoGalleries = () => {
  const setup = useYswPageSetup(`Photo Galleries`);

  if (setup.isError) console.log(setup.error);

  const banner = {
    data: setup.data?.data,
  };

  return (
    <>
      <YswPageBanner
        title="Photo Galleries"
        subtitle="The official portal of the Government of West Bengal"
        {...banner}
      />
      YswPhotoGalleries
    </>
  );
};
export default YswPhotoGalleries;
