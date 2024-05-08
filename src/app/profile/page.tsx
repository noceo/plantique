"use client";

import { UserContext, useUser } from "@/shared/context/UserContext.context";
import Link from "next/link";
import { useEffect } from "react";

export default function Profile() {
  const { user } = useUser() as UserContext;

  useEffect(() => {
    console.log("Profile auth");
  });

  return (
    <div className="profile-page">
      <p>{user?.id}</p>
      <p>{user?.email}</p>
      <p>{user?.accessToken}</p>
      <p>Role: {user?.role}</p>
      <Link href={"/"}>Back to home</Link>
    </div>
  );
}
