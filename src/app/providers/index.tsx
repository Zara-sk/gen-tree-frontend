import { BrowserRouter } from "react-router-dom";

import { RouterProvider } from "./RouterProvider";

export const Provider = () => {
  return (
    <BrowserRouter>
      <RouterProvider />
    </BrowserRouter>
  );
};
