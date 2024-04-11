import { useAtom } from "jotai";
import { isAuthenticatedAtom, sessionTimeoutAtom } from "../states/jotai";

export const useSignOut = () => {
  //atoms
  const [isAuthenticated, setAuthenticated] = useAtom(isAuthenticatedAtom);
  const [sessionTimeOut, setSessionTimeOut] = useAtom(sessionTimeoutAtom);

  const clearStates = () => {
    console.log("SignOut All States...");

    setAuthenticated(false);
    setSessionTimeOut(null);

    console.log("All States are cleared!");
  };
  return [clearStates] as const;
};
