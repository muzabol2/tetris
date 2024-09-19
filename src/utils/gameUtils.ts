"use client";

import { getDefaultColors } from "./getDefaultColors";
import { COLS, LINES_PER_LEVEL, ROWS, SCORE_INCREMENT, SHAPES } from "@/constants";
import { GameStatus } from "@/enums";
import type { GameState, Grid, Piece } from "@/types";

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

const getRandomPiece = (colors: Record<string, string>): Piece => {
  const keys = Object.keys(SHAPES);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];

  return {
    shape: SHAPES[randomKey].shape,
    color: colors[randomKey] || SHAPES[randomKey].color,
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

const movePiece = (piece: Piece, dx: number, dy: number): Piece => ({
  ...piece,
  x: piece.x + dx,
  y: piece.y + dy,
});

const rotatePiece = (piece: Piece): Piece => {
  const rotatedShape = piece.shape[0].map((_, i) => piece.shape.map((row) => row[i])).reverse();

  return {
    ...piece,
    shape: rotatedShape,
  };
};

const hardDropPiece = (piece: Piece, grid: Grid): Piece => {
  const droppedPiece = { ...piece };

  while (!isCollision({ ...droppedPiece, y: droppedPiece.y + 1 }, grid)) {
    droppedPiece.y += 1;
  }

  return droppedPiece;
};

export {
  calculateSpeed,
  createNewGameState,
  getRandomPiece,
  handleLineClearing,
  hardDropPiece,
  initialState,
  isCollision,
  movePiece,
  rotatePiece,
};
