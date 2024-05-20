import { InputHTMLAttributes } from "react";
import { UseFormRegister, FieldError, FieldValues } from "react-hook-form";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  valueAsNumber?: boolean;
}

export default function FormField({
  defaultValue,
  name,
  register,
  error,
  valueAsNumber,
  ...props
}: FormFieldProps) {
  return (
    <div className="form-field">
      <input
        {...props}
        defaultValue={defaultValue}
        {...register(name, { valueAsNumber })}
      />
      <span className="form-error">{error?.message}</span>
    </div>
  );
}
