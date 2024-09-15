"use client";
import type { Piece } from "@/types";
import { Block } from "./Block";

type PieceGridProps = {
  piece: Piece;
  blockSize: number;
  style?: React.CSSProperties;
};

const PieceGrid = ({ piece, blockSize, style }: PieceGridProps) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${piece.shape[0].length}, ${blockSize}px)`,
      gridTemplateRows: `repeat(${piece.shape.length}, ${blockSize}px)`,
      width: `${piece.shape[0].length * blockSize}px`,
      height: `${piece.shape.length * blockSize}px`,
      boxSizing: "border-box",
      ...style,
    }}
  >
    {piece.shape.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Block key={`${rowIndex}-${colIndex}`} color={piece.color} size={blockSize} filled={!!cell} />
      ))
    )}
  </div>
);

export { PieceGrid };
