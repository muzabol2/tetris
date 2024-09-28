import { COLS, ROWS, SHAPES } from "@/constants";
import type { Grid, Piece } from "@/types";

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

export { getRandomPiece, hardDropPiece, isCollision, movePiece, rotatePiece };
