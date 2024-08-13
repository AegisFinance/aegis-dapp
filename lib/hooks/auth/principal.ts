import { getPrincipal } from '@/lib/auth';
import { ProviderAtom } from '@/lib/states/jotai';
import { Principal } from '@dfinity/principal';
import { useAtom } from 'jotai';
import { useState } from 'react';

export function usePrincipal(): [
  () => Promise<Principal | undefined>,
  principal: Principal | undefined,
] {
  const [provider] = useAtom(ProviderAtom);
  const [principal, setPrincipal] = useState<Principal>();

  const getAuthPrincipal = async (): Promise<Principal | undefined> => {
    if (provider && !principal) {
      const principal = (await getPrincipal(provider))!;
      setPrincipal(principal);
      return principal;
    } else {
      return undefined;
    }
  };

  return [getAuthPrincipal, principal];
}
