import {
  AppBodyWrapper,
  AppTitleWrapper,
  FormMultipleFileUpload,
} from '@/components';
import type { FifaGallerySchema } from '@/schema/sports/info-about.schema';
import { useFormContext } from 'react-hook-form';

const GalleryImages = ({ resetKey }: { resetKey: number }) => {
  const {
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext<FifaGallerySchema>();

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
      <AppTitleWrapper title="gallery images" />
      <AppBodyWrapper className="mb-2">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3 grid gap-4">
            <FormMultipleFileUpload
              maxCount={50}
              maxSize={5}
              label={`Add images`}
              onChange={handleImages}
              resetTrigger={resetKey}
              initialImages={getValues('existingGalleryImg')}
              description={errors.newGalleryImg?.message}
            />
          </div>
        </div>
      </AppBodyWrapper>
    </>
  );
};
export default GalleryImages;
