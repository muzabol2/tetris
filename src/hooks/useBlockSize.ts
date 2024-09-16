"use client";

import { BLOCK_SIZE, COLS, ROWS } from "@/constants";
import { useEffect, useState } from "react";

const useBlockSize = () => {
  const [blockSize, setBlockSize] = useState<number>(BLOCK_SIZE);

  useEffect(() => {
    const calculateBlockSize = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const maxBlockSizeByWidth = Math.floor(viewportWidth / COLS);
      const maxBlockSizeByHeight = Math.floor(viewportHeight / ROWS);

      setBlockSize(Math.min(maxBlockSizeByWidth, maxBlockSizeByHeight) - 8);
    };

    window.addEventListener("resize", calculateBlockSize);
    calculateBlockSize();

    return () => window.removeEventListener("resize", calculateBlockSize);
  }, []);

  return blockSize;
};

export { useBlockSize };
