"use client";

import { TetrisContext } from "../Context";
import { useContext } from "react";

export const useTetris = () => {
  const context = useContext(TetrisContext);

  if (context === undefined) {
    throw new Error("useTetris must be used within a TetrisProvider");
  }

  return context;
};
