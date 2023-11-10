import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "./providers";
import { removeUser, setUser } from "@entities/session";

import "@shared/ui/normalize.scss";

setUser({
  id: -1,
  family_id: -1,
  accessToken: "M0CK",
});
removeUser();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider />
  </StrictMode>
);
