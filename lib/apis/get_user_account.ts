import { IcrcLedgerCanister, TransferParams } from '@dfinity/ledger-icrc';
import { principalToSubAccount } from '@dfinity/utils';
import { createAgent, getPrincipal } from '../auth';
import { Provider } from '../auth/interface';
import { ASSETS } from '../constants';
import {
  ACCOUNTS_PRINCIPAL,
  asset_principal_map,
} from '../constants/canisters';

export async function user_icrc_deposit_address() {}

export async function desposit_to_account(
  amount: bigint,
  asset: ASSETS,
  provider: Provider
): Promise<typeof transferResult> {
  const id = asset_principal_map.get(asset)!;
	console.log(": ---------------------------------------------------");
	console.log(": exportfunctionuser_icrc_deposit_address -> id", id);
	console.log(": ---------------------------------------------------");
  const { transfer } = IcrcLedgerCanister.create({
    agent: await createAgent(provider!),
    // asset == ASSETS.CKETH_SEPOLIA
    //   ? await getAgent()
    //   : await getLocalAgent(),
    canisterId: id,
  });

  const params: TransferParams = {
    to: {
      owner: ACCOUNTS_PRINCIPAL,
      subaccount: [principalToSubAccount((await getPrincipal(provider!))!)],
    },
    amount: amount,
  };
  console.log(': -----------------------------------------------------------');
  console.log(': exportfunctionuser_icrc_deposit_address -> params', params);
  console.log(': -----------------------------------------------------------');

  const transferResult = await transfer(params);
  console.log('🚀 ~ desposit_to_account ~ transferResult:', transferResult);
  return transferResult;
}
