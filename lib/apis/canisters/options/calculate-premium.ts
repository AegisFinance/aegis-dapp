import {
  OptionsAssets,
  OptionsType,
  Result,
} from '@/declarations/options/options.did';
import { Provider } from '@/lib/auth/interface';
import { createCanisterActor } from '@/lib/services/create_actor';
import { CANISTERS_NAME } from '@/lib/utils';
import { _OPTIONS } from '@/lib/utils/helper_contract';
import { ActorSubclass } from '@dfinity/agent';

export async function calculatePremium(
  strike_price: bigint,
  optionType: OptionsType,
  expiry: bigint,
  asset: OptionsAssets,
  provider: Provider
): Promise<Result> {
  let optionsActor: ActorSubclass<_OPTIONS> = (await createCanisterActor(
    CANISTERS_NAME.OPTIONS,
    provider
  )) as ActorSubclass<_OPTIONS>;

  return await optionsActor.calculate_premium(
    strike_price,
    optionType,
    expiry,
    asset
  );
}
