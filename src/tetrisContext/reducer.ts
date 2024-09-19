"use client";

import type { Actions } from "./actions";
import { TetrisAction as A, GameStatus as S } from "@/enums";
import type { GameState } from "@/types";
import {
  createNewGameState,
  getRandomPiece,
  handleLineClearing,
  hardDropPiece,
  isCollision,
  movePiece,
  rotatePiece,
  updateGridWithPiece,
} from "@/utils";

const reducer = (state: GameState, action: Actions): GameState => {
  switch (action.type) {
    case A.NEW_GAME:
      return createNewGameState(state.colors, state.highScore);

    case A.TOGGLE_PAUSE_RESUME:
      return {
        ...state,
        gameStatus: state.gameStatus === S.PAUSED ? S.RUNNING : S.PAUSED,
      };

    case A.MOVE_PIECE: {
      const { dx, dy } = action.payload;
      const newPiece = movePiece(state.currentPiece!, dx, dy);

      if (isCollision(newPiece, state.grid)) {
        return state;
      }

      return { ...state, currentPiece: newPiece };
    }

    case A.MOVE_PIECE_DOWN: {
      const newPiece = movePiece(state.currentPiece!, 0, 1);

      return reducer(state, { type: A.HANDLE_PIECE_MOVEMENT, payload: { newPiece } });
    }

    case A.HARD_DROP: {
      const droppedPiece = hardDropPiece(state.currentPiece!, state.grid);

      return reducer(state, { type: A.HANDLE_PIECE_MOVEMENT, payload: { newPiece: droppedPiece } });
    }

    case A.ROTATE_PIECE: {
      const rotatedPiece = rotatePiece(state.currentPiece!);

      return reducer(state, { type: A.HANDLE_PIECE_MOVEMENT, payload: { newPiece: rotatedPiece } });
    }

    case A.HANDLE_PIECE_MOVEMENT: {
      const { newPiece } = action.payload;

      if (!isCollision(newPiece, state.grid)) {
        return { ...state, currentPiece: newPiece };
      }

      const newGrid = updateGridWithPiece(state.grid, state.currentPiece!);
      const { updatedGrid, newScore, newLevel } = handleLineClearing(newGrid, state.score, state.level);
      const nextPiece = getRandomPiece(state.colors);
      const isGameOver = isCollision(nextPiece, updatedGrid);

      return {
        ...state,
        grid: updatedGrid,
        score: newScore,
        level: newLevel,

        ...(!isGameOver && {
          currentPiece: state.nextPiece,
          nextPiece,
        }),

        ...(isGameOver && {
          gameStatus: S.GAME_OVER,
          highScore: Math.max(state.highScore, newScore),
        }),
      };
    }

    case A.SET_COLORS:
      return {
        ...state,
        colors: action.payload.colors,
      };

    default:
      return state;
  }
};

export { reducer };
