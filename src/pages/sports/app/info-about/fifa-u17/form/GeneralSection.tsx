import {
  AppBodyWrapper,
  AppRequired,
  AppTitleWrapper,
  FormDatepicker,
  FormInput,
  FormTextarea,
} from '@/components';
import { Label } from '@/components/ui/label';
import type { FifaGallerySchema } from '@/schema/sports/info-about.schema';
import { useFormContext } from 'react-hook-form';
import { MdOutlineStadium } from 'react-icons/md';

const GeneralSection = () => {
  const {
    formState: { errors },
    register,
    control,
  } = useFormContext<FifaGallerySchema>();

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
                  id="name"
                  placeholder="Enter gallery title"
                  description={errors.title?.message}
                  iconStart={<MdOutlineStadium />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <FormTextarea
                  register={register}
                  name="description"
                  id="description"
                  placeholder="Enter description"
                  description={errors.description?.message}
                />
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="grid gap-2">
              <Label htmlFor="description">Event date</Label>
              <FormDatepicker
                control={control}
                name="eventDate"
                allowFutureDates={false}
                description={errors.eventDate?.message}
              />
            </div>
          </div>
        </div>
      </AppBodyWrapper>
    </>
  );
};
export default GeneralSection;
