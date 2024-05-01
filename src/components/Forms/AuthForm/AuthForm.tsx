"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { z } from "zod";
import FormField from "../FormField/FormField";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type AuthFormFields = z.infer<typeof schema>;

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormFields>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<AuthFormFields> = async (data) => {
    await new Promise<any>((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <form className="form form--auth" onSubmit={handleSubmit(onSubmit)}>
      <FormField
        name="email"
        type="email"
        placeholder="Email"
        register={register}
        error={errors.email}
      />
      <FormField
        name="password"
        type="password"
        placeholder="Password"
        register={register}
        error={errors.password}
      />
      <button disabled={isSubmitting} type="submit" className="submit-button">
        {isSubmitting ? "Loading..." : "Login"}
      </button>
    </form>
  );
}
