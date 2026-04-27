import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type RHFFormInputProps<T extends FieldValues> = {
  id?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  isSubmitSuccessful?: boolean;
  type?: string;
  placeholder?: string;
  description?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  maxLen?: number;
  className?: string;
};

const FormTextarea = <T extends FieldValues>({
  id,
  name,
  register,
  isSubmitSuccessful,
  placeholder,
  description,
  maxLen = 500,
  className,
}: RHFFormInputProps<T>) => {
  const [count, setCount] = useState(0);
  const reg = register(name);

  // ---------------------------------

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    if (value.length > maxLen) {
      value = value.slice(0, maxLen);
      e.target.value = value;
    }
    setCount(value.length);
    reg.onChange(e);
  };

  // ---------------------------------

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const paste = e.clipboardData.getData('text');
    if (paste.length + count > maxLen) {
      e.preventDefault();
      const allowed = paste.slice(0, maxLen - count);
      const newValue = e.currentTarget.value + allowed;
      e.currentTarget.value = newValue;
      setCount(newValue.length);
      reg.onChange({
        ...e,
        target: { ...e.target, value: newValue },
      });
    }
  };

  // ---------------------------------

  useEffect(() => {
    if (isSubmitSuccessful) {
      setCount(0);
    }
  }, [isSubmitSuccessful]);

  return (
    <>
      <FieldGroup className={cn('w-full', className)}>
        <Field>
          <InputGroup>
            <InputGroupTextarea
              id={id ?? name}
              placeholder={placeholder}
              {...register(name)}
              onChange={handleChange}
              onPaste={handlePaste}
            />
            <InputGroupAddon align="block-end">
              <InputGroupText className="text-[10px]">
                {count}/{maxLen}
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          {description && (
            <FieldDescription className="text-destructive text-xs">
              {description}
            </FieldDescription>
          )}
        </Field>
      </FieldGroup>
    </>
  );
};
export default FormTextarea;
