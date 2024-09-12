"use client";
import { GameMenu, GameBoard, MobileControls } from "@/components";
import { useIsMobile, useTetris } from "@/hooks";

const Home = () => {
  const {
    consts: { grid, currentPiece, nextPiece, gameStatus, score },
    funcs: { newGame, pauseGame, resumeGame, movePiece, movePieceDown, hardDrop, rotatePiece },
  } = useTetris();
  const isMobile = useIsMobile();

  return (
    <div className="flex">
      <div className="flex flex-col">
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

      <div className="flex flex-col">
        <GameMenu
          score={score}
          gameStatus={gameStatus}
          nextPiece={nextPiece}
          newGame={newGame}
          pauseGame={pauseGame}
          resumeGame={resumeGame}
        />
      </div>
    </div>
  );
};

export default Home;
