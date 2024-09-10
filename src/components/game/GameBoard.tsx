import { BLOCK_SIZE } from "@/constants";
import { GameStatus, type Piece } from "@/types";
import { ActivePiece } from "./ActivePiece";

interface Props {
  grid: number[][];
  currentPiece: Piece | null;
  gameStatus: GameStatus;
}

const GameBoard = ({ grid, currentPiece, gameStatus }: Props) => (
  <div className="grid-rows-20 relative grid grid-cols-10 border border-border bg-background shadow-lg dark:bg-gray-900">
    {grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <div
          key={`${rowIndex}-${colIndex}`}
          className={`grid border ${cell ? "bg-gray-700" : "bg-gray-100"}`}
          style={{
            width: `${BLOCK_SIZE}px`,
            height: `${BLOCK_SIZE}px`,
          }}
        />
      ))
    )}
    {currentPiece && <ActivePiece currentPiece={currentPiece} />}
    {gameStatus === GameStatus.GAME_OVER && (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-2xl text-white">
        Game Over
      </div>
    )}
  </div>
);

export { GameBoard };
