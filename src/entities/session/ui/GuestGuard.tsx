import { ReactNode, FC } from "react";
import { Navigate } from "react-router-dom";

import { isAuth } from "../model/sessionModel";

type GuestGuardProps = {
  children: ReactNode;
  redirect: string;
};

export const GuestGuard: FC<GuestGuardProps> = ({ children, redirect }) => {
  return isAuth() ? <Navigate to={redirect} /> : children;
};
