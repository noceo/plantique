"use client";

import { useEffect } from "react";

export default function Profile() {
  useEffect(() => {
    console.log("Profile auth");
  });
  return <div className="profile-page"></div>;
}
