import { Insurance } from '@/declarations/insurance/insurance.did';
import { Options } from '@/declarations/options/options.did';
import { Provider } from '@/lib/auth/interface';
import { createCanisterActor } from '@/lib/services/create_actor';
import { CANISTERS_NAME, Result } from '@/lib/utils';
import { _INSURANCE, _OPTIONS } from '@/lib/utils/helper_contract';
import { ActorSubclass } from '@dfinity/agent';

export async function getOptionsById(
  id: bigint,
  provider: Provider | undefined
): Promise<Result<Options, String>> {
  let optionsActor: ActorSubclass<_OPTIONS> = (await createCanisterActor(
    CANISTERS_NAME.OPTIONS,
    provider!
  )) as ActorSubclass<_OPTIONS>;

  let res: Result<Options, String> = await optionsActor.get_option_by_id(id);

  return res;
}
