"use client";

import "./custom-image.scss";
import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
}

const loaderProp = ({ src }: any) => {
  return src;
};

export default function CustomImage({ src, alt }: ImageProps) {
  return (
    <div className="custom-img">
      <Image src={src} alt={alt} sizes="100vw" fill loader={loaderProp} />
    </div>
  );
}
