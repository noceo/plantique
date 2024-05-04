"use client";

import { PropsWithChildren, createContext, useState, useContext } from "react";

export interface CurrentImageContext {
  currentImage: number;
  setCurrentImage: (currentImage: number) => void;
}

export const CurrentImageContext = createContext<CurrentImageContext | null>(
  null
);

export const useCurrentImage = () =>
  useContext<CurrentImageContext | null>(CurrentImageContext);

export default function CurrentImageProvider({ children }: PropsWithChildren) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <CurrentImageContext.Provider value={{ currentImage, setCurrentImage }}>
      {children}
    </CurrentImageContext.Provider>
  );
}
