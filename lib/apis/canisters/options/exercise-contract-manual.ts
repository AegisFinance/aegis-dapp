import {
  OptionsAssetsIcrc,
  Result_2,
} from '@/declarations/options/options.did';
import { Provider } from '@/lib/auth/interface';
import { createCanisterActor } from '@/lib/services/create_actor';
import { CANISTERS_NAME } from '@/lib/utils';
import { _OPTIONS } from '@/lib/utils/helper_contract';
import { ActorSubclass } from '@dfinity/agent';

export async function exerciseOptionManually(
  asset: OptionsAssetsIcrc,
  id: bigint,
  provider: Provider
): Promise<Result_2> {
  let optionsActor: ActorSubclass<_OPTIONS> = (await createCanisterActor(
    CANISTERS_NAME.OPTIONS,
    provider
  )) as ActorSubclass<_OPTIONS>;

  let executeManualResponse = await optionsActor.execute_manual(asset, id);
  console.log(': ----------------------');
  console.log(': executeManualResponse', executeManualResponse);
  console.log(': ----------------------');

  return executeManualResponse;
}
