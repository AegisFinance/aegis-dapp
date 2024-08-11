import { ProviderAtom } from '@/lib/states/jotai';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useSimpleToast } from '../../utils/toast/toast';
import { CANISTERS_NAME } from '@/lib/utils';
import { IcrcLedger } from '@/lib/utils/icrc-ledger';
import { createAgent } from '@/lib/auth';
import { ApproveParams } from '@dfinity/ledger-icrc';
import { ToastStatus } from '../../utils/toast/interface';

export function useIcrcApprove(): [
  (ledger: CANISTERS_NAME, args: ApproveParams) => Promise<boolean>,
  boolean,
] {
  const [provider] = useAtom(ProviderAtom);

  const [isLoading, setLoading] = useState<boolean>(false);

  const [simpleToast] = useSimpleToast();

  const approve = async (
    ledger: CANISTERS_NAME,
    args: ApproveParams
  ): Promise<boolean> => {
    console.log(': ---------------------------');
    console.log(': approve -> ledger', ledger);
    console.log(': ---------------------------');
    setLoading(true);
    try {
      let icrcLedger = new IcrcLedger({
        agent: (await createAgent(provider!))!,
        ledger,
      });
      let res = await icrcLedger.approve(args);
      console.log(': ---------------------');
      console.log(': approve -> res', res);
      console.log(': ---------------------');
      setLoading(false);

      simpleToast({
        title: `${Object.keys(ledger)} Approved`,
        description: Number(res).toString(),
        status: ToastStatus.success,
      });

      setLoading(false);
      return true;
    } catch (err) {
      console.log(': ---------------------');
      console.log(': approve -> err', err);
      console.log(': ---------------------');
      setLoading(false);

      simpleToast({
        title: 'Error',
        description: JSON.stringify(err),
        status: ToastStatus.error,
      });

      return false;
    }
  };

  return [approve, isLoading] as const;
}
