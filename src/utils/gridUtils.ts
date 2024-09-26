import { COLS, ROWS } from "@/constants";
import type { Grid, Piece } from "@/types";

const createEmptyRow = () => Array.from({ length: COLS }, () => ({ filled: false, color: "transparent" }));

const createEmptyGrid = (): Grid => Array.from({ length: ROWS }, createEmptyRow);

const updateGridWithPiece = (grid: Grid, piece: Piece): Grid => {
  const newGrid = grid.map((row) => row.slice());

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

  return newGrid;
};

export { createEmptyGrid, createEmptyRow, updateGridWithPiece };
