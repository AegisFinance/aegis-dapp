import { InsuranceActiveListKey } from '@/declarations/insurance/insurance.did';
import { listInsurances } from '@/lib/apis/canisters/insurance/list_insurances';
import {
  insuranceKeyListAtom,
  optionsAssets,
  optionsOfferListAtom,
  ProviderAtom,
} from '@/lib/states/jotai';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { ToastStatus } from '../../utils/toast/interface';
import { useSimpleToast } from '../../utils/toast/toast';
import {
  OptionsActiveListKey,
  OptionsAssetsByNames,
  OptionsType,
} from '@/declarations/options/options.did';
import { listOffersOptionsContract } from '@/lib/apis/canisters/options/list-options-offers';
import { OptionsAssets } from '@/lib/states/types';

export function useListOptionsOfferList(): [
  (optionType:OptionsType) => Promise<void>,
  boolean,
  [OptionsActiveListKey, null][] | undefined,
] {
  const [provider] = useAtom(ProviderAtom);
  const [list, setList] = useAtom(optionsOfferListAtom);
  const [getOptionsAsset, setOptionsAsset] = useAtom(optionsAssets);

  const [isLoading, setLoading] = useState<boolean>(false);

  const [simpleToast] = useSimpleToast();

  const listOfferOptions = async (optionType:OptionsType): Promise<void> => {
    setLoading(true);

    try {
      let args =
        OptionsAssets.CKBTC == getOptionsAsset
          ? { CKBTC: null }
          : { CKETH: null };

      let res = await listOffersOptionsContract(args,optionType, provider!);

      console.log(': ----------');
      console.log(': res', res);
      console.log(': ----------');
      setList('Ok' in res ? res.Ok : []);
      setLoading(false);
    } catch (err: unknown) {
      console.log(': ----------');
      console.log(': err', err);
      console.log(': ----------');
      simpleToast({
        title: 'Error',
        description: JSON.stringify(err),
        status: ToastStatus.error,
      });
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return [listOfferOptions, isLoading, list] as const;
}
