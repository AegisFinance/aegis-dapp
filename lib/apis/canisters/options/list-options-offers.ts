import {
  CanisterName,
  CreateOptionArgs,
  OptionsActiveListKey,
  OptionsAssetsByNames,
  OptionsType,
} from '@/declarations/options/options.did';
import { Provider } from '@/lib/auth/interface';
import { createCanisterActor } from '@/lib/services/create_actor';
import { CANISTERS_NAME, Result } from '@/lib/utils';
import { _OPTIONS } from '@/lib/utils/helper_contract';
import { ActorSubclass } from '@dfinity/agent';

export async function listOffersOptionsContract(
  args: OptionsAssetsByNames,
  optionsType: OptionsType,
  provider: Provider
): Promise<Result<[OptionsActiveListKey, null][], string>> {
  let optionsActor: ActorSubclass<_OPTIONS> = (await createCanisterActor(
    CANISTERS_NAME.OPTIONS,
    provider
  )) as ActorSubclass<_OPTIONS>;

  console.log(': ----------------------------');
  console.log(': optionsActor', optionsActor);
  console.log(': ----------------------------');
  console.log(
    'ExchangeRate',
    await optionsActor.get_canister_id({ ExchangeRate: null } as CanisterName)
  );
  return 'CALL' in optionsType
    ? await optionsActor.get_call_options_by_asset(args).then(res => {
        if (res && res[0] && res[0][0]) {
          console.log(': ----------');
          console.log(': res', res);
          console.log(': ----------');
          return { Ok: res };
        } else {
          return { Err: 'No Call Options Available to Trade' };
        }
      })
    : await optionsActor.get_put_options_by_asset(args).then(res => {
        if (res && res[0] && res[0][0]) {
          console.log(': ----------');
          console.log(': res', res);
          console.log(': ----------');
          return { Ok: res };
        } else {
          return { Err: 'No Put Options Available to Trade' };
        }
      });
}
