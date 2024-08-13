import { Insurance } from '@/declarations/insurance/insurance.did';
import { getInsuranceById } from '@/lib/apis/canisters/insurance/get-insurance-by-id';
import { ProviderAtom } from '@/lib/states/jotai';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { ToastStatus } from '../../utils/toast/interface';
import { useSimpleToast } from '../../utils/toast/toast';

export function useGetInsurance(): [
  (id: number) => Promise<[Insurance] | []>,
  boolean,
] {
  const [provider] = useAtom(ProviderAtom);

  const [isLoading, setLoading] = useState<boolean>(false);

  const [simpleToast] = useSimpleToast();

  const getInsurance = async (
    insuranceId: number
  ): Promise<[Insurance] | []> => {
    try {
      setLoading(true);
      let insurance = await getInsuranceById(insuranceId, provider);

      setLoading(false);
      
      return insurance;
    } catch (error: unknown) {
      simpleToast({
        title: 'Error',
        description: JSON.stringify(error),
        status: ToastStatus.error,
      });
      setLoading(false);
      return [];
    }
  };

  return [getInsurance, isLoading] as const;
}
