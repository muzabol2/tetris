"use client";

import { useGameState } from "@/hooks/useGameState";
import type { GameActions, GameState } from "@/types";
import React, { createContext, useContext } from "react";

type TetrisContextType = {
  state: GameState;
  dispatch: React.Dispatch<GameActions>;
};

const TetrisContext = createContext<TetrisContextType | undefined>(undefined);

const TetrisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state, dispatch, isMounted } = useGameState();

  if (!isMounted) {
    return null;
  }

  return <TetrisContext.Provider value={{ state, dispatch: dispatch }}>{children}</TetrisContext.Provider>;
};

const useTetrisContext = () => {
  const context = useContext(TetrisContext);

  if (!context) {
    throw new Error("useTetrisContext must be used within a TetrisProvider");
  }

  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { TetrisProvider, useTetrisContext };
