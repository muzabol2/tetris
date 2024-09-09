import type { PieceShape } from "./types";

const BLOCK_SIZE = 30;
const COLS = 10;
const ROWS = 20;

const SHAPES: Record<string, PieceShape> = {
  I: [[1, 1, 1, 1]],
  J: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  L: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
};

export { BLOCK_SIZE, COLS, ROWS, SHAPES };
