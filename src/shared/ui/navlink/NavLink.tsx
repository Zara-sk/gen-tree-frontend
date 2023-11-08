import { FC, ReactNode } from "react";
import { NavLink as Link } from "react-router-dom";

import "./NavLink.scss";

type NavLinkProps = {
  path: `/${string}`;
  children?: string | JSX.Element | ReactNode;
  onClick?: () => void;
};

export const NavLink: FC<NavLinkProps> = ({ path, onClick, children }) => {
  return (
    // <span className="navlink-wrapper">
    <Link className="navlink" to={path} onClick={onClick} end>
      {children}
    </Link>
    // </span>
  );
};
