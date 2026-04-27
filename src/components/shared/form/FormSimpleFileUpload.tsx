import { Field, FieldDescription } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { cn } from '@/lib/utils';

export interface RHFFileUploadProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  description?: string;
  className?: string;
}

const FormSimpleFileUpload = <T extends FieldValues>({
  control,
  name,
  description,
  className,
}: RHFFileUploadProps<T>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Field>
            <Input
              type="file"
              ref={field.ref}
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : undefined;
                field.onChange(file);
              }}
              className={cn(className)}
            />
          </Field>
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
export default FormSimpleFileUpload;
