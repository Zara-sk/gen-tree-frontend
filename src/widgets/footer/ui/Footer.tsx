import { FC } from "react";

import "./Footer.scss";

export const Footer: FC = () => {
  return (
    <footer className="main-footer">
      {/* <div className="menu">
        <div className="container">
          <p>some menu staff</p>
          <p>some menu staff</p>
          <p>some menu staff</p>
          <p>some menu staff</p>
        </div>
      </div> */}
      <div className="info">
        <div className="container">
          <p>© 2023 РеальноНеПерчатка</p>
        </div>
      </div>
    </footer>
  );
};
