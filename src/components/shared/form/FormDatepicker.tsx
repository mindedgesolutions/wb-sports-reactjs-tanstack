import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldDescription } from '@/components/ui/field';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Trash2 } from 'lucide-react';
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
  resetField?: (name: Path<T>) => void;
};

const FormDatepicker = <T extends FieldValues>({
  id,
  name,
  control,
  description,
  allowFutureDates = true,
  resetField,
}: RHFFormDatepickerProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mx-auto flex w-full items-center gap-2">
        <Field className="w-full">
          <Controller
            control={control}
            name={name}
            render={({ field }) => {
              const selectedDate =
                (field.value as any) instanceof Date
                  ? field.value
                  : field.value
                    ? new Date(field.value)
                    : undefined;

              return (
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id={id}
                      className="justify-start font-normal text-xs"
                    >
                      {selectedDate
                        ? selectedDate.toLocaleDateString()
                        : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      defaultMonth={selectedDate}
                      captionLayout="dropdown"
                      timeZone="Asia/Kolkata"
                      onSelect={(date) => {
                        field.onChange(date);
                        setOpen(false);
                      }}
                      disabled={(date) =>
                        !allowFutureDates && date > new Date()
                      }
                    />
                  </PopoverContent>
                </Popover>
              );
            }}
          />
        </Field>
        {resetField && (
          <Trash2
            className="text-destructive h-4 w-4 cursor-pointer"
            onClick={() => resetField(name)}
          />
        )}
      </div>
      {description && (
        <FieldDescription className="text-destructive text-xs">
          {description}
        </FieldDescription>
      )}
    </>
  );
};
export default FormDatepicker;
