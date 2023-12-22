import React, { FC, useEffect, useRef } from "react";

import FocusLock from "react-focus-lock";

import "./Modal.scss";
import { Cross } from "../icons";

type ModalProps = {
  isActive: boolean;
  closeModal: () => void;
  children: React.ReactNode | string | null;
};

export const Modal: FC<ModalProps> = ({ isActive, closeModal, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapperClickHandler = (e: MouseEvent) => {
      const { target } = e;

      if (target instanceof Node && modalRef.current == target) {
        closeModal();
      }
    };
    const escapeHandler = (e: KeyboardEvent) => {
      if (isActive && e.key == "Escape") {
        closeModal();
      }
    };
    document.addEventListener("click", wrapperClickHandler);
    document.addEventListener("keydown", escapeHandler);

    return () => {
      document.removeEventListener("click", wrapperClickHandler);
      document.removeEventListener("keydown", escapeHandler);
    };
  }, [isActive]);

  return (
    <div ref={modalRef} className={isActive ? "modal active" : "modal"}>
      {isActive && (
        <FocusLock>
          <div
            className={isActive ? "modal-content active" : "modal-content"}
            onClick={(e) => e.stopPropagation()}
          >
            <>
              <button className="close-modal-btn" onClick={closeModal}>
                <Cross fill="currentColor" />
              </button>
              {children}
            </>
          </div>
        </FocusLock>
      )}
    </div>
  );
};
