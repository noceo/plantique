"use client";

import AuthForm from "@/components/Forms/AuthForm/AuthForm";
import { UserContext, useUser } from "@/shared/context/UserContext.context";
import User from "@/shared/interfaces/user.interface";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const { user, setUser } = useUser() as UserContext;

  useEffect(() => {
    if (user) {
      router.replace("/profile");
    }
  });

  const onLogin = (user: User) => {
    console.log("logged in: ", user);
    setUser(user);
    router.replace("/profile");
  };

  return <AuthForm onAuthorizationComplete={onLogin} />;
}
