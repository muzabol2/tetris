"use client";
import { GameMenu, GameBoard, MobileControls } from "@/components";
import { useIsMobile, useTetris } from "@/hooks";

const Home = () => {
  const {
    consts: { grid, currentPiece, gameStatus, score },
    funcs: { newGame, pauseGame, resumeGame, movePiece, movePieceDown, hardDrop, rotatePiece },
  } = useTetris();
  const isMobile = useIsMobile();

  return (
    <div className="grid">
      <GameMenu score={score} gameStatus={gameStatus} newGame={newGame} pauseGame={pauseGame} resumeGame={resumeGame} />

      <GameBoard grid={grid} currentPiece={currentPiece} gameStatus={gameStatus} />

      {isMobile && (
        <MobileControls
          movePiece={movePiece}
          movePieceDown={movePieceDown}
          hardDrop={hardDrop}
          rotatePiece={rotatePiece}
        />
      )}
    </div>
  );
};

export default Home;
