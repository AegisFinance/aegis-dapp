import {
  InsuranceContractInitArgs,
  InsuranceInitRes,
} from '@/declarations/insurance/insurance.did';
import { Provider } from '@/lib/auth/interface';
import { extractTransferErrorMessage } from '@/lib/utils/extract-enum-strings';
import { createCanisterActor } from '@/lib/services/create_actor';
import { CANISTERS_NAME, Result } from '@/lib/utils';
import { _INSURANCE } from '@/lib/utils/helper_contract';
import { ActorSubclass } from '@dfinity/agent';

export async function issueInsuranceContract(
  args: InsuranceContractInitArgs,
  provider: Provider
): Promise<Result<number, string>> {
  let insuranceActor: ActorSubclass<_INSURANCE> = (await createCanisterActor(
    CANISTERS_NAME.INSURANCE,
    provider
  )) as ActorSubclass<_INSURANCE>;

  //
  //
  //
  // 1. Get the current time in milliseconds
  const milliseconds = Date.now();
 
  // 2. Convert minutes to milliseconds (1 minute = 60 seconds * 1000 milliseconds/second)
  const fiveMinutesInMilliseconds = 5 * 60 * 1000;

  // 3. Add 5 minutes to the current time
  const futureTimeInMilliseconds = milliseconds + fiveMinutesInMilliseconds;

  // 4. Convert milliseconds to nanoseconds (1 millisecond = 1,000,000 nanoseconds)
  const futureTimeInNanoseconds = futureTimeInMilliseconds * 1000000;

  args.expiry_date = BigInt(futureTimeInNanoseconds);
  args.category.InflationBasedInsurance.target_expiry = BigInt(
    futureTimeInNanoseconds
  );
  //
  //
  //

  let res: InsuranceInitRes =
    await insuranceActor.create_insurance_contract(args);

  if ('Success' in res) {
    return { Ok: res.Success };
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
