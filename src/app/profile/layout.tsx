import AuthProvider from "@/shared/providers/AuthProvider";
import { PropsWithChildren } from "react";

export default function ProfileLayout({ children }: PropsWithChildren) {
  return <AuthProvider>{children}</AuthProvider>;
}
