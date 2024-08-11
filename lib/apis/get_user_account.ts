import { IcrcLedgerCanister, TransferParams } from '@dfinity/ledger-icrc';
import {
  ACCOUNTS_PRINCIPAL,
  asset_principal_map,
  ICP_LEDGER_PRINCIPAL,
} from '../constants/canisters';
import { ASSETS } from '../constants';
import { principalToSubAccount } from '@dfinity/utils';
import { createAgent, getPrincipal } from '../auth';
import { Provider } from '../auth/interface';

export async function user_icrc_deposit_address() {}

export async function desposit_to_account(
  amount: bigint,
  asset: ASSETS,
  provider: Provider
): Promise<typeof transferResult> {
  const { transfer } = IcrcLedgerCanister.create({
    agent: await createAgent(provider!),
    // asset == ASSETS.CKETH_SEPOLIA
    //   ? await getAgent()
    //   : await getLocalAgent(),
    canisterId: asset_principal_map.get(asset)!,
  });

  const params: TransferParams = {
    to: {
      owner: ACCOUNTS_PRINCIPAL,
      subaccount: [principalToSubAccount((await getPrincipal(provider!))!)],
    },
    amount: amount,
  };
  const transferResult = await transfer(params);
  console.log('🚀 ~ desposit_to_account ~ transferResult:', transferResult);
  return transferResult;
}
