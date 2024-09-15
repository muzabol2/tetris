"use client";

type Props = {
  color: string;
  size: number;
  filled: boolean;
};

const Block = ({ color, size, filled }: Props) => (
  <div
    className="border"
    style={{
      backgroundColor: filled ? color : "transparent",
      width: `${size}px`,
      height: `${size}px`,
      boxSizing: "border-box",
    }}
  />
);

export { Block };
