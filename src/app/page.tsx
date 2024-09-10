"use client";
import { GameMenu, GameBoard, MobileControls } from "@/components";
import { useTetris } from "@/hooks/useTetris";

const Home = () => {
  const {
    consts: { grid, currentPiece, gameStatus, score, isMobile },
    funcs: { newGame, pauseGame, resumeGame, movePiece, movePieceDown, rotatePiece },
  } = useTetris();

  return (
    <div className="grid">
      <GameMenu score={score} gameStatus={gameStatus} newGame={newGame} pauseGame={pauseGame} resumeGame={resumeGame} />

      <GameBoard grid={grid} currentPiece={currentPiece} gameStatus={gameStatus} />

      {isMobile && <MobileControls movePiece={movePiece} movePieceDown={movePieceDown} rotatePiece={rotatePiece} />}
    </div>
  );
};

export default Home;
