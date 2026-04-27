import { AppBodyWrapper, AppTitleWrapper } from '@/components';
import type { StadiumSchema } from '@/schema/sports/info-about.schema';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { MdFormatListBulleted } from 'react-icons/md';

const Highlights = () => {
  const {
    formState: { errors },
    control,
    register,
  } = useFormContext<StadiumSchema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'highlights',
  });

  return (
    <>
      <AppTitleWrapper title="stadium highlights" />
      <AppBodyWrapper className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <div>
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-4 my-2">
                  <InputGroup className="w-full">
                    <InputGroupInput
                      {...register(`highlights.${index}.value`)}
                      placeholder="Enter highlight"
                    />
                    <InputGroupAddon>
                      <MdFormatListBulleted />
                    </InputGroupAddon>
                  </InputGroup>
                  <Button
                    type="button"
                    size={'sm'}
                    className="bg-destructive rounded-sm"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>

                  <p>{errors.highlights?.[index]?.value?.message}</p>
                </div>
              ))}

              <Button
                type="button"
                size={'sm'}
                className="rounded-sm"
                onClick={() => append({ value: '' })}
              >
                Add new
              </Button>
            </div>
          </div>
        </div>
      </AppBodyWrapper>
    </>
  );
};
export default Highlights;
