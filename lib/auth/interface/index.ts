import { AuthClient } from "@dfinity/auth-client";

/**
 
Providers supported by Aegis Finance
 
**/
export enum Provider {
  II = "ii",
  Nfid = "nfid",
  Plug = "plug",
}

export interface SignInParamsCallBack {
  authClient: AuthClient | undefined;
}

export interface SignInParams extends SignInWithII, SignInWithPlug {
  provider: Provider;
}

export interface SignInWithII {
  ii_callback?: (params?: SignInParamsCallBack) => void;
}

export interface SignInWithPlug {}
