import React, { FC, useEffect } from "react";

import FocusLock from "react-focus-lock";

import "./Modal.scss";

type ModalProps = {
  isActive: boolean;
  closeModal: () => void;
  children: React.ReactNode | string | null;
};

export const Modal: FC<ModalProps> = ({ isActive, closeModal, children }) => {
  useEffect(() => {
    const escapeHandler = (e: KeyboardEvent) => {
      if (isActive && e.key == "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", escapeHandler);

    return () => {
      document.removeEventListener("keydown", escapeHandler);
    };
  }, [isActive]);

  return (
    <div className={isActive ? "modal active" : "modal"} onClick={closeModal}>
      <FocusLock>
        <div
          className={isActive ? "modal-content active" : "modal-content"}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </FocusLock>
    </div>
  );
};
