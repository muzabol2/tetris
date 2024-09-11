"use client";
import { COLS, ROWS } from "@/constants";
import { GameStatus, type Piece } from "@/types";
import { ActivePiece } from "./ActivePiece";
import { useBlockSize } from "@/hooks";

type Props = {
  grid: number[][];
  currentPiece: Piece | null;
  gameStatus: GameStatus;
};

const GameBoard = ({ grid, currentPiece, gameStatus }: Props) => {
  const blockSize = useBlockSize();

  return (
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
        <div
          key={index}
          className={`border ${cell ? "bg-gray-700" : "bg-gray-100"}`}
          style={{
            width: `${blockSize}px`,
            height: `${blockSize}px`,
            boxSizing: "border-box",
          }}
        />
      ))}
      {currentPiece && <ActivePiece currentPiece={currentPiece} />}
      {gameStatus === GameStatus.GAME_OVER && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-2xl text-white">
          Game Over
        </div>
      )}
    </div>
  );
};

export { GameBoard };
