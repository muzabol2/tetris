"use client";
import { BLOCK_SIZE } from "./constants";
import { GameStatus } from "./types";
import { TetrisGameLogic } from "./useTetris";

const TetrisGame = () => {
  const {
    consts: { grid, currentPiece, gameStatus, score },
    funcs: { newGame, pauseGame, resumeGame },
  } = TetrisGameLogic();

  return (
    <div className="grid">
      {/* Control Section */}
      <div className="flex items-center justify-between p-1">
        <span className="rounded border border-border px-2 py-1 font-semibold text-foreground">Score: {score}</span>

        {gameStatus !== GameStatus.NOT_STARTED &&
          gameStatus !== GameStatus.GAME_OVER &&
          (gameStatus === GameStatus.RUNNING ? (
            <button onClick={pauseGame} className="rounded bg-yellow-500 px-2 py-1 text-buttonText hover:bg-yellow-700">
              Pause
            </button>
          ) : (
            <button onClick={resumeGame} className="rounded bg-blue-500 px-2 py-1 text-buttonText hover:bg-blue-700">
              Resume
            </button>
          ))}

        <button onClick={newGame} className="rounded bg-buttonBg px-2 py-1 text-buttonText hover:bg-green-700">
          New Game
        </button>
      </div>

      {/* Game Board */}
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
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-2xl text-white">
            Game Over
          </div>
        )}
      </div>
    </div>
  );
};

export { TetrisGame };
