"use client";
import { ControlSection, GameBoard } from "@/components";
import { useTetris } from "@/hooks/useTetris";

const Home = () => {
  const {
    consts: { grid, currentPiece, gameStatus, score },
    funcs: { newGame, pauseGame, resumeGame },
  } = useTetris();

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

export default Home;
