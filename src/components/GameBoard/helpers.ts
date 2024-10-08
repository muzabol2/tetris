"use client";

import { BLOCK_SIZE, COLS, ROWS } from "@/constants";
import { TetrisAction } from "@/enums";
import { useTetrisContext } from "@/hooks";
import { useEffect, useState } from "react";

const useHelpers = () => {
  const [blockSize, setBlockSize] = useState<number>(BLOCK_SIZE);
  const {
    state: { grid, currentPiece, gameStatus },
    dispatch,
  } = useTetrisContext();

  const rotatePiece = () => {
    dispatch({ type: TetrisAction.ROTATE_PIECE });
  };

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

  return { grid, currentPiece, gameStatus, rotatePiece, blockSize };
};

export { useHelpers };
