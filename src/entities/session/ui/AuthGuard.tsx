import { ReactNode, FC } from "react";
import { Navigate } from "react-router-dom";

import { isAuth } from "../model/sessionModel";

type AuthGuardRedirectProps = {
  children: JSX.Element | ReactNode | string;
  redirect: string;
};

export const AuthGuard: FC<AuthGuardRedirectProps> = ({
  children,
  redirect,
}) => {
  return isAuth() ? children : <Navigate to={redirect} replace />;
};
