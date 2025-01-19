import {
  CanisterName,
  CreateOptionArgs,
  OptionsActiveListKey,
  OptionsAssetsByNames,
  OptionsContractState,
  OptionsType,
  TradedOptionsContractsKey,
  TradedOptionsContractsValue,
} from '@/declarations/options/options.did';
import { Provider } from '@/lib/auth/interface';
import { createCanisterActor } from '@/lib/services/create_actor';
import { CANISTERS_NAME, Result } from '@/lib/utils';
import { _OPTIONS } from '@/lib/utils/helper_contract';
import { ActorSubclass } from '@dfinity/agent';

export async function listOffersOptionsActivity(
  state: OptionsContractState,
  provider: Provider
): Promise<[TradedOptionsContractsKey, TradedOptionsContractsValue][]> {
  let optionsActor: ActorSubclass<_OPTIONS> = (await createCanisterActor(
    CANISTERS_NAME.OPTIONS,
    provider
  )) as ActorSubclass<_OPTIONS>;

  return await optionsActor.get_options_trade_history_by_principal(state);
}
