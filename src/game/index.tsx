"use client";
import { BLOCK_SIZE, COLS } from "./constants";
import { GameStatus } from "./types";
import { TetrisGameLogic } from "./useTetris";

const TetrisGame = () => {
  const {
    consts: { grid, currentPiece, gameStatus, score },
    funcs: { newGame, pauseGame, resumeGame },
  } = TetrisGameLogic();

  return (
    <div className="grid gap-4">
      {/* Control Section */}
      <div className="p-2 bg-gray-800 text-white flex justify-between items-center">
        <span>Score: {score}</span>

        {gameStatus !== GameStatus.NOT_STARTED &&
          gameStatus !== GameStatus.GAME_OVER &&
          (gameStatus === GameStatus.RUNNING ? (
            <button onClick={pauseGame} className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded">
              Pause
            </button>
          ) : (
            <button onClick={resumeGame} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">
              Resume
            </button>
          ))}

        <button onClick={newGame} className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded">
          New Game
        </button>
      </div>

      {/* Game Board */}
      <div className="relative border border-gray-500 bg-gray-100 dark:bg-gray-900 shadow-lg grid grid-cols-10 grid-rows-20">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`border grid ${cell ? "bg-gray-700" : "bg-gray-100"}`}
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
                  className={`w-[${BLOCK_SIZE}px] h-[${BLOCK_SIZE}px] border ${cell ? "bg-gray-700" : "bg-transparent"}`}
                />
              ))
            )}
          </div>
        )}
        {gameStatus === GameStatus.GAME_OVER && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl">
            Game Over
          </div>
        )}
      </div>
    </div>
  );
};

export { TetrisGame };
