import {
  BuyInsuranceArgs,
  ExecuteInsuranceContractRes,
} from '@/declarations/insurance/insurance.did';
import { ProviderAtom } from '@/lib/states/jotai';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastStatus } from '../../utils/toast/interface';
import { useSimpleToast } from '../../utils/toast/toast';
import { exerciseInsuranceContract } from '@/lib/apis/canisters/insurance/exercise-insurance-contract';

export function useExerciseInsuranceContract(): [
  (args: number) => Promise<void>,
  boolean,
] {
  const [provider] = useAtom(ProviderAtom);

  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const [simpleToast] = useSimpleToast();

  const exerciseContractApi = async (args: number) => {
    setLoading(true);

    try {
      let res = await exerciseInsuranceContract(args, provider!);
      console.log(': ---------------------------------');
      console.log(': exerciseContractApi -> res', res);
      console.log(': ---------------------------------');

      if ('Ok' in res) {
        simpleToast({
          title: 'Insurance Exercised',
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
      console.log(': ---------------------------------');
      console.log(': exerciseContractApi -> err', err);
      console.log(': ---------------------------------');

      setError(JSON.stringify(err) || ' error');

      simpleToast({
        title: 'Error',
        description: error,
        status: ToastStatus.error,
      });
      setLoading(false);
    }
  };

  return [exerciseContractApi, isLoading] as const;
}
