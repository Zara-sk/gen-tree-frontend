import { StateCreator, createStore, useStore } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { User } from "@shared/api/session";

type SessionState = {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
};

const createSessionStore: StateCreator<
  SessionState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  SessionState
> = (set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
  removeUser: () => {
    set({ user: null });
  },
});

const sessionStore = createStore<SessionState>()(
  devtools(
    persist((...a) => ({ ...createSessionStore(...a) }), {
      name: "session",
      version: 2,
    }),
    { name: "session" }
  )
);

export const isAuth = () =>
  useStore(sessionStore, (state) => !!state.user?.accessToken);

export const useUser = () => useStore(sessionStore, (state) => state.user);

export const setUser = sessionStore.getState().setUser;

export const removeUser = sessionStore.getState().removeUser;
