import { IcrcAsset, UnStakeIcrcArgs } from '@/declarations/main/main.did';
import { unStakeIcrcTokensManual } from '@/lib/apis/canisters/main/stake/unstake-icrc-tokens-manual';
import { ToastStatus } from '@/lib/hooks/utils/toast/interface';
import { useSimpleToast } from '@/lib/hooks/utils/toast/toast';
import { ProviderAtom } from '@/lib/states/jotai';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useUnStakeIcrcTokensManual() {
  const [provider] = useAtom(ProviderAtom);

  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [, setMessage] = useState<string | undefined>(undefined);

  const router = useRouter();
  const [simpleToast] = useSimpleToast();

  const unStakeIcrcTokensManualApi = async (asset: IcrcAsset) => {
    setLoading(true);

    try {
      let res = await unStakeIcrcTokensManual(asset, provider!);
      console.log(': ------------------------------');
      console.log(': unStakeIcrcTokensManualApi -> res', res);
      console.log(': ------------------------------');

      if ('Ok' in res) {
        setMessage(``);
        simpleToast({
          title: 'Amount unStaked Successfully',
          //   description: `${res.Ok}`,
          status: ToastStatus.success,
        });

        router.back();
      } else {
        setError(res.Err);
        simpleToast({
          title: 'Error',
          description: res.Err,
          status: ToastStatus.error,
        });
        setLoading(false);
      }
    } catch (err: unknown) {
      console.log(': ------------------------------');
      console.log(': unStakeIcrcTokensManualApi -> err', err);
      console.log(': ------------------------------');
      setError(JSON.stringify(err) || ' error');

      simpleToast({
        title: 'Error',
        description: error,
        status: ToastStatus.error,
      });
      setLoading(false);
    }
  };

  return [unStakeIcrcTokensManualApi, isLoading] as const;
}
