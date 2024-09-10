"use client";
import { COLS, ROWS, SHAPES } from "./constants";
import type { Piece } from "./types";

const getRandomPiece = (): Piece => {
  const keys = Object.keys(SHAPES);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];

  return {
    shape: SHAPES[randomKey],
    x: Math.floor(COLS / 2) - Math.floor(SHAPES[randomKey][0].length / 2),
    y: 0,
  };
};

const isCollision = (piece: Piece, grid: number[][]): boolean => {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (
        piece.shape[y][x] &&
        (piece.y + y >= ROWS || piece.x + x < 0 || piece.x + x >= COLS || grid[piece.y + y][piece.x + x])
      ) {
        return true;
      }
    }
  }

  return false;
};

export { getRandomPiece, isCollision };
