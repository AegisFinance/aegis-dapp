import { AuthClient } from "@dfinity/auth-client";
import { SignInParams } from "../interface";

export const AUTH_MAX_TIME_TO_LIVE = BigInt(
  7 * 24 * 60 * 60 * 1000 * 1000 * 1000
);

let authClient: AuthClient | undefined | null;

export const createAuthClient = (): Promise<AuthClient> =>
  AuthClient.create({
    idleOptions: {
      disableIdle: true,
      disableDefaultIdleCallback: true,
    },
  });

/**
 * Sign in with Internet Identity
 */
export function signInWithII(params: SignInParams) {
  let func = params.ii_callback!;

  let identityProvider = process.env.NEXT_PUBLIC_IDENTITY_PROVIDER!;

  new Promise<void>(async (resolve, reject) => {
    authClient = await createAuthClient();

    await authClient.login({
      allowPinAuthentication: true,
      identityProvider,
      maxTimeToLive: AUTH_MAX_TIME_TO_LIVE,

      onSuccess: async () => {
        const identity = authClient!.getIdentity();
        const isAuth = authClient ?? (await authClient!.isAuthenticated());
        console.log("🚀 ~ onSuccess:async ~ isAuth:", isAuth);

        console.log(
          "🚀 ~ onSuccess:async ~ identity:",
          identity.getPrincipal().toText()
        );

        func(); // Call the callback function

        console.log("Login Successful!");
        resolve();
      },
      onError: (error) => {
        console.error("Login Failed: ", error);
        reject();
      },
    });
  });
}

export async function signOutWithII() {
  authClient = await createAuthClient();

  await authClient.logout();

 }

/**
 * Check if user is still authenticated
 */
export async function isAuthenticatedWiithII(): Promise<boolean> {
  authClient = authClient ?? (await createAuthClient());
  console.log(
    "🚀 ~ isAuthenticatedWiithII ~ authClient:",
    authClient.getIdentity().getPrincipal().toText()
  );

  return (await authClient.isAuthenticated()) ? true : false;
}
