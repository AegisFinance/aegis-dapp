import { Provider, SignInParams } from './interface';
import { useAtom } from 'jotai';
import { ProviderAtom } from '../states/jotai';
import { isAuthenticatedWiithII, signOutWithII } from './providers/ii';
import { Plug } from './providers/plug';
// import { createAgent } from '@dfinity/utils';
import { HttpAgent, Identity } from '@dfinity/agent';
import { Ed25519KeyIdentity } from '@dfinity/identity';
import { Principal } from '@dfinity/principal';

// export const getIdentityPrincipal = () =>
//   Ed25519KeyIdentity.generate(
//     Uint8Array.from(getSubAccountArray(2))
//   ).getPrincipal();

// export function getIdentity(): Identity {
//   return Ed25519KeyIdentity.generate(Uint8Array.from(getSubAccountArray(2)));
// }
// export function getSubAccountArray(subaccount: number): number[] {
//   return Array(28)
//     .fill(0)
//     .concat(to32Bits(subaccount ? subaccount : 0));
// }

// export function to32Bits(number: number): number[] {
//   let b = new ArrayBuffer(4);
//   new DataView(b).setUint32(0, number);
//   return Array.from(new Uint8Array(b));
// }

// export async function getAgent(): Promise<HttpAgent> {
//   const agent = await createAgent({
//     identity: getIdentity(),
//     host: 'https://icp-api.io',
//   });
//   return agent;
// }

// export async function getLocalAgent(): Promise<HttpAgent> {
//   const agent = await createAgent({
//     identity: getIdentity(),
//     host: 'http://localhost:8080',
//   });
//   agent.fetchRootKey();
//   return agent;
// }

export type SignInRes = { Ok: boolean } | { Err: string };

export async function signIn(params: SignInParams): Promise<SignInRes> {
  switch (params.provider) {
    case Provider.II:
      // return await signInWithII(params);
      return {
        Err: 'II Not Supported',
      };
    case Provider.Nfid:
      return {
        Err: 'NFID Not Supported',
      };
    case Provider.Plug:
      let plug = new Plug();
      return await plug.signIn();

    default:
      console.log(`Provider ${params.provider} Not supported For SignIn`);
      return { Err: `Provider ${params.provider} Not supported` };
  }
}

export async function isAuthenticated(provider: Provider): Promise<boolean> {
  switch (provider) {
    case Provider.II:
      return await isAuthenticatedWiithII();

    case Provider.Nfid:
      return false;

    case Provider.Plug:
      let plug = new Plug();
      return await plug.isAuthenticated();

    default:
      console.log(`Provider ${provider} Not supported for Authentiation`);

      return false;
  }
}

export async function signOut() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [provider] = useAtom(ProviderAtom);

  switch (provider) {
    case Provider.II:
      await signOutWithII();

    case Provider.Nfid:
      return false;

    case Provider.Plug:
      return false;

    default:
      console.log(`Provider ${provider} Not supported to SignOut`);

      return false;
  }
}

export async function createAgent(
  provider: Provider
): Promise<HttpAgent | undefined> {
  switch (provider) {
    case Provider.Plug:
      let plug = new Plug();
      let plugAgent = await plug.createPlugAgent();
      console.log(': --------------');
      console.log(': plugAgent', plugAgent);
      console.log(': --------------');
      return plugAgent;

    default:
      console.log(`Provider ${provider} Not supported to CreateAgent`);
  }
}

export async function getPrincipal(
  provider: Provider
): Promise<Principal | undefined> {
  switch (provider) {
    case Provider.Plug:
      let plug = new Plug();
      let plugPrincipal = await plug.getPrincipal();
      console.log(': --------------');
      console.log(': plugPrincipal', plugPrincipal);
      console.log(': --------------');
      return plugPrincipal;

    default:
      console.log(`Provider ${provider} Not supported to CreateAgent`);
  }
}
