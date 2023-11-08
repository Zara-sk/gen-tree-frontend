import { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";

import "./Layout.scss";

interface LayoutProps {
  header: ReactNode;
  footer: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ header, footer }) => {
  return (
    <div className="layout">
      {header}
      <main className="layout-content">
        <Outlet />
      </main>
      {footer}
    </div>
  );
};
