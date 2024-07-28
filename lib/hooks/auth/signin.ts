import { useAtom } from "jotai";
import { Provider, SignInParamsCallBack } from "../../auth/interface";
import {
  isAuthenticatedAtom,
  ProviderAtom,
  sessionTimeoutAtom,
} from "../../states/jotai";
import { isAuthenticated, signIn } from "../../auth";
import { useEffect, useState } from "react";
import React from "react";
import { useSimpleToast } from "../utils/toast/toast";
import { ToastStatus } from "../utils/toast/interface";
import { useSignOut } from "./signout";

export function useSignIn(): [
  (p: Provider) => Promise<boolean>,
  boolean,
  string | undefined
] {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isAuth, setAuthenticated] = useAtom(isAuthenticatedAtom);
  const [, setProvider] = useAtom(ProviderAtom);
  const [sessionTime, setSessionTime] = useAtom(sessionTimeoutAtom);

  const [error, setError] = useState<string | undefined>(undefined);

  const [simpleToast] = useSimpleToast();
  const [clearStates] = useSignOut();

  const signInWith = async (provider: Provider): Promise<boolean> => {
    clearStates();

    try {
      setProvider(provider);
      let time = Date.now();
      console.log("🚀 ~ signInWith ~ time:", time)

      setSessionTime(time);
      
      let res = await signIn({ provider });
      if ("Ok" in res && res.Ok) {
        simpleToast({ title: "SignIn Suceesfull" });

        // setAuthenticated(res.Ok);
        return res.Ok;
      } else {
        setError("Err" in res ? res.Err : "-");

        simpleToast({
          title: "Error Occured in SignIn",
          status: ToastStatus.error,
        });
        setSessionTime(0);

        return false;
        // setAuthenticated(false);
      }
    } catch (error: unknown) {
      setError(error as unknown as string);
      setSessionTime(0);
      setProvider(undefined);
      return false;
    }
  };

  return [signInWith, isAuth, error] as const;
}
