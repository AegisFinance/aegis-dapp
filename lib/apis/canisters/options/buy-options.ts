import { OptionsAssetsIcrc, Result_1 } from '@/declarations/options/options.did';
import { Provider } from '@/lib/auth/interface';
import { createCanisterActor } from '@/lib/services/create_actor';
import { CANISTERS_NAME, Result } from '@/lib/utils';
import { _OPTIONS } from '@/lib/utils/helper_contract';
import { ActorSubclass } from '@dfinity/agent';

export async function buyOptionsContract(
  asset: OptionsAssetsIcrc,
  id: bigint,
  provider: Provider
): Promise<Result_1> {
  let optionsActor: ActorSubclass<_OPTIONS> = (await createCanisterActor(
    CANISTERS_NAME.OPTIONS,
    provider
  )) as ActorSubclass<_OPTIONS>;

  let buyOption = await optionsActor.trade_icrc_options(asset, id);
  console.log(': ----------------------');
  console.log(': buyOption', buyOption);
  console.log(': ----------------------');

  return buyOption;
}
