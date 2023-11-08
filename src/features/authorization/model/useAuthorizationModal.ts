import { createStore, useStore } from "zustand";
import { devtools } from "zustand/middleware";

import { ModalState, createModalStore } from "@shared/api/modal";

const authorizationModalStore = createStore<ModalState>()(
  devtools((...a) => ({ ...createModalStore(...a) }), {
    name: "authorizationModal",
  })
);

export const isActive = () =>
  useStore(authorizationModalStore, (state) => state.isActive);

export const openModal = authorizationModalStore.getState().openModal;

export const closeModal = authorizationModalStore.getState().closeModal;
