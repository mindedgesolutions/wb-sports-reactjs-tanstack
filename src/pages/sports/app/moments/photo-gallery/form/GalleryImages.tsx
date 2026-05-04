import {
  AppBodyWrapper,
  AppTitleWrapper,
  FormMultipleFileUpload,
} from '@/components';
import type { PhotoGallerySchema } from '@/schema/sports/moments.schema';
import { useFormContext } from 'react-hook-form';

const GalleryImages = ({ resetKey }: { resetKey: number }) => {
  const { getValues, setValue } = useFormContext<PhotoGallerySchema>();

  const handleImages = ({
    newFiles,
    existing,
  }: {
    newFiles: File[];
    existing: string[];
  }) => {
    setValue('galleryImg', newFiles);
    setValue('existingGalleryImg', existing);
  };

  return (
    <>
      <AppTitleWrapper title="stadium images" />
      <AppBodyWrapper className="mb-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3 grid gap-4">
            <FormMultipleFileUpload
              maxCount={50}
              maxSize={3}
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
export default GalleryImages;
