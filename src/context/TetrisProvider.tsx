"use client";

import { TetrisContext } from "./TetrisContext";
import { useTetrisActions } from "./actions/useTetrisActions";
import { LoadingSpinner } from "@/components";
import React from "react";

const TetrisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state, dispatch, isLoaded } = useTetrisActions();

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return <TetrisContext.Provider value={{ state, dispatch }}>{children}</TetrisContext.Provider>;
};

export { TetrisProvider };
