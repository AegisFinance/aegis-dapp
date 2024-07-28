import { useAtom } from "jotai";
import {
  isAuthenticatedAtom,
  ProviderAtom,
  sessionTimeoutAtom,
} from "../../states/jotai";
import { signOut } from "../../auth";

export const useSignOut = () => {
  //atoms
  const [, setAuthenticated] = useAtom(isAuthenticatedAtom);
  const [, setSessionTimeOut] = useAtom(sessionTimeoutAtom);
  const [, setProvider] = useAtom(ProviderAtom);

  // const signOutRes = signOut();

  const clearStates = () => {
    console.log("SignOut All States...");

    setAuthenticated(false);
    setSessionTimeOut(0);
    setProvider(undefined);

    console.log("All States are cleared!");
  };
  return [clearStates] as const;
};
