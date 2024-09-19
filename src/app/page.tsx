"use client";

import { GameBoard, GameMenu, MobileButtons } from "@/components";

const Home = () => (
  <div className="flex flex-col">
    <div className="flex gap-1">
      <GameBoard />
      <GameMenu />
    </div>

    <MobileButtons />
  </div>
);

export default Home;
