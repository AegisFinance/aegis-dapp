import {
  BuyInsuranceArgs,
  InsuranceContractInitArgs,
  InsuranceInitRes,
} from '@/declarations/insurance/insurance.did';
import { issueInsuranceContract } from '@/lib/apis/canisters/insurance/issue-insurance';
import { isAuthenticatedAtom, ProviderAtom } from '@/lib/states/jotai';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useSimpleToast } from '../../utils/toast/toast';
import { ToastStatus } from '../../utils/toast/interface';
import { buyInsuranceContract } from '@/lib/apis/canisters/insurance/buy-insurance';
import { useRouter } from 'next/navigation';

export function useBuyInsuranceContract(): [
  (args: BuyInsuranceArgs) => Promise<void>,
  boolean,
] {
  const [provider] = useAtom(ProviderAtom);

  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const router = useRouter();
  const [simpleToast] = useSimpleToast();

  const buyContractApi = async (args: BuyInsuranceArgs) => {
    setLoading(true);

    try {
      let res = await buyInsuranceContract(args, provider!);
      console.log(': ------------------------------');
      console.log(': buyContractApi -> res', res);
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
      console.log(': buyContractApi -> err', err);
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

  return [buyContractApi, isLoading] as const;
}
