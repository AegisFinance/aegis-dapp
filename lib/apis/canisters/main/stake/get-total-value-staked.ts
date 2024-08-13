import {
  StakeAsset,
  StakeIcrcRes,
  TotalValueLockedRes,
} from '@/declarations/main/main.did';
import { e8sToHuman } from '@/lib/apis/utils';
import { Provider } from '@/lib/auth/interface';
import { createCanisterActor } from '@/lib/services/create_actor';
import { CANISTERS_NAME } from '@/lib/utils';
import { _MAIN } from '@/lib/utils/helper_contract';
import { ActorSubclass } from '@dfinity/agent';

export async function getTotalValueStaked(
  asset: StakeAsset,
  provider: Provider
): Promise<number> {
  let mainActor: ActorSubclass<_MAIN> = (await createCanisterActor(
    CANISTERS_NAME.MAIN,
    provider
  )) as ActorSubclass<_MAIN>;

  let res: TotalValueLockedRes = await mainActor.get_total_value_locked(asset);
  console.log(': ----------');
  console.log(': res', res);
  console.log(': ----------');

  if ('ICRC' in res) {
    return e8sToHuman(res.ICRC) ?? 0;
  }

  return 0;
}
