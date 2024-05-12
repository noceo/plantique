"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { UserContext, useUser } from "@/shared/context/UserContext.context";

export default function AuthRoute({ children }: PropsWithChildren) {
  const router = useRouter();
  const { user } = useUser() as UserContext;

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  return user && children;
}
