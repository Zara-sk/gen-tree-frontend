import { StateCreator } from "zustand";

import { ModalState } from "./modal.types";

export const createModalStore: StateCreator<
  ModalState,
  [["zustand/devtools", never]],
  [],
  ModalState
> = (set) => ({
  isActive: false,
  openModal: () => {
    set({ isActive: true });
  },
  closeModal: () => {
    set({ isActive: false });
  },
});
