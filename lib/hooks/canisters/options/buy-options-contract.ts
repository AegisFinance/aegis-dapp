import { BuyInsuranceArgs } from '@/declarations/insurance/insurance.did';
import { buyInsuranceContract } from '@/lib/apis/canisters/insurance/buy-insurance';
import { ProviderAtom } from '@/lib/states/jotai';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastStatus } from '../../utils/toast/interface';
import { useSimpleToast } from '../../utils/toast/toast';
import {
  OptionsAssets,
  OptionsAssetsIcrc,
} from '@/declarations/options/options.did';
import { buyOptionsContract } from '@/lib/apis/canisters/options/buy-options';

export function useBuyOptionsContract(): [
  (asset: OptionsAssetsIcrc, id: bigint) => Promise<void>,
  boolean,
] {
  const [provider] = useAtom(ProviderAtom);

  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const router = useRouter();
  const [simpleToast] = useSimpleToast();

  const buyContractApi = async (asset: OptionsAssetsIcrc, id: bigint) => {
    setLoading(true);

    try {
      let res = await buyOptionsContract(asset, id, provider!);

      if ('Ok' in res) {
        setMessage(``);
        simpleToast({
          title: 'Option Purchased',
          description: `${res.Ok}`,
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
      console.log(': buyContractApi -> err', err);
      console.log(': ------------------------------');
      // setError((err) || ' error');

      simpleToast({
        title: 'Error',
        description: error,
        status: ToastStatus.error,
      });
      setLoading(false);
    }
  };

  return [buyContractApi, isLoading] as const;
}
