import { CANISTER_WHITE_LIST } from '@/lib/constants/canisters';
import { SignInRes } from '..';
import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

export class Plug {
  agent: HttpAgent | undefined;
  

  async getPrincipal(): Promise<Principal> {
    return await window?.ic?.plug.getPrincipal();
  }

  async createPlugAgent(): Promise<HttpAgent> {
    const host = process.env.NEXT_PUBLIC_DFX_NETWORK;
    const whitelist = CANISTER_WHITE_LIST;
    if (!(await window.ic?.plug.agent)) {
      await (window as any).ic?.plug?.requestConnect({
        whitelist,
        host,
        timeout: 500_000,
        // onConnectionUpdate: this.onConnectionUpdate,
      });
    }

    return await window.ic?.plug.agent;
  }

  async isAuthenticated(): Promise<boolean> {
    if (!(await window.ic.plug.agent)) {
      return await (window as any).ic?.plug?.isConnected();
    }

    return true;
  }
  // Callback to print sessionData
  onConnectionUpdate = () => {
    // console.log(window.ic.plug.sessionManager.sessionData);
  };

  async signIn(): Promise<SignInRes> {
    const host = process.env.NEXT_PUBLIC_DFX_NETWORK;

    try {
      if (
        window.ic?.plug
        //  && "Plug and play!"
      ) {
        const whitelist = CANISTER_WHITE_LIST;

        try {
          await (window as any).ic?.plug?.requestConnect({
            whitelist,
            host,
            timeout: 500_000,
            // onConnectionUpdate: this.onConnectionUpdate,
          });

          // console.log('🚀 ~ Plug ~ connect ~ connect:', connect);

          // await this.createPlugAgent();

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
