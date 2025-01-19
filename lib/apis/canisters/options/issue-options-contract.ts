import { CreateOptionArgs } from '@/declarations/options/options.did';
import { Provider } from '@/lib/auth/interface';
import { createCanisterActor } from '@/lib/services/create_actor';
import { CANISTERS_NAME, Result } from '@/lib/utils';
import { _OPTIONS } from '@/lib/utils/helper_contract';
import { ActorSubclass } from '@dfinity/agent';

export async function issueOptionsContract(
  args: CreateOptionArgs,
  provider: Provider
): Promise<Result<string, string>> {
  //   let insuranceActor: ActorSubclass<_INSURANCE> = (await createCanisterActor(
  //     CANISTERS_NAME.INSURANCE,
  //     provider
  //   )) as ActorSubclass<_INSURANCE>;

  let optionsActor: ActorSubclass<_OPTIONS> = (await createCanisterActor(
    CANISTERS_NAME.OPTIONS,
    provider
  )) as ActorSubclass<_OPTIONS>;

  //
  //
  // //
  // 1. Get the current time in milliseconds
  const milliseconds = Date.now();

  // 2. Convert minutes to milliseconds (1 minute = 60 seconds * 1000 milliseconds/second)
  const fiveMinutesInMilliseconds = 1 * 60 * 1000;

  // 3. Add 5 minutes to the current time
  const futureTimeInMilliseconds = milliseconds + fiveMinutesInMilliseconds;

  // 4. Convert milliseconds to nanoseconds (1 millisecond = 1,000,000 nanoseconds)
  const futureTimeInNanoseconds = futureTimeInMilliseconds * 1000000;

  args.contract_expiry = BigInt(
    (milliseconds + fiveMinutesInMilliseconds * 5) * 1000000
  );
  args.offer_duration = BigInt(
    (milliseconds + fiveMinutesInMilliseconds * 3) * 1000000
  );
  //
  //
  //   //
  //   const fiveMinutesInNanoseconds = 5 * 60 * 1000 * 1000000;
  //   console.log('Expiry Date Curr', args.expiry_date);
  //   let expiryPlusAddFiveMinutes =
  //     args.expiry_date + BigInt(fiveMinutesInNanoseconds);

  //   console.log(': ----------------------------------------------------');
  //   console.log(': expiryPlusAddFiveMinutes', expiryPlusAddFiveMinutes);
  //   console.log(': ----------------------------------------------------');

  //   args.expiry_date = expiryPlusAddFiveMinutes;
  //   args.category.InflationBasedInsurance.target_expiry =
  //     expiryPlusAddFiveMinutes;

  //   let res: InsuranceInitRes =
  //     await insuranceActor.create_insurance_contract(args);

  //   if ('Success' in res) {
  //     return { Ok: res.Success };
  //   } else if ('TransferError' in res) {
  //     const transferError = res.TransferError;
  //     if ('TransferFromErrorMessage' in transferError) {
  //       return {
  //         Err: extractTransferErrorMessage(
  //           transferError.TransferFromErrorMessage
  //         ),
  //       };
  //     } else if ('TransferFromErrorString' in transferError) {
  //       return { Err: transferError.TransferFromErrorString };
  //     } else if ('TransferFromSuccess' in transferError) {
  //       return {
  //         Err: `Transfer successful, amount: ${transferError.TransferFromSuccess}`,
  //       };
  //     } else {
  //       return {
  //         Err: JSON.stringify(res),
  //       };
  //     }
  //   } else {
  //     return {
  //       Err: res.ErrorMessage,
  //     };
  //   }
  let assetIcrc = 'ICRC' in args.asset ? args.asset.ICRC : null;
  return await optionsActor.create_icrc_options(assetIcrc!, args);
}
