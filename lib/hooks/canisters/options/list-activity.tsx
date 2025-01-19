import {
  OptionsActiveListKey,
  OptionsContractState,
  TradedOptionsContractsKey,
  TradedOptionsContractsValue,
} from '@/declarations/options/options.did';
import { listOffersOptionsActivity } from '@/lib/apis/canisters/options/list-options-activity';
import {
  optionsActivityListAtom,
  optionsOfferListAtom,
  ProviderAtom,
} from '@/lib/states/jotai';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { ToastStatus } from '../../utils/toast/interface';
import { useSimpleToast } from '../../utils/toast/toast';

export function useListOptionsActivity(): [
  (state: OptionsContractState) => Promise<void>,
  boolean,
  [TradedOptionsContractsKey, TradedOptionsContractsValue][],
] {
  const [provider] = useAtom(ProviderAtom);
  const [list, setList] = useAtom(optionsActivityListAtom);

  const [isLoading, setLoading] = useState<boolean>(false);

  const [simpleToast] = useSimpleToast();

  const listOfferOptions = async (
    state: OptionsContractState
  ): Promise<void> => {
    setLoading(true);

    try {
      let res: [TradedOptionsContractsKey, TradedOptionsContractsValue][] =
        await listOffersOptionsActivity(state, provider!);
      console.log(': --------------');
      console.log(': state', state);
      console.log(': --------------');

      console.log(': ----------');
      console.log(': res', res);
      console.log(': ----------');

      setList(res);

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
