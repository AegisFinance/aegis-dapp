import { OptionsAssets, OptionsType } from '@/declarations/options/options.did';
import { getCurrentPremiumForOptions } from '@/lib/apis/canisters/options/get-current-premium';
import { ProviderAtom } from '@/lib/states/jotai';
import { useAtom } from 'jotai';
import { useState } from 'react';

export function useGetCurrentPremiumForOptions(): [
  (
    strike_price: bigint,
    optionsType: OptionsType,
    contractExpiry: bigint,
    asset: OptionsAssets
  ) => Promise<number>,
  number,
] {
  const [provider] = useAtom(ProviderAtom);

  const [error, setError] = useState<string | undefined>(undefined);
  const [premium, setPremium] = useState<number>(0);

  const getCurrentPremium= async (
    strike_price: bigint,
    optionsType: OptionsType,
    contractExpiry: bigint,
    asset: OptionsAssets
  ): Promise<number> => {
    try {
      let res = await getCurrentPremiumForOptions(
        strike_price,
        optionsType,
        contractExpiry,
        asset,
        provider!
      );
      if ('Ok' in res) {
        setPremium(res.Ok);
        return res.Ok;
      } else {
        console.log('Premium ', res.Err);
        setPremium(0.0);
        return 0.0;
      }
    } catch (err: unknown) {
      console.log(': ------------------------------');
      console.log(': buyContractApi -> err', err);
      console.log(': ------------------------------');
      setError(JSON.stringify(err) || ' error');
      return 0.0;
    }
  };

  return [getCurrentPremium, premium] as const;
}
