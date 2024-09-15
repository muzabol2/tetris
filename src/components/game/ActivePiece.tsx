"use client";
import { useBlockSize } from "@/hooks";
import type { Piece } from "@/types";
import { Block } from "./Block";

type Props = {
  currentPiece: Piece;
};

const ActivePiece = ({ currentPiece }: Props) => {
  const blockSize = useBlockSize();

  return (
    <div
      className="absolute grid"
      style={{
        top: `${currentPiece.y * blockSize}px`,
        left: `${currentPiece.x * blockSize}px`,
        width: `${currentPiece.shape[0].length * blockSize}px`,
        height: `${currentPiece.shape.length * blockSize}px`,
        gridTemplateColumns: `repeat(${currentPiece.shape[0].length}, ${blockSize}px)`,
        gridTemplateRows: `repeat(${currentPiece.shape.length}, ${blockSize}px)`,
        boxSizing: "border-box",
      }}
    >
      {currentPiece.shape.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Block key={`${rowIndex}-${colIndex}`} color={currentPiece.color} size={blockSize} filled={!!cell} />
        ))
      )}
    </div>
  );
};

export { ActivePiece };
