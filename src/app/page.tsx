"use client";

import { GameBoard, GameMenu, MobileControls } from "@/components";
import { useIsMobile, useTetris } from "@/hooks";

const Home = () => {
  useTetris();
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col">
      <div className="flex gap-1">
        <GameBoard />
        <GameMenu />
      </div>

      {isMobile && <MobileControls />}
    </div>
  );
};

export default Home;
