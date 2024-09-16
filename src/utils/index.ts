"use client";
import { COLS, LINES_PER_LEVEL, ROWS, SCORE_INCREMENT, SHAPES } from "@/constants";
import { GameStatus } from "@/enums";
import type { Grid, Piece, GameState } from "@/types";

const createEmptyRow = () => Array.from({ length: COLS }, () => ({ filled: false, color: "transparent" }));

const createEmptyGrid = (): Grid => Array.from({ length: ROWS }, createEmptyRow);

const calculateSpeed = (level: number) => Math.max(1000 - level * 100, 100);

const initialState: GameState = {
  grid: createEmptyGrid(),
  currentPiece: null,
  nextPiece: null,
  gameStatus: GameStatus.NOT_STARTED,
  score: 0,
  highScore: 0,
  level: 1,
};

const createNewGameState = (): GameState => ({
  ...initialState,
  currentPiece: getRandomPiece(),
  nextPiece: getRandomPiece(),
  gameStatus: GameStatus.RUNNING,
});

const getRandomPiece = (): Piece => {
  const keys = Object.keys(SHAPES);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];

  return {
    shape: SHAPES[randomKey].shape,
    color: SHAPES[randomKey].color,
    x: Math.floor(COLS / 2) - Math.floor(SHAPES[randomKey].shape[0].length / 2),
    y: 0,
  };
};

const isCollision = (piece: Piece | null, grid: Grid): boolean => {
  if (!piece) return true;

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const newY = piece.y + y;
        const newX = piece.x + x;

        // Check if the piece is out of bounds
        if (newY >= ROWS || newX < 0 || newX >= COLS) {
          return true;
        }

        // Check if the piece collides with a filled cell in the grid
        if (newY >= 0 && grid[newY][newX].filled) {
          return true;
        }
      }
    }
  }

  return false;
};

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

export { calculateSpeed, createNewGameState, getRandomPiece, handleLineClearing, initialState, isCollision };
