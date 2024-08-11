import { Principal } from '@dfinity/principal';
import { ASSETS } from '../constants';
import { ActorSubclass } from '@dfinity/agent';
import { _ACCOUNTS, _CKBTC_MINTER, SERVICES } from '../utils/helper_contract';
import { CANISTER_IDS_MAP, CANISTERS_NAME } from '../utils';
import { humanToE8s } from './utils';
import { CkBTCMinterCanister } from '@dfinity/ckbtc';
import { IcrcLedgerCanister } from '@dfinity/ledger-icrc';
import { CKBTC_LEDGER_PRINCIPAL } from '../constants/canisters';
import { Provider } from '../auth/interface';
import { createAgent } from '../auth';
import { createCanisterActor } from '../services/create_actor';
import {
  CanisterName,
  IcrcTransferResult,
} from '@/declarations/accounts/accounts.did';

export async function withdrawFromAccount(
  amount: bigint,
  asset: CanisterName,
  provider: Provider
): Promise<IcrcTransferResult> {
  const actorAccount: ActorSubclass<_ACCOUNTS> = (await createCanisterActor(
    CANISTERS_NAME.ACCOUNTS,
    provider!
  )) as ActorSubclass<_ACCOUNTS>;

  const withdrawResult = await actorAccount.icrc_transfer_from_account(
    asset,
    [],
    amount
  );

  return withdrawResult;
}

export async function getBitcoinAddress(
  principal: Principal,
  useAccount: boolean,
  provider: Provider
): Promise<string> {
  const actorCKBTCMinter: ActorSubclass<_CKBTC_MINTER> =
    (await createCanisterActor(
      CANISTERS_NAME.CKBTC_MINTER,
      provider
    )) as ActorSubclass<_CKBTC_MINTER>;

  const args: {
    owner: [] | [Principal];
    subaccount: [] | [Uint8Array | number[]];
  } = {
    owner: [principal],
    subaccount: [],
  };
  const address = await actorCKBTCMinter.get_btc_address(args);
  console.log('🚀 ~ address:', address);

  return address;
}

export async function updateBitcoinBalance(
  principal: Principal,
  provider: Provider
): Promise<typeof res> {
  const args: {
    owner: [] | [Principal];
    subaccount: [] | [Uint8Array | number[]];
  } = {
    owner: [principal],
    subaccount: [],
  };
  const actorCKBTCMinter: ActorSubclass<_CKBTC_MINTER> =
    (await createCanisterActor(
      CANISTERS_NAME.CKBTC_MINTER,
      provider
    )) as ActorSubclass<_CKBTC_MINTER>;

  const res = await actorCKBTCMinter.update_balance(args);
  return res;
}

export async function convertCkBtc(
  btcAddress: string,
  amount: number,
  provider: Provider
): Promise<typeof res> {
  const { getWithdrawalAccount, retrieveBtc } = CkBTCMinterCanister.create({
    agent: await createAgent(provider!),
    canisterId: CANISTER_IDS_MAP.get(CANISTERS_NAME.CKBTC_MINTER)!,
  });

  const { transfer } = IcrcLedgerCanister.create({
    agent: await createAgent(provider!),
    canisterId: CKBTC_LEDGER_PRINCIPAL,
  });

  const withdrawalAccount = await getWithdrawalAccount();
  console.log('🚀 ~ withdrawalAccount:', withdrawalAccount);

  const transferRes = await transfer({
    to: withdrawalAccount,
    amount: humanToE8s(amount)!,
  });
  console.log('🚀 ~ transferRes:', transferRes);
  const res = await retrieveBtc({
    amount: humanToE8s(amount)! - 10n,
    address: btcAddress,
  });
  console.log(res);
  return res;
}
