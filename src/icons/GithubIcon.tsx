import type { IconProps } from "@/types";

const GithubIcon = ({
  width = "24px",
  height = "24px",
  color = "currentColor",
}: IconProps) => (
  <svg width={width} height={height} fill={color} viewBox="0 0 24 24">
    <path
      d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.294 2.75-1.025 2.75-1.025.544 1.376.201 2.393.099 2.646.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.563 4.936.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.579.688.481C19.135 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

export { GithubIcon };
