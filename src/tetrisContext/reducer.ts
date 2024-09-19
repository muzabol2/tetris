import type { Actions } from "./actions";
import { TetrisAction as A, GameStatus as S } from "@/enums";
import type { GameState } from "@/types";
import { createNewGameState, getRandomPiece, handleLineClearing, isCollision } from "@/utils";

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
      const newPiece = {
        ...state.currentPiece!,
        x: state.currentPiece!.x + dx,
        y: state.currentPiece!.y + dy,
      };

      if (!isCollision(newPiece, state.grid)) {
        return { ...state, currentPiece: newPiece };
      }

      return state;
    }

    case A.MOVE_PIECE_DOWN: {
      const newPiece = {
        ...state.currentPiece!,
        y: state.currentPiece!.y + 1,
      };

      return reducer(state, { type: A.HANDLE_PIECE_MOVEMENT, payload: { newPiece } });
    }

    case A.HARD_DROP: {
      const hardDropPiece = { ...state.currentPiece! };

      while (!isCollision({ ...hardDropPiece, y: hardDropPiece.y + 1 }, state.grid)) {
        hardDropPiece.y += 1;
      }

      return reducer(state, { type: A.HANDLE_PIECE_MOVEMENT, payload: { newPiece: hardDropPiece } });
    }

    case A.ROTATE_PIECE: {
      const rotatedShape = state
        .currentPiece!.shape[0].map((_, i) => state.currentPiece!.shape.map((row) => row[i]))
        .reverse();
      const rotatedPiece = { ...state.currentPiece!, shape: rotatedShape };

      return reducer(state, { type: A.HANDLE_PIECE_MOVEMENT, payload: { newPiece: rotatedPiece } });
    }

    case A.HANDLE_PIECE_MOVEMENT: {
      const { newPiece } = action.payload;

      if (!isCollision(newPiece, state.grid)) {
        return { ...state, currentPiece: newPiece };
      } else {
        const newGrid = state.grid.map((row) => row.slice());

        state.currentPiece!.shape.forEach((row, y) =>
          row.forEach((value, x) => {
            if (value) {
              newGrid[state.currentPiece!.y + y][state.currentPiece!.x + x] = {
                filled: true,
                color: state.currentPiece!.color,
              };
            }
          })
        );

        const { updatedGrid, newScore, newLevel } = handleLineClearing(newGrid, state.score, state.level);

        const nextPiece = getRandomPiece(state.colors);

        if (isCollision(nextPiece, updatedGrid)) {
          return {
            ...state,
            grid: updatedGrid,
            score: newScore,
            level: newLevel,
            gameStatus: S.GAME_OVER,
            highScore: Math.max(state.highScore, newScore),
          };
        }

        return {
          ...state,
          grid: updatedGrid,
          score: newScore,
          level: newLevel,
          currentPiece: state.nextPiece,
          nextPiece,
        };
      }
    }

    case A.SPAWN_NEXT_PIECE:
      return {
        ...state,
        currentPiece: state.nextPiece,
        nextPiece: getRandomPiece(state.colors),
      };

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
