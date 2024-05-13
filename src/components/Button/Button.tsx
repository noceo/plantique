"use client";

import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonAnchorIntersection = ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

interface ButtonProps extends ButtonAnchorIntersection {
  variant: "primary" | "secondary" | "icon-only";
  href?: string;
}

export default function Button({
  variant,
  href,
  children,
  ...props
}: ButtonProps) {
  if (href) {
    if (href.startsWith("http") || href.startsWith("www")) {
      return (
        <a {...props} href={href} className={"btn " + ("btn--" + variant)}>
          {children}
        </a>
      );
    }
    return (
      <Link {...props} href={href} className={"btn " + ("btn--" + variant)}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={"btn " + ("btn--" + variant)} tabIndex={0}>
      {children}
    </button>
  );
}
