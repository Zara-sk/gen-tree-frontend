import { createStore, useStore } from "zustand";
import { devtools } from "zustand/middleware";

import { ModalState, createModalStore } from "@shared/api/modal";

const registrationModalStore = createStore<ModalState>()(
  devtools((...a) => ({ ...createModalStore(...a) }), {
    name: "registrationModal",
  })
);

export const isActive = () =>
  useStore(registrationModalStore, (state) => state.isActive);

export const openModal = registrationModalStore.getState().openModal;

export const closeModal = registrationModalStore.getState().closeModal;
