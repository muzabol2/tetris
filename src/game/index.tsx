"use client";

import { TetrisGameLogic } from "./useTetris";
import { ControlSection } from "./ControlSection";
import { GameBoard } from "./GameBoard";

const TetrisGame = () => {
  const {
    consts: { grid, currentPiece, gameStatus, score },
    funcs: { newGame, pauseGame, resumeGame },
  } = TetrisGameLogic();

  return (
    <div className="grid">
      <ControlSection
        score={score}
        gameStatus={gameStatus}
        newGame={newGame}
        pauseGame={pauseGame}
        resumeGame={resumeGame}
      />

      <GameBoard grid={grid} currentPiece={currentPiece} gameStatus={gameStatus} />
    </div>
  );
};

export { TetrisGame };
