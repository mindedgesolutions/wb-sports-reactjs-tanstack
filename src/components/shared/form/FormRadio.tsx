import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

type OptionItem = {
  value: string;
  label: string;
};

export interface RHFRadioProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  options: OptionItem[];
  description?: string;
  className?: string;
  classNameLabel?: string;
}

const FormRadio = <T extends FieldValues>({
  control,
  name,
  options,
  description,
  className,
  classNameLabel,
}: RHFRadioProps<T>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className={cn('max-w-sm', className)}
          >
            {options.map((option) => {
              return (
                <FieldLabel
                  key={option.value}
                  htmlFor={option.value}
                  className="cursor-pointer"
                >
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle className={cn('text-xs', classNameLabel)}>
                        {option.label}
                      </FieldTitle>
                    </FieldContent>
                    <RadioGroupItem value={option.value} id={option.value} />
                  </Field>
                </FieldLabel>
              );
            })}
          </RadioGroup>
        )}
      />
      {description && (
        <FieldDescription className="text-destructive text-xs">
          {description}
        </FieldDescription>
      )}
    </>
  );
};
export default FormRadio;
