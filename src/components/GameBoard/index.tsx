"use client";

import { useHelpers } from "./helpers";
import { Block, PieceGrid } from "@/components/common";
import { COLS, ROWS } from "@/constants";
import { GameStatus } from "@/enums";

const GameBoard = () => {
  const { grid, currentPiece, gameStatus, rotatePiece, blockSize } = useHelpers();

  return (
    <div
      style={{
        position: "relative",
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

      {currentPiece && (
        <PieceGrid
          piece={currentPiece}
          blockSize={blockSize}
          style={{
            position: "absolute",
            top: `${currentPiece.y * blockSize}px`,
            left: `${currentPiece.x * blockSize}px`,
          }}
          onClick={rotatePiece}
        />
      )}

      {gameStatus === GameStatus.GAME_OVER && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-2xl text-white">
          Game Over
        </div>
      )}
    </div>
  );
};

export { GameBoard };
