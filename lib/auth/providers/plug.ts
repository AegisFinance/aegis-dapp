import { CANISTER_WHITE_LIST } from "@/lib/constants/canisters";
import { SignInRes } from "..";

export class Plug {
  async isAuthenticated(): Promise<boolean> {
    return await (window as any).ic?.plug?.isConnected();
  }
  // Callback to print sessionData
  onConnectionUpdate = () => {
    console.log(window.ic.plug.sessionManager.sessionData);
  };

  async signIn(): Promise<SignInRes> {
    const host = process.env.NEXT_PUBLIC_DFX_NETWORK;

    try {
      if (window.ic?.plug && "Plug and play!") {
        const whitelist = CANISTER_WHITE_LIST;

        try {
          const connect = await (window as any).ic?.plug?.requestConnect({
            whitelist,
            host,
            timeout: 5000,
            // onConnectionUpdate: this.onConnectionUpdate,
          });

          console.log("🚀 ~ Plug ~ connect ~ connect:", connect);

          return { Ok: await this.isAuthenticated() };
        } catch (error: unknown) {
          console.error(error);

          return { Err: String(error as unknown as string) };
        }
      } else {
        return { Err: `Window.ic.plug Not Found` };
      }
    } catch (e) {
      return { Err: String(e as unknown as string) };
    }
  }
}
