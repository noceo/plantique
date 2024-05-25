"use client";

import { UserContext, useUser } from "@/shared/context/UserContext.context";
import { logout } from "@/shared/services/httpClient.service";
import Link from "next/link";
import CustomImage from "../CustomImage/CustomImage";
import Button from "../Button/Button";
import Avatar from "../Avatar/Avatar";

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
        <Button variant="primary" onClick={onLogout}>
          Logout
        </Button>
      ) : (
        <Button variant="primary" href="/login">
          Login
        </Button>
      )}
      <div className="profile-controls__avatar">
        <Avatar />
      </div>
    </div>
  );
}
