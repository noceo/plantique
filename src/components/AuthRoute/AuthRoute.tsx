"use client";

import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import User from "@/shared/interfaces/user.interface";
import { UserContext, useUser } from "@/shared/context/UserContext.context";

function getUserStatus(token: string | undefined) {
  if (token === "admin") {
    return "admin";
  } else if (token === "user") {
    return "user";
  } else {
    return "guest";
  }
}

export default function AuthRoute({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const { user, setUser } = useUser() as UserContext;

  const getAccessToken = async () => {
    await new Promise<any>((resolve) => setTimeout(resolve, 1000));
    return "newAccessToken";
  };

  const checkAuth = useCallback(async () => {
    console.log("Check auth");
    let token = user?.accessToken;
    if (!token) {
      try {
        token = await getAccessToken();
      } catch (err) {
        router.replace("/login");
      }
    }
    console.log(token);

    const userStatus = getUserStatus(token);
    console.log(userStatus, pathname);

    if (userStatus === "guest") {
      router.replace("/login");
    } else {
      setAuthorized(true);
    }
  }, [pathname, router, user?.accessToken]);

  useEffect(() => {
    setAuthorized(false);
    checkAuth();
  }, [pathname, checkAuth]);

  return authorized && children;
}
