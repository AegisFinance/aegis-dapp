import { Account } from '@/declarations/cketh_ledger/cketh_ledger.did';
import { getPrincipal } from '@/lib/auth';
import { Provider } from '@/lib/auth/interface';
import { CANISTERS_NAME } from '@/lib/utils';
import { encodeIcrcAccount } from '@dfinity/ledger-icrc';
import { Principal } from '@dfinity/principal';
import { principalToSubAccount } from '@dfinity/utils';
import { ACCOUNTS_PRINCIPAL } from '../../../constants/canisters';
import { getIcrcBalance } from '../icrc/balance';

export interface GetIcrcBalance {
  ICP: bigint;
  ckBTC: bigint;
  ckETH: bigint;
  ckUSDT: bigint;
}

export async function getIcrcBalances(
  isAccount: boolean,
  principal: Principal,
  provider: Provider
): Promise<GetIcrcBalance | undefined> {
  console.log(': ----------------------------------------------------');
  console.log(': principal', principal);

  console.log(': ----------------------------------------------------');
  console.log(': --------------------');
  console.log(': provider', provider);
  console.log(': --------------------');
  try {
    if (isAccount) {
      let icpBalance, ckEthBalance, ckBTCBalance, ckUsdtBalance;
      const balanceParams: Account = {
        owner: ACCOUNTS_PRINCIPAL,
        subaccount: [principalToSubAccount(principal!)],
      };

      icpBalance = await getIcrcBalance(
        CANISTERS_NAME.ICP_LEDGER,
        balanceParams,
        provider
      );

      ckBTCBalance = await getIcrcBalance(
        CANISTERS_NAME.CKBTC_LEDGER,
        balanceParams,
        provider
      );
      ckEthBalance = await getIcrcBalance(
        CANISTERS_NAME.CKETH_LEDGER,
        balanceParams,
        provider
      );
      ckUsdtBalance = await getIcrcBalance(
        CANISTERS_NAME.CKUSDT_LEDGER,
        balanceParams,
        provider
      );
      return {
        ICP: icpBalance,
        ckBTC: ckBTCBalance,
        ckETH: ckEthBalance,
        ckUSDT: ckUsdtBalance,
      } as GetIcrcBalance;
    } else {
      let icpBalance, ckEthBalance, ckBTCBalance, ckUsdtBalance;
      const balanceParams: Account = {
        owner: principal,
        subaccount: [],
      };

      icpBalance = await getIcrcBalance(
        CANISTERS_NAME.ICP_LEDGER,
        balanceParams,
        provider
      );

      ckBTCBalance = await getIcrcBalance(
        CANISTERS_NAME.CKBTC_LEDGER,
        balanceParams,
        provider
      );
      ckEthBalance = await getIcrcBalance(
        CANISTERS_NAME.CKETH_LEDGER,
        balanceParams,
        provider
      );
      ckUsdtBalance = await getIcrcBalance(
        CANISTERS_NAME.CKUSDT_LEDGER,
        balanceParams,
        provider
      );
      return {
        ICP: icpBalance,
        ckBTC: ckBTCBalance,
        ckETH: ckEthBalance,
        ckUSDT: ckUsdtBalance,
      } as GetIcrcBalance;
    }
  } catch (error) {
    console.error('🚀 ~ error:', error);
  }
}

export async function get_icrc_address(provider: Provider): Promise<string> {
  const address = encodeIcrcAccount({
    owner: ACCOUNTS_PRINCIPAL,
    subaccount: principalToSubAccount((await getPrincipal(provider))!),
  });
  return address;
}
