import { useState } from 'react';
import { useSimpleToast } from '../../utils/toast/toast';
import { ToastStatus } from '../../utils/toast/interface';
import { listInsurances } from '@/lib/apis/canisters/insurance/list_insurances';
import { useAtom } from 'jotai';
import { insuranceKeyListAtom, ProviderAtom } from '@/lib/states/jotai';
import { InsuranceActiveListKey } from '@/declarations/insurance/insurance.did';

export function useListInsurancesKey(): [
  () => Promise<void>,
  boolean,
  [InsuranceActiveListKey, null][] | undefined,
] {
  const [provider] = useAtom(ProviderAtom);
  const [list, setList] = useAtom(insuranceKeyListAtom);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [simpleToast] = useSimpleToast();

  const listInsurance = async (): Promise<void> => {
    setLoading(true);

    try {
      let res = await listInsurances(provider!);
      console.log(': ----------');
      console.log(': res', res);
      console.log(': ----------');
      setList(res);
      setLoading(false);
    } catch (err: unknown) {
			console.log(": ----------");
			console.log(": err", err);
			console.log(": ----------");
      simpleToast({
        title: 'Error',
        description: JSON.stringify(err),
        status: ToastStatus.error,
      });
      setLoading(false);
      return;
    }
  };

  return [listInsurance, isLoading, list] as const;
}
