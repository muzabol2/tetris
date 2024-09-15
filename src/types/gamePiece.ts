type GridCell = {
  filled: boolean;
  color: string;
};

type Piece = {
  shape: number[][];
  color: string;
  x: number;
  y: number;
};

export type { GridCell, Piece };
