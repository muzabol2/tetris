import { getDefaultColors } from "./colorUtils";
import { createEmptyGrid, createEmptyRow } from "./gridUtils";
import { getRandomPiece } from "./pieceUtils";
import { LINES_PER_LEVEL, ROWS, SCORE_INCREMENT } from "@/constants";
import { GameStatus } from "@/enums";
import type { GameState, Grid } from "@/types";

const calculateSpeed = (level: number): number => Math.max(1000 - level * 100, 100);

const initialState: GameState = {
  grid: createEmptyGrid(),
  currentPiece: null,
  nextPiece: null,
  gameStatus: GameStatus.NOT_STARTED,
  score: 0,
  highScore: 0,
  level: 1,
  colors: getDefaultColors(),
};

const createNewGameState = (colors: Record<string, string>, highScore: number): GameState => ({
  ...initialState,
  currentPiece: getRandomPiece(colors),
  nextPiece: getRandomPiece(colors),
  gameStatus: GameStatus.RUNNING,
  highScore,
  colors,
});

const handleLineClearing = (grid: Grid, score: number, level: number) => {
  const updatedGrid = grid.filter((row) => row.some((cell) => !cell.filled));
  const linesCleared = ROWS - updatedGrid.length;

  if (linesCleared === 0) {
    return {
      updatedGrid: grid,
      newScore: score,
      newLevel: level,
    };
  }

  const emptyRows = Array.from({ length: linesCleared }, () => createEmptyRow());
  const newScore = score + linesCleared * SCORE_INCREMENT;
  const newLevel = Math.floor(newScore / (LINES_PER_LEVEL * SCORE_INCREMENT)) + 1;

  return {
    updatedGrid: [...emptyRows, ...updatedGrid],
    newScore,
    newLevel,
  };
};

export { calculateSpeed, createNewGameState, handleLineClearing, initialState };
