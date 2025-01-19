import { Insurance } from '@/declarations/insurance/insurance.did';
import { getInsuranceById } from '@/lib/apis/canisters/insurance/get-insurance-by-id';
import { ProviderAtom } from '@/lib/states/jotai';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { ToastStatus } from '../../utils/toast/interface';
import { useSimpleToast } from '../../utils/toast/toast';
import { Options } from '@/declarations/options/options.did';
import { getOptionsById } from '@/lib/apis/canisters/options/get-options';

export function useGetoptions(): [
  (id: bigint) => Promise<Options | undefined>,
  boolean,
] {
  const [provider] = useAtom(ProviderAtom);

  const [isLoading, setLoading] = useState<boolean>(false);

  const [simpleToast] = useSimpleToast();

  const getOption = async (optionsId: bigint): Promise<Options | undefined> => {
    try {
      setLoading(true);
      let options: Options | undefined = await getOptionsById(
        optionsId,
        provider
      ).then(res => {
        if ('Ok' in res) {
          return res.Ok;
        } else {
          simpleToast({
            title: 'Error',
            description: JSON.stringify(res.Err),
            status: ToastStatus.error,
          });
          setLoading(false);
          return undefined;
        }
      });

      setLoading(false);

      return options;
    } catch (error: unknown) {
      simpleToast({
        title: 'Error',
        description: JSON.stringify(error),
        status: ToastStatus.error,
      });
      setLoading(false);
      return undefined;
    }
  };

  return [getOption, isLoading] as const;
}
