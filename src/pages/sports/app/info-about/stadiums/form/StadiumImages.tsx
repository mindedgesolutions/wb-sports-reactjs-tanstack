import {
  AppBodyWrapper,
  AppTitleWrapper,
  FormMultipleFileUpload,
} from '@/components';
import type { StadiumSchema } from '@/schema/sports/info-about.schema';
import { useFormContext } from 'react-hook-form';

const StadiumImages = ({ resetKey }: { resetKey: number }) => {
  const { getValues, setValue } = useFormContext<StadiumSchema>();

  const handleImages = ({
    newFiles,
    existing,
  }: {
    newFiles: File[];
    existing: string[];
  }) => {
    setValue('newGalleryImg', newFiles);
    setValue('existingGalleryImg', existing);
  };

  return (
    <>
      <AppTitleWrapper title="stadium images" />
      <AppBodyWrapper className="mb-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3 grid gap-4">
            <FormMultipleFileUpload
              maxCount={10}
              label={`Add images`}
              onChange={handleImages}
              resetTrigger={resetKey}
              initialImages={getValues('existingGalleryImg')}
            />
          </div>
        </div>
      </AppBodyWrapper>
    </>
  );
};
export default StadiumImages;
