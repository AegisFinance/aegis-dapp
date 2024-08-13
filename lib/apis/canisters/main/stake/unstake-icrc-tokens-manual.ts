import {
  IcrcAsset,
  StakeIcrcArgs,
  StakeIcrcRes,
  ExecuteUnstakeAmountRes,
  UnStakeIcrcArgs,
} from '@/declarations/main/main.did';
import { Provider } from '@/lib/auth/interface';
import { createCanisterActor } from '@/lib/services/create_actor';
import { CANISTERS_NAME, Result } from '@/lib/utils';
import {
  extractTransferErrorMessage,
  extractTransferErrorMessage1,
} from '@/lib/utils/extract-enum-strings';
import { _MAIN } from '@/lib/utils/helper_contract';
import { ActorSubclass } from '@dfinity/agent';

export async function unStakeIcrcTokensManual(
  asset: IcrcAsset,
   provider: Provider
): Promise<Result<boolean, string>> {
  let mainActor: ActorSubclass<_MAIN> = (await createCanisterActor(
    CANISTERS_NAME.MAIN,
    provider
  )) as ActorSubclass<_MAIN>;

  let res: ExecuteUnstakeAmountRes =
    await mainActor.icrc_unstake_tokens_manual(asset);

  if ('Success' in res) {
    return { Ok: true };
  } else if ('TransferError' in res) {
    return {
      Err: extractTransferErrorMessage1(res.TransferError),
    };
  } else {
    return { Err: res.ErrorMessage };
  }
}
