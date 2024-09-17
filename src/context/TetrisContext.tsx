"use client";

import { TetrisAction as A, GameStatus as S } from "@/enums";
import { tetrisReducer } from "@/reducers";
import type { GameActions, GameState } from "@/types";
import { calculateSpeed, initialState } from "@/utils";
import React, { createContext, useContext, useEffect, useReducer } from "react";

type TetrisContextType = {
  state: GameState;
  dispatch: React.Dispatch<GameActions>;
};

const TetrisContext = createContext<TetrisContextType | undefined>(undefined);

const TetrisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(tetrisReducer, initialState);

  useEffect(() => {
    if (state.gameStatus === S.RUNNING && state.currentPiece) {
      const speed = calculateSpeed(state.level);
      const interval = setInterval(() => dispatch({ type: A.MOVE_PIECE_DOWN }), speed);

      return () => clearInterval(interval);
    }
  }, [state.currentPiece, state.gameStatus, state.level, dispatch]);

  return <TetrisContext.Provider value={{ state, dispatch }}>{children}</TetrisContext.Provider>;
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
