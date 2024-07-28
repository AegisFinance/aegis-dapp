/* eslint-disable react-hooks/exhaustive-deps */
import { isAuthenticated } from "@/lib/auth";
import {
  isAuthenticatedAtom,
  ProviderAtom,
  sessionTimeoutAtom,
} from "@/lib/states/jotai";
import { checkTimeOutExpiry } from "@/lib/utils";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useSignOut } from "./signout";

export function useCheckAuthentication(): [
  () => Promise<boolean>,
  boolean,
  string | undefined
] {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isAuth, setAuthenticated] = useAtom(isAuthenticatedAtom);
  const [provider] = useAtom(ProviderAtom);
  const [sessionTime, setSessionTime] = useAtom(sessionTimeoutAtom);

  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [clearStates] = useSignOut();

  const checkAuthentication = async (): Promise<boolean> => {
    setLoading(true);
    try {
      // let auth = await isAuthenticated(provider!);
      let session = checkTimeOutExpiry(sessionTime);
      console.log("🚀 ~ checkAuthentication ~ session:", session)

      if (isAuth && session) {
        setLoading(false);

        return true;
      } else {
        // setAuthenticated(false);
        setLoading(false);
        clearStates();
        return false;
      }
    } catch (error) {
      setLoading(false);
      console.log("🚀 ~ useCheckAuthentication ~ error:", error);

      // setAuthenticated(false);
      setError(error as unknown as string);
      clearStates();
      return false;
    }
  };

  return [checkAuthentication, isLoading, error] as const;
}
