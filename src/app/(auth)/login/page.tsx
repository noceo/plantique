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
  }, [user, router]);

  const onLogin = (user: User) => {
    console.log("logged in: ", user);
    setUser(user);
    router.replace("/profile");
  };

  return (
    <div className="login-page">
      <div className="login-page__form">
        <h1>Login</h1>
        <AuthForm onAuthorizationComplete={onLogin} />
      </div>
    </div>
  );
}
