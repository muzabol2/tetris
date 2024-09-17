import { TetrisAction as A, GameStatus as S } from "@/enums";
import type { GameActions, GameState } from "@/types";
import { createNewGameState, getRandomPiece, handleLineClearing, isCollision } from "@/utils";

const tetrisReducer = (state: GameState, action: GameActions): GameState => {
  switch (action.type) {
    case A.NEW_GAME:
      return createNewGameState(state.colors);

    case A.TOGGLE_PAUSE_RESUME:
      return {
        ...state,
        gameStatus: state.gameStatus === S.PAUSED ? S.RUNNING : S.PAUSED,
      };

    case A.MOVE_PIECE:
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

    case A.HARD_DROP:
      const hardDropPiece = { ...state.currentPiece! };

      while (!isCollision({ ...hardDropPiece, y: hardDropPiece.y + 1 }, state.grid)) {
        hardDropPiece.y += 1;
      }

      return { ...state, currentPiece: hardDropPiece };

    case A.ROTATE_PIECE:
      const rotatedShape = state
        .currentPiece!.shape[0].map((_, i) => state.currentPiece!.shape.map((row) => row[i]))
        .reverse();
      const rotatedPiece = { ...state.currentPiece!, shape: rotatedShape };

      if (!isCollision(rotatedPiece, state.grid)) {
        return { ...state, currentPiece: rotatedPiece };
      }

      return state;

    case A.MOVE_PIECE_DOWN:
      const movedPiece = { ...state.currentPiece!, y: state.currentPiece!.y + 1 };

      if (!isCollision(movedPiece, state.grid)) {
        return { ...state, currentPiece: movedPiece };
      } else {
        // Merge the piece into the grid
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

        return {
          ...state,
          grid: updatedGrid,
          score: newScore,
          level: newLevel,
          currentPiece: state.nextPiece,
          nextPiece: getRandomPiece(state.colors),
        };
      }

    case A.HANDLE_PIECE_MOVEMENT:
      const { newPiece: piece } = action.payload;

      if (!isCollision(piece, state.grid)) {
        return { ...state, currentPiece: piece };
      } else {
        const newGrid = state.grid.map((row) => row.slice());

        piece.shape.forEach((row, y) =>
          row.forEach((value, x) => {
            if (value) {
              newGrid[piece.y + y][piece.x + x] = {
                filled: true,
                color: piece.color,
              };
            }
          })
        );
        const { updatedGrid, newScore, newLevel } = handleLineClearing(newGrid, state.score, state.level);

        return {
          ...state,
          grid: updatedGrid,
          score: newScore,
          level: newLevel,
          currentPiece: state.nextPiece,
          nextPiece: getRandomPiece(state.colors),
        };
      }

    case A.MERGE_PIECE_TO_GRID:
      const { piece: mergePiece } = action.payload;
      const mergedGrid = state.grid.map((row) => row.slice());

      mergePiece.shape.forEach((row, y) =>
        row.forEach((value, x) => {
          if (value) {
            mergedGrid[mergePiece.y + y][mergePiece.x + x] = {
              filled: true,
              color: mergePiece.color,
            };
          }
        })
      );

      const { updatedGrid, newScore, newLevel } = handleLineClearing(mergedGrid, state.score, state.level);

      return {
        ...state,
        grid: updatedGrid,
        score: newScore,
        level: newLevel,
      };

    case A.SPAWN_NEXT_PIECE:
      return {
        ...state,
        currentPiece: state.nextPiece,
        nextPiece: getRandomPiece(state.colors),
      };

    default:
      return state;
  }
};

export { tetrisReducer };
