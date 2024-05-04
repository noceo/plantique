import AuthRoute from "@/components/AuthRoute/AuthRoute";
import { PropsWithChildren } from "react";

export default function ProfileLayout({ children }: PropsWithChildren) {
  return <AuthRoute>{children}</AuthRoute>;
}
