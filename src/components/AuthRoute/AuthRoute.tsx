"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { UserContext, useUser } from "@/shared/context/UserContext.context";
import { verifyRefreshToken } from "@/shared/services/httpClient.service";

export default function AuthRoute({ children }: PropsWithChildren) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const { user, setUser } = useUser() as UserContext;

  const checkAuth = useCallback(async () => {
    if (!user) {
      try {
        const refreshedUser = await verifyRefreshToken();
        console.log("REFRESHHED_USER: ", refreshedUser);
        setUser(refreshedUser);
      } catch (err) {
        router.replace("/login");
        return;
      }
    }
    setAuthorized(true);
  }, [user, setUser, router]);

  useEffect(() => {
    setAuthorized(false);
    checkAuth();
  }, [checkAuth]);

  return authorized && children;
}
