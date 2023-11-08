import { FC, ReactNode } from "react";

import "./AvoidGuard.scss";

type AuthGuardAvoidProps = {
  children: JSX.Element | ReactNode | string;
  condition: boolean;
  action: (...e: any) => void;
};

export const AvoidGuard: FC<AuthGuardAvoidProps> = ({
  children,
  condition,
  action,
}) => {
  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (condition) {
      action();
      e.preventDefault();
    }
  };
  return (
    <span className="avoid-wrapper" onClick={clickHandler}>
      {children}
    </span>
  );
};
