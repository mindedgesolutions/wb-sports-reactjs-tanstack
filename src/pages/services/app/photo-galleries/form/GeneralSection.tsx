import {
  AppBodyWrapper,
  AppModalTooltip,
  AppRequired,
  AppTitleWrapper,
  FormDatepicker,
  FormInput,
  FormTextEditor,
  FormUploadSingle,
} from '@/components';
import { Button } from '@/components/ui/button';
import { FieldDescription } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { titles } from '@/constants';
import type { FairProgramSchema } from '@/schema/services/fair-program.schema';
import { fileSizes } from '@/utils/format.validation';
import { Trash2, X } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import {
  MdOutlinePhotoSizeSelectActual,
  MdOutlineCelebration,
} from 'react-icons/md';

const instructions: string[] = [
  'Allowed file types: jpeg, png, gif',
  'Attachment size must be less than 5MB',
];

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
  } = useFormContext<FairProgramSchema>();

  return (
    <>
      <AppTitleWrapper title="general information" />
      <AppBodyWrapper className="mb-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2 grid gap-4">
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Title <AppRequired />
                </Label>
                <FormInput
                  register={register}
                  name="title"
                  placeholder="Enter event title"
                  description={errors.title?.message}
                  iconStart={<MdOutlinePhotoSizeSelectActual />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Event date</Label>
                <div className="flex items-center gap-2">
                  <FormDatepicker
                    control={control}
                    name="eventDate"
                    allowFutureDates={false}
                    description={errors.eventDate?.message}
                  />
                  <X
                    className="text-destructive h-4 cursor-pointer"
                    onClick={() => setValue('eventDate', undefined)}
                  />
                </div>
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
                <AppModalTooltip
                  instructions={instructions}
                  label="Upload cover image"
                />{' '}
                <AppRequired />
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
                  files[0].file.size <= fileSizes().max5mb && (
                    <img
                      src={URL.createObjectURL(files[0].file)}
                      alt=""
                      className="w-full max-h-28 object-cover"
                    />
                  )}
                {!getValues('existingCoverImg') && files.length === 0 && (
                  <MdOutlineCelebration className="w-full h-full text-muted" />
                )}
                <FormUploadSingle
                  setFiles={setFiles}
                  files={files}
                  setFormImg={(file: File) => setValue('coverImg', file)}
                  maxAllowed={fileSizes().max5mb}
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
              {files.length === 0 && (
                <FieldDescription className="text-destructive text-xs">
                  {errors.coverImg?.message}
                </FieldDescription>
              )}
            </div>
          </div>
        </div>
      </AppBodyWrapper>
    </>
  );
};
export default GeneralSection;
