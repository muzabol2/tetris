import type { IconProps } from "@/types";

const BrushIcon = ({ width = "24px", height = "24px", color = "currentColor", onClick }: IconProps) => (
  <svg width={width} height={height} className="cursor-pointer" viewBox="0 0 24 24" fill={color} onClick={onClick}>
    <g transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)" fill={color} stroke="none">
      <path d="M153 168 c-45 -46 -50 -55 -39 -70 11 -15 18 -11 69 40 31 32 57 63 57 70 0 27 -39 9 -87 -40z" />
      <path d="M36 71 c-30 -24 -34 -31 -22 -41 22 -18 77 -8 93 16 12 19 12 24 -2 38 -22 21 -26 21 -69 -13z" />
    </g>
  </svg>
);

export { BrushIcon };
