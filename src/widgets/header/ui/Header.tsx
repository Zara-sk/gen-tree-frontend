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
      <div className="container">
        <NavLink path="/">
          <img src="./gen_tree_cropped.png" width={80} height={80}></img>
        </NavLink>
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
        {authStatus ? (
          <NavLink path="/account">Аккаунт</NavLink>
        ) : (
          <button onClick={openRegModal}>reg</button>
        )}
      </div>
      <AuthorizationModal openRegModal={openRegModal} />
      <RegistrationModal openAuthModal={openAuthModal} />
    </header>
  );
};
