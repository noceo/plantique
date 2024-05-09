"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

interface SidebarLinkProps {
  href: string;
}

export default function SidebarLink({
  href,
  children,
}: PropsWithChildren<SidebarLinkProps>) {
  const pathname = usePathname();
  const isActive = pathname.endsWith(href);

  return (
    <div className={"sidebar-link" + (isActive ? " sidebar-link--active" : "")}>
      <Link href={href}>{children}</Link>
    </div>
  );
}
