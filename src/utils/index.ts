"use client";
import { COLS, ROWS, SHAPES } from "@/constants";
import { GameStatus } from "@/enums";
import type { Grid, Piece, GameState } from "@/types";

const createEmptyRow = () => Array.from({ length: COLS }, () => ({ filled: false, color: "transparent" }));

const createEmptyGrid = (): Grid => Array.from({ length: ROWS }, createEmptyRow);

const initialState: GameState = {
  grid: createEmptyGrid(),
  currentPiece: null,
  score: 0,
  gameStatus: GameStatus.NOT_STARTED,
  nextPiece: null,
  highScore: 0,
};

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

export { createEmptyGrid, createEmptyRow, getRandomPiece, initialState, isCollision };
