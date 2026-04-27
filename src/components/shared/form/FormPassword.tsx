import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { FieldDescription } from '@/components/ui/field';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useState } from 'react';

type RHFFormInputProps<T extends FieldValues> = {
  id?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  type?: string;
  placeholder?: string;
  description?: string;
  iconStart?: React.ReactNode;
};

const FormPassword = <T extends FieldValues>({
  id,
  name,
  register,
  type,
  placeholder,
  description,
  iconStart,
}: RHFFormInputProps<T>) => {
  const isPassword = type === 'password';
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <>
      <InputGroup>
        <InputGroupInput
          id={id ?? name}
          placeholder={placeholder}
          {...register(name)}
          type={inputType}
          className="placeholder:text-xs"
        />
        {iconStart && (
          <InputGroupAddon align="inline-start">{iconStart}</InputGroupAddon>
        )}
        <InputGroupAddon
          align="inline-end"
          className="cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
          title={showPassword ? 'Hide password' : 'Show password'}
        >
          {!showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </InputGroupAddon>
      </InputGroup>
      {description && (
        <FieldDescription className="text-destructive text-xs">
          {description}
        </FieldDescription>
      )}
    </>
  );
};
export default FormPassword;
