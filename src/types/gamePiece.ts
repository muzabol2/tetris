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
  version: string;
  grid: Grid;
  currentPiece: Piece | null;
  nextPiece: Piece | null;
  gameStatus: GameStatus;
  level: number;
  score: number;
  highScore: number;
  colors: Record<string, string>;
};

export type { GameState, Grid, Piece };
