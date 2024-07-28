import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { MyAccountNav } from "./types";
import { Provider } from "../auth/interface";

// storage
export const sessionTimeoutAtom = atomWithStorage<number>("sessionTimeout", 0);

export const ProviderAtom = atomWithStorage<Provider | undefined>(
  "provider",
  undefined
);

export const isAuthenticatedAtom = atomWithStorage<boolean>(
  "isAuthenticatedAtom",
  false
);

// states
export const accountNav = atom<MyAccountNav>(MyAccountNav.Overview);
