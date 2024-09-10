"use client";
import { BLOCK_SIZE } from "@/constants";
import type { Piece } from "@/types";

interface Props {
  currentPiece: Piece;
}

const ActivePiece = ({ currentPiece }: Props) => (
  <div
    className="absolute grid"
    style={{
      top: `${currentPiece.y * BLOCK_SIZE}px`,
      left: `${currentPiece.x * BLOCK_SIZE}px`,
      width: `${currentPiece.shape[0].length * BLOCK_SIZE}px`,
      height: `${currentPiece.shape.length * BLOCK_SIZE}px`,
      gridTemplateColumns: `repeat(${currentPiece.shape[0].length}, ${BLOCK_SIZE}px)`,
      gridTemplateRows: `repeat(${currentPiece.shape.length}, ${BLOCK_SIZE}px)`,
    }}
  >
    {currentPiece.shape.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <div
          key={`${rowIndex}-${colIndex}`}
          className={`w-[${BLOCK_SIZE}px] h-[${BLOCK_SIZE}px] border ${cell ? "bg-gray-700" : "bg-transparent"}`}
        />
      ))
    )}
  </div>
);

export { ActivePiece };
