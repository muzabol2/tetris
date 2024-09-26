"use client";

import { TetrisContext } from "../context/TetrisContext";
import { useContext } from "react";

const useTetrisContext = () => {
  const context = useContext(TetrisContext);

  if (context === undefined) {
    throw new Error("useTetris must be used within a TetrisProvider");
  }

  return context;
};

export { useTetrisContext };
