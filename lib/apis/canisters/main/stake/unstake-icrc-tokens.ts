import {
  IcrcAsset,
  StakeIcrcArgs,
  StakeIcrcRes,
  UnStakeIcrcArgs,
} from '@/declarations/main/main.did';
import { Provider } from '@/lib/auth/interface';
import { createCanisterActor } from '@/lib/services/create_actor';
import { CANISTERS_NAME, Result } from '@/lib/utils';
import { extractTransferErrorMessage } from '@/lib/utils/extract-enum-strings';
import { _MAIN } from '@/lib/utils/helper_contract';
import { ActorSubclass } from '@dfinity/agent';

export async function unStakeIcrcTokens(
  asset: IcrcAsset,
  unstakeArgs: UnStakeIcrcArgs,
  provider: Provider
): Promise<Result<boolean, string>> {
  let mainActor: ActorSubclass<_MAIN> = (await createCanisterActor(
    CANISTERS_NAME.MAIN,
    provider
  )) as ActorSubclass<_MAIN>;

  let res: StakeIcrcRes = await mainActor.icrc_unstake_tokens(
    asset,
    unstakeArgs
  );

  if ('Success' in res) {
    return { Ok: true };
  } else if ('TransferError' in res) {
    const transferError = res.TransferError;
    if ('TransferFromErrorMessage' in transferError) {
      return {
        Err: extractTransferErrorMessage(
          transferError.TransferFromErrorMessage
        ),
      };
    } else if ('TransferFromErrorString' in transferError) {
      return { Err: transferError.TransferFromErrorString };
    } else if ('TransferFromSuccess' in transferError) {
      return {
        Err: `Transfer successful, amount: ${transferError.TransferFromSuccess}`,
      };
    } else {
      return {
        Err: JSON.stringify(res),
      };
    }
  } else {
    return {
      Err: res.ErrorMessage,
    };
  }
}
