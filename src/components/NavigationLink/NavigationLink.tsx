import Link from "next/link";
import { PropsWithChildren } from "react";

interface NavigationLinkProps {
  href: string;
  variant?: "back";
}

export default function NavigationLink({
  href,
  variant,
  children,
}: PropsWithChildren<NavigationLinkProps>) {
  return (
    <Link
      className={"nav-link " + (variant && "nav-link--" + variant)}
      href={href}
      tabIndex={0}
    >
      {children}
    </Link>
  );
}
