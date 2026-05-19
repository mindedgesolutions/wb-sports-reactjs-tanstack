import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldDescription } from '@/components/ui/field';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';

type RHFFormDatepickerProps<T extends FieldValues> = {
  id?: string;
  name: Path<T>;
  control: Control<T>;
  description?: string;
  allowFutureDates?: boolean;
};

const FormDatepicker = <T extends FieldValues>({
  id,
  name,
  control,
  description,
  allowFutureDates = true,
}: RHFFormDatepickerProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Field className="mx-auto w-full">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id={id}
                  className="justify-start font-normal text-xs"
                >
                  {field.value
                    ? new Date(field.value).toLocaleDateString()
                    : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={field.value}
                  defaultMonth={field.value}
                  captionLayout="dropdown"
                  timeZone="Asia/Kolkata"
                  onSelect={(date) => {
                    field.onChange(date);
                    setOpen(false);
                  }}
                  disabled={(date) => !allowFutureDates && date > new Date()}
                />
              </PopoverContent>
            </Popover>
          )}
        />
      </Field>
      {description && (
        <FieldDescription className="text-destructive text-xs">
          {description}
        </FieldDescription>
      )}
    </>
  );
};
export default FormDatepicker;
