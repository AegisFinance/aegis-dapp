import { useAtom } from 'jotai';
import {
  insuranceActiveBuyListKeyAtom,
  insuranceActiveSellListKeyAtom,
  insuranceKeyListAtom,
  insuranceListAtom,
  insuranceTradeHistoryListAtom,
  isAuthenticatedAtom,
  ProviderAtom,
  sessionTimeoutAtom,
} from '../../states/jotai';
import { signOut } from '../../auth';

export const useSignOut = () => {
  //atoms
  const [, setAuthenticated] = useAtom(isAuthenticatedAtom);
  const [, setSessionTimeOut] = useAtom(sessionTimeoutAtom);
  const [, setProvider] = useAtom(ProviderAtom);
  const [, setInsuranceList] = useAtom(insuranceListAtom);
  const [, setInsuranceListKey] = useAtom(insuranceKeyListAtom);
  const [, setInsuranceActiveBuyListKeyAtom] = useAtom(
    insuranceActiveBuyListKeyAtom
  );
  const [, setInsuranceActiveSellListKeyAtom] = useAtom(
    insuranceActiveSellListKeyAtom
  );
  const [, setInsuranceTradeHistoryListAtom] = useAtom(
    insuranceTradeHistoryListAtom
  );

  // const signOutRes = signOut();

  const clearStates = () => {
    console.log('SignOut All States...');

    setAuthenticated(false);
    setSessionTimeOut(0);
    setProvider(undefined);

    setInsuranceList(undefined);
    setInsuranceListKey(undefined);
    setInsuranceActiveBuyListKeyAtom(undefined);
    setInsuranceActiveSellListKeyAtom(undefined);
    setInsuranceTradeHistoryListAtom(undefined);
    
    console.log('All States are cleared!');
  };
  return [clearStates] as const;
};
