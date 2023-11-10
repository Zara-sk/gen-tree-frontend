import React, { FC, RefObject, ReactNode } from "react";

import cn from "classnames";

import { Cross } from "@shared/ui/icons";

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
  const clearBtnClickHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clear && clear();
  };
  return (
    <label className={cn("input-wrapper", name, { error: error && !!value })}>
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
        <button
          className={cn("input-clear-btn", { empty: !value })}
          onClick={clearBtnClickHandle}
        >
          <Cross fill="currentColor" />
        </button>
      )}
    </label>
  );
};
