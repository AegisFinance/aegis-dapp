import { IcrcAsset, StakeIcrcArgs } from '@/declarations/main/main.did';
import { stakeIcrcTokens } from '@/lib/apis/canisters/main/stake/stake-icrc-tokens';
import { ToastStatus } from '@/lib/hooks/utils/toast/interface';
import { useSimpleToast } from '@/lib/hooks/utils/toast/toast';
import { ProviderAtom } from '@/lib/states/jotai';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useStakeIcrcTokens() {
  const [provider] = useAtom(ProviderAtom);

  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [, setMessage] = useState<string | undefined>(undefined);

  const router = useRouter();
  const [simpleToast] = useSimpleToast();

  const stakeIcrcTokensApi = async (asset: IcrcAsset, args: StakeIcrcArgs) => {
    setLoading(true);

    try {
      let res = await stakeIcrcTokens(asset, args, provider!);
      console.log(': ------------------------------');
      console.log(': stakeIcrcTokensApi -> res', res);
      console.log(': ------------------------------');

      if ('Ok' in res) {
        setMessage(``);
        simpleToast({
          title: 'Amount Staked Successfully',
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
      console.log(': stakeIcrcTokensApi -> err', err);
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

  return [stakeIcrcTokensApi, isLoading] as const;
}
