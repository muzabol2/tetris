"use client";

import { useTetrisContext } from "@/context";
import { TetrisAction as A } from "@/enums";

const MobileControls = () => {
  const { dispatch } = useTetrisContext();

  const movePiece = (dx: number, dy: number = 0) => {
    dispatch({ type: A.MOVE_PIECE, payload: { dx, dy } });
  };

  const movePieceDown = () => {
    dispatch({ type: A.MOVE_PIECE_DOWN });
  };

  const hardDrop = () => {
    dispatch({ type: A.HARD_DROP });
  };

  const rotatePiece = () => {
    dispatch({ type: A.ROTATE_PIECE });
  };

  return (
    <div className="flex items-center justify-between py-1 space-x-2">
      <button onClick={() => movePiece(-1)} className="rounded bg-blue-500 px-4 py-2">
        ⬅️
      </button>
      <button onClick={movePieceDown} className="rounded bg-blue-500 px-4 py-2">
        ⬇️
      </button>
      <button onClick={rotatePiece} className="rounded bg-blue-500 px-4 py-2">
        🔄
      </button>
      <button onClick={hardDrop} className="rounded bg-blue-500 px-4 py-2">
        ⏬
      </button>
      <button onClick={() => movePiece(1)} className="rounded bg-blue-500 px-4 py-2">
        ➡️
      </button>
    </div>
  );
};

export { MobileControls };
