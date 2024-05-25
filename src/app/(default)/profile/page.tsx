"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/profile/my-recipes");
  }, [router]);

  return null;
}
