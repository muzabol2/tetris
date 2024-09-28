"use client";

import { TetrisAction } from "@/enums";
import { useTetrisContext } from "@/hooks";
import { useEffect, useState } from "react";

const useHelpers = () => {
  const { dispatch } = useTetrisContext();

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const movePieceDown = () => {
    dispatch({ type: TetrisAction.MOVE_PIECE_DOWN });
  };

  const hardDrop = () => {
    dispatch({ type: TetrisAction.HARD_DROP });
  };

  const rotatePiece = () => {
    dispatch({ type: TetrisAction.ROTATE_PIECE });
  };

  const movePiece = (direction: number) => {
    dispatch({ type: TetrisAction.MOVE_PIECE, payload: { dx: direction, dy: 0 } });
  };

  return { isMobile, movePieceDown, hardDrop, rotatePiece, movePiece };
};

export { useHelpers };
