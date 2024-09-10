type PieceShape = number[][];

type Piece = {
  shape: PieceShape;
  x: number;
  y: number;
};

enum GameStatus {
  NOT_STARTED = "Not Started",
  RUNNING = "Running",
  PAUSED = "Paused",
  GAME_OVER = "Game Over",
}

export { GameStatus };
export type { Piece, PieceShape };
