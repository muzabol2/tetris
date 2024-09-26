"use client";

import { reducer } from "../reducer";
import type { Actions } from "./actions";
import { GAME_STATE_KEY, GAME_VERSION } from "@/constants";
import { TetrisAction as A, GameStatus as S } from "@/enums";
import type { GameState } from "@/types";
import { calculateSpeed, initialState } from "@/utils";
import { useCallback, useEffect, useReducer, useState } from "react";

const useTetrisActions = () => {
  const [localState, setLocalState] = useState<GameState>(() => {
    if (typeof window === "undefined") {
      return initialState;
    }

    const storedState = localStorage.getItem(GAME_STATE_KEY);

    if (storedState) {
      try {
        const parsedState = JSON.parse(storedState);

        if (parsedState.version === GAME_VERSION) {
          return parsedState.data;
        }
      } catch (error) {
        console.error("Error parsing localStorage item:", error);
      }
    }

    return initialState;
  });
  const [state, dispatch] = useReducer(reducer, localState ?? initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(GAME_STATE_KEY, JSON.stringify({ version: GAME_VERSION, data: localState }));
    }
  }, [localState.nextPiece, localState.colors, isLoaded]);

  const enhancedDispatch = useCallback(
    (action: Actions) => {
      dispatch(action);
      if (action.type !== A.SET_COLORS) {
        setLocalState(state);
      }
    },
    [state?.currentPiece, state?.colors]
  );

  useEffect(() => {
    if (state?.gameStatus === S.RUNNING && state?.currentPiece) {
      const speed = calculateSpeed(state?.level ?? 1);
      const interval = setInterval(() => enhancedDispatch({ type: A.MOVE_PIECE_DOWN }), speed);

      return () => clearInterval(interval);
    }
  }, [state?.currentPiece, state?.colors]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!state?.currentPiece || state?.gameStatus !== S.RUNNING) {
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
    [state?.currentPiece, state?.gameStatus]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return { state, dispatch: enhancedDispatch, isLoaded };
};

export { useTetrisActions };
