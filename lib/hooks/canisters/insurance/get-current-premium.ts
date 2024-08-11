import { ProviderAtom } from '@/lib/states/jotai';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSimpleToast } from '../../utils/toast/toast';
import { ToastStatus } from '../../utils/toast/interface';
import { getCurrentPremiumByInsuranceId } from '@/lib/apis/canisters/insurance/get-current-premium';

export function useGetCurrentPremiumByInsuranceId(): [
  (id: number) => Promise<bigint>,
  bigint,
] {
  const [provider] = useAtom(ProviderAtom);

  const [error, setError] = useState<string | undefined>(undefined);
  const [premium, setPremium] = useState<bigint>(0n);

  const getCurrentInsurance = async (args: number): Promise<bigint> => {
    try {
      let res = await getCurrentPremiumByInsuranceId(args, provider!);
      setPremium(res);
      return res;
    } catch (err: unknown) {
      console.log(': ------------------------------');
      console.log(': buyContractApi -> err', err);
      console.log(': ------------------------------');
      setError(JSON.stringify(err) || ' error');
      return 0n;
    }
  };

  return [getCurrentInsurance, premium] as const;
}
