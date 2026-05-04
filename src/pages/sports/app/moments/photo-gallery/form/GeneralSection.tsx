import {
  AppBodyWrapper,
  AppRequired,
  AppTitleWrapper,
  FormInput,
  FormTextEditor,
  FormUploadSingle,
} from '@/components';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';
import { MdOutlineStadium } from 'react-icons/md';
import { fileSizes } from '@/utils/format.validation';
import { titles } from '@/constants';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import type { PhotoGallerySchema } from '@/schema/sports/moments.schema';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';

const GeneralSection = ({
  files,
  setFiles,
}: {
  files: any[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const {
    formState: { errors },
    register,
    control,
    setValue,
    getValues,
  } = useFormContext<PhotoGallerySchema>();

  return (
    <>
      <AppTitleWrapper title="general information" />
      <AppBodyWrapper className="mb-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2 grid gap-4">
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Gallery title <AppRequired />
                </Label>
                <FormInput
                  register={register}
                  name="title"
                  placeholder="Enter gallery title"
                  description={errors.title?.message}
                  iconStart={<MdOutlinePhotoSizeSelectActual />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Description</Label>
                <FormTextEditor
                  control={control}
                  name="description"
                  placeholder="Enter description"
                  description={errors.description?.message}
                  height={350}
                />
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="grid gap-2">
              <Label htmlFor="newImg">
                Upload cover image <AppRequired />
              </Label>
              <div className="p-1 border border-muted-foreground/30 border-dashed w-32 h-32 relative">
                {getValues('existingCoverImg') && files.length === 0 && (
                  <img
                    src={`${titles.BASE_URL}${getValues('existingCoverImg')}`}
                    alt="Existing"
                    className="w-full max-h-28 object-cover"
                  />
                )}
                {files.length > 0 &&
                  files[0].file.size <= fileSizes().max2mb && (
                    <img
                      src={URL.createObjectURL(files[0].file)}
                      alt=""
                      className="w-full max-h-28 object-cover"
                    />
                  )}
                {!getValues('existingCoverImg') && files.length === 0 && (
                  <MdOutlineStadium className="w-full h-full text-muted" />
                )}
                <FormUploadSingle
                  setFiles={setFiles}
                  files={files}
                  setFormImg={(file: File) => setValue('coverImg', file)}
                  maxAllowed={fileSizes().max1mb}
                />
                <Button
                  size={'icon-xs'}
                  type="button"
                  variant={'ghost'}
                  className="absolute -right-7 bottom-0"
                  onClick={() => setFiles([])}
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AppBodyWrapper>
    </>
  );
};
export default GeneralSection;
