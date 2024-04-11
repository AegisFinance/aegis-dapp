import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { MyAccountNav } from "./types";

// storage
export const isAuthenticatedAtom = atomWithStorage("isAuthenticated", false);
export const sessionTimeoutAtom = atomWithStorage<null | number>(
  "sessionTimeout",
  null
);

// states
export const accountNav = atom<MyAccountNav>(MyAccountNav.Overview);
