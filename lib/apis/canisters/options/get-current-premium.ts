import { OptionsAssets, OptionsType } from '@/declarations/options/options.did';
import { Provider } from '@/lib/auth/interface';
import { createCanisterActor } from '@/lib/services/create_actor';
import { CANISTERS_NAME, Result } from '@/lib/utils';
import { _INSURANCE, _OPTIONS } from '@/lib/utils/helper_contract';
import { ActorSubclass } from '@dfinity/agent';

export async function getCurrentPremiumForOptions(
  strike_price: bigint,
  optionsType: OptionsType,
  contractExpiry: bigint,
  asset: OptionsAssets,

  provider: Provider
): Promise<Result<number, string>> {
  let optionsActor: ActorSubclass<_OPTIONS> = (await createCanisterActor(
    CANISTERS_NAME.OPTIONS,
    provider!
  )) as ActorSubclass<_OPTIONS>;

  return await optionsActor.calculate_premium(
    strike_price,
    optionsType,
    contractExpiry,
    asset
  );
}
