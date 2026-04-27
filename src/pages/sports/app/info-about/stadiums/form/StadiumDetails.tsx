import { AppBodyWrapper, AppTitleWrapper, FormTextEditor } from '@/components';
import { Label } from '@/components/ui/label';
import type { StadiumSchema } from '@/schema/sports/info-about.schema';
import { useFormContext } from 'react-hook-form';

const StadiumDetails = () => {
  const {
    formState: { errors },
    control,
  } = useFormContext<StadiumSchema>();

  return (
    <>
      <AppTitleWrapper title="stadium details" />
      <AppBodyWrapper className="mb-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3 grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Stadium details</Label>
              <FormTextEditor
                control={control}
                name="description"
                description={errors.description?.message}
                placeholder="Enter stadium details"
              />
            </div>
          </div>
        </div>
      </AppBodyWrapper>
    </>
  );
};
export default StadiumDetails;
