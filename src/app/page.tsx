"use client";

import { TetrisGame } from "@/components";

const Home = () => {
  return (
    <div className="relative w-[320px] h-[640px] border border-gray-500 bg-gray-100 dark:bg-gray-900 shadow-lg grid grid-cols-10 grid-rows-20">
      <TetrisGame />
    </div>
  );
};

export default Home;
