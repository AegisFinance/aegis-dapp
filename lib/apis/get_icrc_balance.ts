import { Principal } from "@dfinity/principal";
import { getAgent, getIdentityPrincipal, getLocalAgent } from "../auth";
import {
  ACCOUNTS_PRINCIPAL,
  CKBTC_LEDGER_PRINCIPAL,
  CKSEPOLIA_LEDGER_PRINCIPAL,
  ICP_LEDGER_PRINCIPAL,
} from "../constants/canisters";
import {
  encodeIcrcAccount,
  IcrcAccount,
  IcrcLedgerCanister,
} from "@dfinity/ledger-icrc";
import { principalToSubAccount } from "@dfinity/utils";

export interface GetIcrcBalance {
  ICP: bigint;
  ckBTC: bigint;
  ckETH: bigint;
}

export const getCKETHBalance = async (
  account: IcrcAccount
): Promise<bigint> => {
  const { balance } = IcrcLedgerCanister.create({
    agent: await getAgent(),
    canisterId: CKSEPOLIA_LEDGER_PRINCIPAL,
  });

  return await balance(account);
};

export const getCKBTCBalance = async (
  account: IcrcAccount
): Promise<bigint> => {
  const { balance } = IcrcLedgerCanister.create({
    agent: await getLocalAgent(),
    canisterId: CKBTC_LEDGER_PRINCIPAL,
  });

  return await balance(account);
};

export const getICPBalance = async (account: IcrcAccount) => {
  const { balance } = IcrcLedgerCanister.create({
    agent: await getLocalAgent(),
    canisterId: ICP_LEDGER_PRINCIPAL,
  });

  return await balance(account);
};

export async function getIcrcBalance(
  isAccount: boolean,
  principal: Principal
): Promise<GetIcrcBalance | undefined> {
  try {
    if (isAccount) {
      let icpBalance, ckEthBalance, ckBTCBalance;
      const balanceParams: IcrcAccount = {
        owner: ACCOUNTS_PRINCIPAL,
        subaccount: principalToSubAccount(principal!),
      };

      icpBalance = await getICPBalance(balanceParams);
      ckBTCBalance = await getCKBTCBalance(balanceParams);
      ckEthBalance = await getCKETHBalance(balanceParams);

      return {
        ICP: icpBalance,
        ckBTC: ckBTCBalance,
        ckETH: ckEthBalance,
      } as GetIcrcBalance;
    } else {
      let icpBalance, ckEthBalance, ckBTCBalance;
      const balanceParams: IcrcAccount = {
        owner: principal,
      };

      icpBalance = await getICPBalance(balanceParams);
      ckBTCBalance = await getCKBTCBalance(balanceParams);
      ckEthBalance = await getCKETHBalance(balanceParams);

      return {
        ICP: icpBalance,
        ckBTC: ckBTCBalance,
        ckETH: ckEthBalance,
      } as GetIcrcBalance;
    }
  } catch (error) {
    console.error("🚀 ~ error:", error);
  }
}

export async function get_icrc_address(): Promise<string> {
  const address = encodeIcrcAccount({
    owner: ACCOUNTS_PRINCIPAL,
    subaccount: principalToSubAccount(getIdentityPrincipal()),
  });
  return address;
}
