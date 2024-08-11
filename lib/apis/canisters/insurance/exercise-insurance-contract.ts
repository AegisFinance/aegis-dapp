import { ExecuteInsuranceContractRes } from '@/declarations/insurance/insurance.did';
import { Provider } from '@/lib/auth/interface';
import { createCanisterActor } from '@/lib/services/create_actor';
import { CANISTERS_NAME, Result } from '@/lib/utils';
import {
  extractTransferErrorMessage,
  extractTransferErrorMessage1,
} from '@/lib/utils/extract-enum-strings';
import { _INSURANCE } from '@/lib/utils/helper_contract';
import { ActorSubclass } from '@dfinity/agent';

export async function exerciseInsuranceContract(
  insuranceId: number,
  provider: Provider
): Promise<Result<boolean, string>> {
  let insuranceActor: ActorSubclass<_INSURANCE> = (await createCanisterActor(
    CANISTERS_NAME.INSURANCE,
    provider!
  )) as ActorSubclass<_INSURANCE>;

  let res: ExecuteInsuranceContractRes =
    await insuranceActor.execute_insurance_contract_manual(insuranceId);

  if ('Success' in res) {
    return { Ok: true };
  } else if ('TransferError' in res) {
    const transferError = res.TransferError;
    if ('TransferErrorMessage' in transferError) {
      return {
        Err: extractTransferErrorMessage1(transferError.TransferErrorMessage),
      };
    } else if ('TransferErrorString' in transferError) {
      return { Err: transferError.TransferErrorString };
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
