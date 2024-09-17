"use client";

import { useTetrisContext } from "@/context";
import { TetrisAction as A, GameStatus as S } from "@/enums";
import { useCallback, useEffect } from "react";

const useTetris = () => {
  const { state, dispatch } = useTetrisContext();

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!state.currentPiece || state.gameStatus !== S.RUNNING) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          dispatch({ type: A.MOVE_PIECE, payload: { dx: -1, dy: 0 } });
          break;
        case "ArrowRight":
          dispatch({ type: A.MOVE_PIECE, payload: { dx: 1, dy: 0 } });
          break;
        case "ArrowDown":
          dispatch({ type: A.MOVE_PIECE_DOWN });
          break;
        case "ArrowUp":
          dispatch({ type: A.ROTATE_PIECE });
          break;
        case " ":
          dispatch({ type: A.HARD_DROP });
          break;
      }
    },
    [state.currentPiece, state.gameStatus, dispatch]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);
};

export { useTetris };
