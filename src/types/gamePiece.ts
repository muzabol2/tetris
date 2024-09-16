import type { GameStatus } from "@/enums";

type Grid = {
  filled: boolean;
  color: string;
}[][];

type Piece = {
  shape: number[][];
  color: string;
  x: number;
  y: number;
};

type GameState = {
  grid: Grid;
  currentPiece: Piece | null;
  score: number;
  gameStatus: GameStatus;
  nextPiece: Piece | null;
  highScore: number;
};

export type { GameState, Grid, Piece };
