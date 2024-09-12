"use client";
import type { Piece } from "@/types";

type Props = {
  nextPiece: Piece | null;
};

const NextPiece = ({ nextPiece }: Props) => {
  if (!nextPiece) return null;

  return (
    <div className="flex h-20 w-24 flex-col items-center justify-between rounded border border-border p-1">
      <span className="text-foreground">Next:</span>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${nextPiece.shape[0].length}, 20px)`,
          gridTemplateRows: `repeat(${nextPiece.shape.length}, 20px)`,
        }}
      >
        {nextPiece.shape.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`h-full w-full ${cell ? "border bg-gray-700" : "bg-transparent"}`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export { NextPiece };
