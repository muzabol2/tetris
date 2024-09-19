import { useLocalStorage } from "./useLocalStorage";
import { GAME_STATE_KEY } from "@/constants";
import { TetrisAction as A, GameStatus as S } from "@/enums";
import { tetrisReducer } from "@/reducers";
import type { GameActions, GameState } from "@/types";
import { calculateSpeed, initialState } from "@/utils";
import { useCallback, useEffect, useReducer, useState } from "react";

const useGameState = () => {
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

  return { state, dispatch: enhancedDispatch, isMounted };
};

export { useGameState };
