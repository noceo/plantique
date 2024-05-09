"use client";

import { UserContext, useUser } from "@/shared/context/UserContext.context";
import { logout } from "@/shared/services/httpClient.service";
import Link from "next/link";
import CustomImage from "../CustomImage/CustomImage";

export default function ProfileControls() {
  const { user, setUser } = useUser() as UserContext;

  const onLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-controls">
      {user ? (
        <button onClick={onLogout}>Logout</button>
      ) : (
        <Link href="/login">Login</Link>
      )}
      <button className="avatar">Avatar</button>
    </div>
  );
}
