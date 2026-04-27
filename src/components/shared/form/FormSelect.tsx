import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { FieldDescription } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type SelectOption = {
  value: string | number;
  label: string;
};

export interface RHFSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  description?: string;
  className?: string;
}

const FormSelect = <T extends FieldValues>({
  control,
  name,
  options,
  placeholder,
  disabled,
  onValueChange,
  description,
  className,
}: RHFSelectProps<T>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value);
              onValueChange?.(value);
            }}
          >
            <SelectTrigger
              className={cn('w-full', className)}
              disabled={disabled}
            >
              <SelectValue placeholder={placeholder ?? 'Select an option'} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{placeholder ?? 'Select an option'}</SelectLabel>
                {options.length > 0 ? (
                  options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      {option.label}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem key="0" value="0">
                    No options available
                  </SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
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
export default FormSelect;
