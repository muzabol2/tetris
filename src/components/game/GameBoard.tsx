"use client";
import { COLS, ROWS } from "@/constants";
import { type GridCell, GameStatus, type Piece } from "@/types";
import { ActivePiece } from "./ActivePiece";
import { useBlockSize } from "@/hooks";
import { Block } from "./Block";

type Props = {
  grid: GridCell[][];
  currentPiece: Piece | null;
  gameStatus: GameStatus;
};

const GameBoard = ({ grid, currentPiece, gameStatus }: Props) => {
  const blockSize = useBlockSize();

  return (
    <div className="flex h-full items-center justify-center">
      <div
        className="relative border border-border bg-background dark:bg-gray-900"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, ${blockSize}px)`,
          gridTemplateRows: `repeat(${ROWS}, ${blockSize}px)`,
          width: `${COLS * blockSize}px`,
          height: `${ROWS * blockSize}px`,
          boxSizing: "border-box",
        }}
      >
        {grid.flat().map((cell, index) => (
          <Block key={index} color={cell.color} size={blockSize} filled={cell.filled} />
        ))}
        {currentPiece && <ActivePiece currentPiece={currentPiece} />}
        {gameStatus === GameStatus.GAME_OVER && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-2xl text-white">
            Game Over
          </div>
        )}
      </div>
    </div>
  );
};

export { GameBoard };
