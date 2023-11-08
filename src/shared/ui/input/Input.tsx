import React, { FC, RefObject, ReactNode } from "react";

import cn from "classnames";

import { IconProps } from "@shared/ui/icons";

import "./Input.scss";

type InputProps = {
  id: string;
  name: string;
  type: string;
  disabled: boolean;
  value: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactElement;
  clear?: () => void;
  error: boolean;
  innerRef?: RefObject<HTMLInputElement> | undefined;
};

export const Input: FC<InputProps> = ({
  id,
  name,
  type,
  disabled = false,
  value,
  placeholder = "",
  onChange = () => {},
  icon,
  clear,
  error,
  innerRef,
}) => {
  return (
    <label className={cn("input-wrapper", { error })}>
      <span className="input-icon-wrapper">{icon}</span>
      <input
        className="input-input"
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        ref={innerRef}
      />
      {clear && (
        <button className="input-clear-btn" onClick={clear}>
          X
        </button>
      )}
    </label>
  );
};
