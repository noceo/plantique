"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { z } from "zod";
import FormField from "../FormField/FormField";
import User from "@/shared/interfaces/user.interface";
import { login } from "@/shared/services/httpClient.service";

interface AuthFormProps {
  onAuthorizationComplete: (user: User) => void;
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type AuthFormFields = z.infer<typeof schema>;

export default function AuthForm({ onAuthorizationComplete }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormFields>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<AuthFormFields> = async (data) => {
    console.log(process.env.NEXT_PUBLIC_API_URL);
    try {
      const user = await login(data);
      onAuthorizationComplete(user!);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="form form--auth" onSubmit={handleSubmit(onSubmit)}>
      <FormField
        name="email"
        type="email"
        placeholder="Email"
        defaultValue="alice@prisma.io"
        register={register}
        error={errors.email}
      />
      <FormField
        name="password"
        type="password"
        defaultValue="aliceprisma"
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
