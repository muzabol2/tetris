"use client";

import { GameBoard, GameMenu, MobileButtons } from "@/components";
import { useIsMobile } from "@/hooks";

const Home = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col">
      <div className="flex gap-1">
        <GameBoard />
        <GameMenu />
      </div>

      {isMobile && <MobileButtons />}
    </div>
  );
};

export default Home;
