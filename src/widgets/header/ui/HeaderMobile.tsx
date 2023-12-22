import { FC, useEffect, useState } from "react";
import cn from "classnames";

import { RegistrationModal, openRegModal } from "@features/registration";

import { isAuth } from "@entities/session";
import { AuthorizationModal, openAuthModal } from "@features/authorization";

import { AvoidGuard, NavLink } from "@shared/ui";

export const HeaderMobile: FC = () => {
  const authStatus = isAuth();

  const [menuStatus, setMenuStatus] = useState<boolean>(false);

  return (
    <header className="main_header mobile">
      <div
        id="burger"
        className={cn({ active: menuStatus })}
        onClick={() => setMenuStatus(!menuStatus)}
      >
        <div className="burger-line"></div>
        <div className="burger-line"></div>
        <div className="burger-line"></div>
      </div>
      <div className={cn("container mobile", { active: menuStatus })}>
        <nav>
          <NavLink path="/" onClick={() => setMenuStatus(false)}>
            <span>На главную</span>
          </NavLink>
          <NavLink path="/family" onClick={() => setMenuStatus(false)}>
            <AvoidGuard condition={!authStatus} action={openAuthModal}>
              Семья
            </AvoidGuard>
          </NavLink>
          {/* <NavLink path="/family/tree" onClick={() => setMenuStatus(false)}>
            <AvoidGuard condition={!authStatus} action={openAuthModal}>
              Древо
            </AvoidGuard>
          </NavLink>
          <NavLink path="/family/albums" onClick={() => setMenuStatus(false)}>
            <AvoidGuard condition={!authStatus} action={openAuthModal}>
              Альбомы
            </AvoidGuard>
          </NavLink> */}
          {authStatus && (
            <NavLink path="/account" onClick={() => setMenuStatus(false)}>
              <span>Аккаунт</span>
            </NavLink>
          )}
        </nav>
      </div>
      <AuthorizationModal openRegModal={openRegModal} />
      <RegistrationModal openAuthModal={openAuthModal} />
    </header>
  );
};
