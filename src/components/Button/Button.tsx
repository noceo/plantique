"use client";

import classNames from "classnames";
import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonAnchorIntersection = ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

interface ButtonProps extends ButtonAnchorIntersection {
  variant: "primary" | "secondary" | "icon-only" | "icon-square" | "icon-link";
  color?: "success" | "danger";
  icon?: ReactNode;
  href?: string;
}

export default function Button({
  variant,
  color,
  icon,
  href,
  children,
  ...props
}: ButtonProps) {
  const colorClass = color ? `btn--${color}` : undefined;
  const btnClass = classNames("btn", `btn--${variant}`, colorClass);

  if (href) {
    if (href.startsWith("http") || href.startsWith("www")) {
      return (
        <a {...props} href={href} className={btnClass} tabIndex={0}>
          {children}
        </a>
      );
    }
    return (
      <Link {...props} href={href} className={btnClass} tabIndex={0}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={btnClass} tabIndex={0}>
      {icon && <div className="btn__icon">{icon}</div>}
      {children}
    </button>
  );
}
