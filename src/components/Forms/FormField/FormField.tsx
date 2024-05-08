import { UseFormRegister, FieldError, FieldValues } from "react-hook-form";

type ValidFieldNames = "email" | "password";

interface FormFieldProps {
  type: string;
  placeholder: string;
  defaultValue?: string;
  name: ValidFieldNames;
  register: UseFormRegister<any>;
  error?: FieldError;
  valueAsNumber?: boolean;
}

export default function FormField({
  type,
  placeholder,
  defaultValue,
  name,
  register,
  error,
  valueAsNumber,
}: FormFieldProps) {
  return (
    <div className="form-field">
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name, { valueAsNumber })}
      />
      <span className="form-field__error">{error?.message}</span>
    </div>
  );
}
