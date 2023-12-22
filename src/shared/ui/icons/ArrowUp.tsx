import { FC } from "react";

import type { IconProps } from "./icon.types";

export const ArrowUp: FC<IconProps> = ({
  fill,
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      width={size || width || "24px"}
      height={size || height || "24px"}
      viewBox="0 0 24 24"
      {...props}
      fill="none"
    >
      <path
        d="M19 15L12 9L5 15"
        stroke={fill}
        strokeWidth="2.0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
