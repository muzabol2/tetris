"use client";

import { TetrisContext } from "./Context";
import { useGameState } from "./hooks/useGameState";
import React from "react";

const TetrisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state, dispatch, isLoaded } = useGameState();

  if (!isLoaded) {
    return <div>Loading...</div>; // TODO: Add a loading spinner
  }

  return <TetrisContext.Provider value={{ state, dispatch }}>{children}</TetrisContext.Provider>;
};

export { TetrisProvider };
