"use client";

import { BLOCK_SIZE } from "@/constants";
import { TetrisGameLogic } from "./useTetris";

const TetrisGame = () => {
  const { grid, currentPiece, isGameOver, score } = TetrisGameLogic();

  return (
    <div className="relative border border-gray-500 bg-gray-100 dark:bg-gray-900 shadow-lg grid grid-cols-10 grid-rows-20">
      <div className="absolute top-0 right-0 text-white bg-gray-800 dark:bg-black bg-opacity-75 p-1">
        Score: {score}
      </div>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`grid ${cell ? "bg-gray-700" : "bg-gray-100"}`}
            style={{
              width: `${BLOCK_SIZE}px`,
              height: `${BLOCK_SIZE}px`,
            }}
          />
        ))
      )}
      {currentPiece && (
        <div
          className="absolute grid"
          style={{
            top: `${currentPiece.y * BLOCK_SIZE}px`,
            left: `${currentPiece.x * BLOCK_SIZE}px`,
            width: `${currentPiece.shape[0].length * BLOCK_SIZE}px`,
            height: `${currentPiece.shape.length * BLOCK_SIZE}px`,
            gridTemplateColumns: `repeat(${currentPiece.shape[0].length}, ${BLOCK_SIZE}px)`,
            gridTemplateRows: `repeat(${currentPiece.shape.length}, ${BLOCK_SIZE}px)`,
          }}
        >
          {currentPiece.shape.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-[${BLOCK_SIZE}px] h-[${BLOCK_SIZE}px] ${cell ? "bg-gray-700" : "bg-transparent"}`}
              />
            ))
          )}
        </div>
      )}
      {isGameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl">
          Game Over
        </div>
      )}
    </div>
  );
};

export { TetrisGame };
