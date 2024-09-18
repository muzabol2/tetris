"use client";

import { GAME_STATE_KEY } from "@/constants";
import { TetrisAction as A, GameStatus as S } from "@/enums";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { tetrisReducer } from "@/reducers";
import type { GameActions, GameState } from "@/types";
import { calculateSpeed, initialState } from "@/utils";
import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react";

type TetrisContextType = {
  state: GameState;
  dispatch: React.Dispatch<GameActions>;
};

const TetrisContext = createContext<TetrisContextType | undefined>(undefined);

const TetrisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [localState, setLocalState] = useLocalStorage<GameState>(GAME_STATE_KEY, initialState);
  const [state, dispatch] = useReducer(tetrisReducer, localState);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const enhancedDispatch = useCallback((action: GameActions) => {
    dispatch(action);
  }, []);

  useEffect(() => {
    setLocalState(state);
  }, [state.currentPiece, state.colors]);

  useEffect(() => {
    if (state.gameStatus === S.RUNNING && state.currentPiece) {
      const speed = calculateSpeed(state.level);
      const interval = setInterval(() => enhancedDispatch({ type: A.MOVE_PIECE_DOWN }), speed);

      return () => clearInterval(interval);
    }
  }, [state.currentPiece, state.gameStatus, state.level, enhancedDispatch]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!state.currentPiece || state.gameStatus !== S.RUNNING) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          enhancedDispatch({ type: A.MOVE_PIECE, payload: { dx: -1, dy: 0 } });
          break;
        case "ArrowRight":
          enhancedDispatch({ type: A.MOVE_PIECE, payload: { dx: 1, dy: 0 } });
          break;
        case "ArrowDown":
          enhancedDispatch({ type: A.MOVE_PIECE_DOWN });
          break;
        case "ArrowUp":
          enhancedDispatch({ type: A.ROTATE_PIECE });
          break;
        case " ":
          enhancedDispatch({ type: A.HARD_DROP });
          break;
      }
    },
    [state.currentPiece, state.gameStatus, enhancedDispatch]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  if (!isMounted) {
    return null;
  }

  return <TetrisContext.Provider value={{ state, dispatch: enhancedDispatch }}>{children}</TetrisContext.Provider>;
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
