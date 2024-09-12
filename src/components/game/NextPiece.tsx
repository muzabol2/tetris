"use client";
import { BLOCK_SIZE } from "@/constants";
import type { Piece } from "@/types";

type Props = {
  nextPiece: Piece | null;
};

const NextPiece = ({ nextPiece }: Props) => {
  if (!nextPiece) return null;

  return (
    <div className="flex w-24 flex-col items-center justify-center gap-1 rounded border border-border p-1">
      <span className="font-semibold text-foreground">Next:</span>
      <div
        className="grid pb-1"
        style={{
          gridTemplateColumns: `repeat(${nextPiece.shape[0].length}, ${BLOCK_SIZE - 2}px)`,
          gridTemplateRows: `repeat(${nextPiece.shape.length}, ${BLOCK_SIZE - 2}px)`,
        }}
      >
        {nextPiece.shape.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-[${BLOCK_SIZE}px] h-[${BLOCK_SIZE}px] ${cell ? "border bg-gray-700" : "bg-transparent"}`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export { NextPiece };
