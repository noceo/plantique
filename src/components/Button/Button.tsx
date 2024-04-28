"use client";

import { PropsWithChildren } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  onClick?: () => void;
}

export default function Button({
  variant,
  onClick,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={"btn " + ("btn--" + variant)}
      tabIndex={0}
      onClick={onClick}
    >
      {children}
    </button>
  );
}