import React, { FC } from "react";

import "./Button.scss";

type ButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  children: JSX.Element | React.ReactNode | string;
  disabled: boolean | undefined;
};

export const Button: FC<ButtonProps> = ({
  onClick,
  type,
  children,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      className="button"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
