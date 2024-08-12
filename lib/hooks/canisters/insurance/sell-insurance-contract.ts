import { SellInsuranceArgs } from '@/declarations/insurance/insurance.did';
import { ProviderAtom } from '@/lib/states/jotai';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useSimpleToast } from '../../utils/toast/toast';
import { ToastStatus } from '../../utils/toast/interface';
import { useRouter } from 'next/navigation';
import { sellInsuranceContract } from '@/lib/apis/canisters/insurance/sell-insurance';

export function usesellInsuranceContract(): [
  (args: SellInsuranceArgs) => Promise<void>,
  boolean,
] {
  const [provider] = useAtom(ProviderAtom);

  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [, setMessage] = useState<string | undefined>(undefined);

  const router = useRouter();
  const [simpleToast] = useSimpleToast();

  const sellContractApi = async (args: SellInsuranceArgs) => {
    setLoading(true);

    try {
      let res = await sellInsuranceContract(args, provider!);
      console.log(': ------------------------------');
      console.log(': sellContractApi -> res', res);
      console.log(': ------------------------------');

      if ('Ok' in res) {
        setMessage(``);
        simpleToast({
          title: 'Insurance Purchased',
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
      console.log(': sellContractApi -> err', err);
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

  return [sellContractApi, isLoading] as const;
}
