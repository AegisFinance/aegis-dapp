import {
  SellInsuranceArgs,
  BuyInsuranceRes as SellInsuranceRes,
} from '@/declarations/insurance/insurance.did';
import { Provider } from '@/lib/auth/interface';
import { createCanisterActor } from '@/lib/services/create_actor';
import { CANISTERS_NAME, Result } from '@/lib/utils';
import { extractTransferErrorMessage } from '@/lib/utils/extract-enum-strings';
import { _INSURANCE } from '@/lib/utils/helper_contract';
import { ActorSubclass } from '@dfinity/agent';

export async function sellInsuranceContract(
  args: SellInsuranceArgs,
  provider: Provider
): Promise<Result<boolean, string>> {
  let insuranceActor: ActorSubclass<_INSURANCE> = (await createCanisterActor(
    CANISTERS_NAME.INSURANCE,
    provider
  )) as ActorSubclass<_INSURANCE>;

  let res: SellInsuranceRes =
    await insuranceActor.sell_insurance_contract(args);

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
