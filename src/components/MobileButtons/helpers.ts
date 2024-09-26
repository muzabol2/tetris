"use client";

import { TetrisAction as A } from "@/enums";
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
    dispatch({ type: A.MOVE_PIECE_DOWN });
  };

  const hardDrop = () => {
    dispatch({ type: A.HARD_DROP });
  };

  const rotatePiece = () => {
    dispatch({ type: A.ROTATE_PIECE });
  };

  const movePiece = (direction: number) => {
    dispatch({ type: A.MOVE_PIECE, payload: { dx: direction, dy: 0 } });
  };

  return { isMobile, movePieceDown, hardDrop, rotatePiece, movePiece };
};

export { useHelpers };
