"use client";

import { GameBoard, GameMenu, MobileControls } from "@/components";
import { useIsMobile, useTetris } from "@/hooks";

const Home = () => {
  const {
    consts: { gameState },
    funcs: { newGame, togglePauseResume, movePiece, movePieceDown, hardDrop, rotatePiece },
  } = useTetris();
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col">
      <div className="flex gap-1">
        <GameBoard {...gameState} rotatePiece={rotatePiece} />
        <GameMenu gameState={gameState} newGame={newGame} togglePauseResume={togglePauseResume} />
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
