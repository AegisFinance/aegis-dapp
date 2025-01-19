import {
  OptionsAssetsIcrc,
  Result_2,
} from '@/declarations/options/options.did';
import { exerciseOptionManually } from '@/lib/apis/canisters/options/exercise-contract-manual';
import { ProviderAtom } from '@/lib/states/jotai';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastStatus } from '../../utils/toast/interface';
import { useSimpleToast } from '../../utils/toast/toast';

export function useExerciseOptionManually(): [
  (asset: OptionsAssetsIcrc, id: bigint) => Promise<void>,
  boolean,
] {
  const [provider] = useAtom(ProviderAtom);

  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const router = useRouter();
  const [simpleToast] = useSimpleToast();

  const exerciseManualContractApi = async (
    asset: OptionsAssetsIcrc,
    id: bigint
  ) => {
    setLoading(true);

    try {
      let res: Result_2 = await exerciseOptionManually(asset, id, provider!);

      if ('Ok' in res) {
        setMessage(``);
        simpleToast({
          title: 'Option Exercised',
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
      console.log(': exerciseManualContractApi -> err', err);
      console.log(': ------------------------------');

      simpleToast({
        title: 'Error',
        description: error,
        status: ToastStatus.error,
      });
      setLoading(false);
    }
  };

  return [exerciseManualContractApi, isLoading] as const;
}
