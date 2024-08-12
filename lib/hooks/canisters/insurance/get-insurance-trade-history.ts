import {
  ProviderAtom,
  insuranceTradeHistoryListAtom,
} from '@/lib/states/jotai';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { ToastStatus } from '../../utils/toast/interface';
import { useSimpleToast } from '../../utils/toast/toast';
import { UserInsuranceListHistoryKey } from '@/declarations/insurance/insurance.did';
import { getInsuranceTradeHistoryByPrincipal } from '@/lib/apis/canisters/insurance/trade-history';

export function useListInsuranceTradeHistory(): [
  () => Promise<void>,
  boolean,
  [UserInsuranceListHistoryKey, bigint][] | undefined,
] {
  const [provider] = useAtom(ProviderAtom);
  const [list, setList] = useAtom(insuranceTradeHistoryListAtom);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [simpleToast] = useSimpleToast();

  const insuranceTradeHistoryByPrincipal = async (): Promise<void> => {
    setLoading(true);

    try {
      let res = await getInsuranceTradeHistoryByPrincipal(provider!);
      console.log(': ----------');
      console.log(': res', res);
      console.log(': ----------');
      setList(res);
      setLoading(false);
    } catch (err: unknown) {
      console.log(': ----------');
      console.log(': err', err);
      console.log(': ----------');
      simpleToast({
        title: 'Error',
        description: JSON.stringify(err),
        status: ToastStatus.error,
      });
      setLoading(false);
      return;
    }
  };

  return [insuranceTradeHistoryByPrincipal, isLoading, list] as const;
}
