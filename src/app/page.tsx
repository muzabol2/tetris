"use client";
import { GameMenu, GameBoard, MobileControls } from "@/components";
import { useIsMobile, useTetris } from "@/hooks";

const Home = () => {
  const {
    consts: { gameState },
    funcs: { newGame, pauseGame, resumeGame, movePiece, movePieceDown, hardDrop, rotatePiece },
  } = useTetris();
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col">
      <div className="flex gap-1">
        <GameBoard {...gameState} />
        <GameMenu {...gameState} newGame={newGame} pauseGame={pauseGame} resumeGame={resumeGame} />
      </div>

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
