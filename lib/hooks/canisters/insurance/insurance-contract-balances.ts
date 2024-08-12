import {
  getInsurancePoolBalance,
  getInsurancePremiumPoolBalance,
} from '@/lib/apis/canisters/insurance/get-insurance-contract-balances';
import { ProviderAtom } from '@/lib/states/jotai';
import { useAtom } from 'jotai';
import { useState } from 'react';

export function useGetInsurancePoolBalance(): [
  (id: number) => Promise<bigint>,
  bigint,
] {
  const [provider] = useAtom(ProviderAtom);

  const [, setError] = useState<string | undefined>(undefined);
  const [poolBalance, setPoolBalance] = useState<bigint>(0n);

  const getCurrentInsurancePoolBalance = async (
    args: number
  ): Promise<bigint> => {
    try {
      let res = await getInsurancePoolBalance(args, provider!);
      setPoolBalance(res);
      return res;
    } catch (err: unknown) {
      console.log(': ----------------------------------------');
      console.log(': useGetInsurancePoolBalance -> err', err);
      console.log(': ----------------------------------------');

      setError(JSON.stringify(err) || ' error');
      return 0n;
    }
  };

  return [getCurrentInsurancePoolBalance, poolBalance] as const;
}

export function useGetInsurancePremiumPoolBalance(): [
  (id: number) => Promise<bigint>,
  bigint,
] {
  const [provider] = useAtom(ProviderAtom);

  const [, setError] = useState<string | undefined>(undefined);
  const [premiumBalance, setPoolBalance] = useState<bigint>(0n);

  const getCurrentInsurancePremiumPoolBalance = async (
    args: number
  ): Promise<bigint> => {
    try {
      let res = await getInsurancePremiumPoolBalance(args, provider!);
      setPoolBalance(res);
      return res;
    } catch (err: unknown) {
      console.log(': -----------------------------------------------');
      console.log(': useGetInsurancePremiumPoolBalance -> err', err);
      console.log(': -----------------------------------------------');

      setError(JSON.stringify(err) || ' error');
      return 0n;
    }
  };

  return [getCurrentInsurancePremiumPoolBalance, premiumBalance] as const;
}
