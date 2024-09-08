import { IconProps } from "@/types";

const MoonIcon = ({
  width = "24px",
  height = "24px",
  color = "black",
  onClick,
}: IconProps) => (
  <svg width={width} height={height} viewBox="0 0 512 512" onClick={onClick}>
    <path
      d="M386,248.478  c0,78.864-63.941,142.805-142.805,142.805c-48.513,0-91.395-24.202-117.195-61.194c14.54,4.687,30.037,7.215,46.135,7.215  c83.018,0,150.321-67.303,150.321-150.321c0-23.778-5.521-46.258-15.346-66.237C353.886,144.197,386,192.587,386,248.478z"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="30"
    />{" "}
  </svg>
);

export { MoonIcon };
