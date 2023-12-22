import { FC } from "react";
import { NavLink as Link } from "react-router-dom";

import cn from "classnames";

import "./NavLink.scss";

type NavLinkProps = {
  path: `/${string}`;
  // children?: string | JSX.Element | ReactNode;
  onClick?: () => void;
} & React.HTMLAttributes<HTMLLinkElement>;

export const NavLink: FC<NavLinkProps> = ({
  path,
  onClick,
  children,
  className,
}) => {
  return (
    // <span className="navlink-wrapper">
    <Link className={cn("navlink", className)} to={path} onClick={onClick} end>
      {children}
    </Link>
    // </span>
  );
};
