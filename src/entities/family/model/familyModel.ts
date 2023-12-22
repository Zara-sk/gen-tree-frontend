import { StateCreator, createStore, useStore } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { Tree } from "@shared/api/family";

type FamilyState = {
  tree: Tree;
  setTree: (tree: Tree) => void;
  removeTree: () => void;
};

const createFamilyStore: StateCreator<
  FamilyState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  FamilyState
> = (set) => ({
  name: "",
  tree: null,
  setTree: (tree) => {
    set({ tree });
  },
  removeTree: () => {
    set({ tree: null });
  },
});

const familyStore = createStore<FamilyState>()(
  devtools(
    persist((...a) => ({ ...createFamilyStore(...a) }), {
      name: "family",
      version: 1,
    }),
    { name: "family" }
  )
);

export const useTree = () => useStore(familyStore, (state) => state.tree);

export const setTree = familyStore.getState().setTree;

export const removeTree = familyStore.getState().removeTree;
