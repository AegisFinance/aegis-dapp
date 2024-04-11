import { Principal } from "@dfinity/principal";
import { ASSETS } from "../constants";
import { createActor } from "../services/create_actor";
import { ICRCLedgerType, Result_3 } from "@/declarations/accounts/accounts.did";
import { ActorSubclass } from "@dfinity/agent";
import { _ACCOUNTS, _CKBTC_MINTER, SERVICES } from "../utils/helper_contract";
import { CANISTER_IDS_MAP, CANISTERS_NAME } from "../utils";
import { humanToE8s } from "./utils";
import { CkBTCMinterCanister } from "@dfinity/ckbtc";
import { getLocalAgent } from "../auth";
import { IcrcLedgerCanister } from "@dfinity/ledger-icrc";
import { CKBTC_LEDGER_PRINCIPAL } from "../constants/canisters";

export async function withdrawFromAccount(
  amount: bigint,
  asset: ICRCLedgerType
): Promise<Result_3> {
  const actorAccount: ActorSubclass<_ACCOUNTS> = createActor(
    CANISTERS_NAME.ACCOUNTS
  ) as ActorSubclass<_ACCOUNTS>;

  const withdrawResult = await actorAccount.transfer_from_account(
    amount,
    asset
  );

  return withdrawResult;
}

export async function getBitcoinAddress(
  principal: Principal,
  useAccount: boolean
): Promise<string> {
  const actorCKBTCMinter: ActorSubclass<_CKBTC_MINTER> = createActor(
    CANISTERS_NAME.CKBTC_MINTER
  ) as ActorSubclass<_CKBTC_MINTER>;

  const args: {
    owner: [] | [Principal];
    subaccount: [] | [Uint8Array | number[]];
  } = {
    owner: [principal],
    subaccount: [],
  };
  const address = await actorCKBTCMinter.get_btc_address(args);
  console.log("🚀 ~ address:", address);

  return address;
}

export async function updateBitcoinBalance(
  principal: Principal
): Promise<typeof res> {
  const args: {
    owner: [] | [Principal];
    subaccount: [] | [Uint8Array | number[]];
  } = {
    owner: [principal],
    subaccount: [],
  };
  const actorCKBTCMinter: ActorSubclass<_CKBTC_MINTER> = createActor(
    CANISTERS_NAME.CKBTC_MINTER
  ) as ActorSubclass<_CKBTC_MINTER>;

  const res = await actorCKBTCMinter.update_balance(args);
  return res;
}

export async function convertCkBtc(
  btcAddress: string,
  amount: number
): Promise<typeof res> {
  const { getWithdrawalAccount, retrieveBtc } = CkBTCMinterCanister.create({
    agent: await getLocalAgent(),
    canisterId: CANISTER_IDS_MAP.get(CANISTERS_NAME.CKBTC_MINTER)!,
  });

  const { transfer } = IcrcLedgerCanister.create({
    agent: await getLocalAgent(),
    canisterId: CKBTC_LEDGER_PRINCIPAL,
  });

  const withdrawalAccount = await getWithdrawalAccount();
  console.log("🚀 ~ withdrawalAccount:", withdrawalAccount);

  const transferRes = await transfer({
    to: withdrawalAccount,
    amount: humanToE8s(amount)!,
  });
  console.log("🚀 ~ transferRes:", transferRes);
  const res = await retrieveBtc({
    amount: humanToE8s(amount)! - 10n,
    address: btcAddress,
  });
  console.log(res);
  return res;
}
