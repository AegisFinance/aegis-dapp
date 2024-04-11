import { IcrcLedgerCanister, TransferParams } from "@dfinity/ledger-icrc";
import {
  ACCOUNTS_PRINCIPAL_LOCAL,
  asset_principal_map,
  ICP_LEDGER_PRINCIPAL,
} from "../constants/canisters";
import { ASSETS } from "../constants";
import { getAgent, getIdentityPrincipal, getLocalAgent } from "../auth";
import { principalToSubAccount } from "@dfinity/utils";

export async function user_icrc_deposit_address() {}

export async function desposit_to_account(
  amount: bigint,
  asset: ASSETS
): Promise<typeof transferResult> {
  const { transfer } = IcrcLedgerCanister.create({
    agent:
      asset == ASSETS.CKETH_SEPOLIA
        ? await getAgent()
        : await getLocalAgent(),
    canisterId: asset_principal_map.get(asset)!,
  });

  const params: TransferParams = {
    to: {
      owner: ACCOUNTS_PRINCIPAL_LOCAL,
      subaccount: [principalToSubAccount(getIdentityPrincipal())],
    },
    amount: amount,
  };
  const transferResult = await transfer(params);
  console.log("🚀 ~ desposit_to_account ~ transferResult:", transferResult);
  return transferResult;
}
