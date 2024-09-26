"use client";

import type { Actions } from "./actions";
import { GameStatus, TetrisAction } from "@/enums";
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
    case TetrisAction.NEW_GAME:
      return createNewGameState(state.colors, state.highScore);

    case TetrisAction.TOGGLE_PAUSE_RESUME:
      return {
        ...state,
        gameStatus: state.gameStatus === GameStatus.PAUSED ? GameStatus.RUNNING : GameStatus.PAUSED,
      };

    case TetrisAction.MOVE_PIECE: {
      const { dx, dy } = action.payload;
      const newPiece = movePiece(state.currentPiece!, dx, dy);

      if (isCollision(newPiece, state.grid)) {
        return state;
      }

      return { ...state, currentPiece: newPiece };
    }

    case TetrisAction.MOVE_PIECE_DOWN: {
      const newPiece = movePiece(state.currentPiece!, 0, 1);

      return reducer(state, { type: TetrisAction.HANDLE_PIECE_MOVEMENT, payload: { newPiece } });
    }

    case TetrisAction.HARD_DROP: {
      const droppedPiece = hardDropPiece(state.currentPiece!, state.grid);

      return reducer(state, { type: TetrisAction.HANDLE_PIECE_MOVEMENT, payload: { newPiece: droppedPiece } });
    }

    case TetrisAction.ROTATE_PIECE: {
      const rotatedPiece = rotatePiece(state.currentPiece!);

      return reducer(state, { type: TetrisAction.HANDLE_PIECE_MOVEMENT, payload: { newPiece: rotatedPiece } });
    }

    case TetrisAction.HANDLE_PIECE_MOVEMENT: {
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
          gameStatus: GameStatus.GAME_OVER,
          highScore: Math.max(state.highScore, newScore),
        }),
      };
    }

    case TetrisAction.SET_COLORS:
      return {
        ...state,
        colors: action.payload.colors,
      };

    default:
      return state;
  }
};

export { reducer };
