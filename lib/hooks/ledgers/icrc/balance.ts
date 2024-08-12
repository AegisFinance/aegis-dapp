import { Account } from '@/declarations/cketh_ledger/cketh_ledger.did';
import { getIcrcBalance } from '@/lib/apis/canisters/icrc/balance';
import { ProviderAtom } from '@/lib/states/jotai';
import { CANISTERS_NAME } from '@/lib/utils';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { ToastStatus } from '../../utils/toast/interface';
import { useSimpleToast } from '../../utils/toast/toast';

export function useIcrcBalance(): [
  (ledger: CANISTERS_NAME, args: Account) => Promise<bigint>,
  boolean,
  bigint,
] {
  const [amount, setAmount] = useState<bigint>(0n);

  const [provider] = useAtom(ProviderAtom);

  const [isLoading, setLoading] = useState<boolean>(false);

  const [simpleToast] = useSimpleToast();

  const balance = async (
    ledger: CANISTERS_NAME,
    args: Account
  ): Promise<bigint> => {
    console.log(': ---------------------------');
    console.log(': balance -> ledger', ledger);
    console.log(': ---------------------------');
    setLoading(true);
    try {
      let res = await getIcrcBalance(ledger, args, provider!);

      setAmount(res);

      console.log(': ---------------------');
      console.log(': balance -> res', res);
      console.log(': ---------------------');
      setLoading(false);

      //   simpleToast({
      //     title: `${Object.keys(ledger)} balanced`,
      //     description: Number(res).toString(),
      //     status: ToastStatus.success,
      //   });

      setLoading(false);

      return res;
    } catch (err) {
      console.log(': ---------------------');
      console.log(': balance -> err', err);
      console.log(': ---------------------');
      setLoading(false);

      simpleToast({
        title: 'Error',
        description: JSON.stringify(err),
        status: ToastStatus.error,
      });

      return 0n;
    }
  };

  return [balance, isLoading, amount] as const;
}
