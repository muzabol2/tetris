"use client";

import { BLOCK_SIZE } from "@/constants";
import { TetrisGameLogic } from "./useTetris";

const TetrisGame = () => {
  const { grid, currentPiece, isGameOver, score } = TetrisGameLogic();

  return (
    <div className="relative w-[320px] h-[640px] border border-gray-500 bg-gray-100 dark:bg-gray-900 shadow-lg grid grid-cols-10 grid-rows-20 gap-1">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-[${BLOCK_SIZE}px] h-[${BLOCK_SIZE}px] ${
              cell ? "bg-gray-700" : "bg-gray-100"
            }`}
          />
        ))
      )}
      {currentPiece && (
        <div
          className="absolute"
          style={{
            top: `${currentPiece.y * BLOCK_SIZE}px`,
            left: `${currentPiece.x * BLOCK_SIZE}px`,
            width: `${currentPiece.shape[0].length * BLOCK_SIZE}px`,
            height: `${currentPiece.shape.length * BLOCK_SIZE}px`,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "grid",
            gridTemplateColumns: `repeat(${currentPiece.shape[0].length}, ${BLOCK_SIZE}px)`,
            gridTemplateRows: `repeat(${currentPiece.shape.length}, ${BLOCK_SIZE}px)`,
            gap: "1px",
          }}
        >
          {currentPiece.shape.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-[${BLOCK_SIZE}px] h-[${BLOCK_SIZE}px] ${
                  cell ? "bg-gray-700" : "bg-transparent"
                }`}
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
      <div className="absolute bottom-0 right-0 p-2 text-white bg-gray-800">
        Score: {score}
      </div>
    </div>
  );
};

export { TetrisGame };
