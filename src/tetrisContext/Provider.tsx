"use client";

import { Context } from "./Context";
import { useGameState } from "./hooks/useGameState";
import React from "react";

const TetrisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state, dispatch, isMounted } = useGameState();

  if (!isMounted) return null;

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export { TetrisProvider };
