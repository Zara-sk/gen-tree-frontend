import React from "react";

import { isActive, closeModal } from "../model/useRegistrationModal";

import { Modal } from "@shared/ui";

export const RegistrationModal = () => {
  const modalOpenStatus = isActive();
  return (
    <Modal isActive={modalOpenStatus} closeModal={closeModal}>
      <p>registration modal</p>
    </Modal>
  );
};
