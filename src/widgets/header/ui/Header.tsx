import { FC } from "react";

import { RegistrationModal, openRegModal } from "@features/registration";

import "./Header.scss";
import { isAuth } from "@entities/session";
import { AuthorizationModal, openAuthModal } from "@features/authorization";

import { AvoidGuard, NavLink } from "@shared/ui";

export const Header: FC = () => {
  const authStatus = isAuth();

  return (
    <header className="main_header">
      <NavLink path="/">Logo</NavLink>
      <nav>
        <NavLink path="/family">
          <AvoidGuard condition={!authStatus} action={openAuthModal}>
            Семья
          </AvoidGuard>
        </NavLink>
        <NavLink path="/family/tree">
          <AvoidGuard condition={!authStatus} action={openAuthModal}>
            Древо
          </AvoidGuard>
        </NavLink>
        <NavLink path="/family/albums">
          <AvoidGuard condition={!authStatus} action={openAuthModal}>
            Альбомы
          </AvoidGuard>
        </NavLink>
      </nav>
      {/* <NavLink path="/login">Войти</NavLink> */}
      <button onClick={openRegModal}>reg</button>
      <RegistrationModal />
      <AuthorizationModal />
    </header>
  );
};
