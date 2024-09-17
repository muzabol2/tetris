"use client";

import { getDefaultColors } from "@/utils";
import React, { createContext, useContext, useEffect, useState } from "react";

type ColorContextType = {
  colors: Record<string, string>;
  setColors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

const ColorContext = createContext<ColorContextType | undefined>(undefined);

const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colors, setColors] = useState<Record<string, string>>(getDefaultColors);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedColors = localStorage.getItem("tetris-colors");

      if (savedColors) {
        setColors(JSON.parse(savedColors));
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("tetris-colors", JSON.stringify(colors));
    }
  }, [colors, isLoaded]);

  return <ColorContext.Provider value={{ colors, setColors }}>{children}</ColorContext.Provider>;
};

const useColorContext = () => {
  const context = useContext(ColorContext);

  if (!context) {
    throw new Error("useColorContext must be used within a ColorProvider");
  }

  return context;
};

export { ColorProvider, useColorContext };
