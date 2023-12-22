import { FC } from "react";
import { isMobile } from "react-device-detect";

import { HeaderDesktop } from "./HeaderDesktop";
import { HeaderMobile } from "./HeaderMobile";

import "./Header.scss";

export const Header: FC = () => {
  return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
};
