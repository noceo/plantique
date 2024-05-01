"use client";

import { Children, useContext, useState } from "react";
import { CurrentImageContext } from "@/shared/providers/CurrentImageProvider";

interface Image {
  src: string;
  alt: string;
}

interface ImageStackProps {
  children: React.ReactElement<Image>[] | React.ReactElement<Image>;
}

export default function ImageStack({ children }: ImageStackProps) {
  const { currentImage } = useContext(
    CurrentImageContext
  ) as CurrentImageContext;
  const childElements = Children.toArray(children);

  return (
    <div className="image-stack">
      {childElements.map((child, i) => (
        <div
          key={child.toString()}
          className={
            "image-stack__item" +
            (currentImage === i ||
            (currentImage === childElements.length && i === 0)
              ? " image-stack__item--active"
              : "")
          }
        >
          {child}
        </div>
      ))}
    </div>
  );
}
