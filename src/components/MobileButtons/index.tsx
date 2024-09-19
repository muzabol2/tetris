"use client";

import { useHelpers } from "./helpers";

const MobileButtons = () => {
  const { isMobile, movePieceDown, hardDrop, rotatePiece, movePiece } = useHelpers();

  if (!isMobile) {
    return null;
  }

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

export { MobileButtons };
