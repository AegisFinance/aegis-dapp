import { Account } from '@/declarations/cketh_ledger/cketh_ledger.did';
import { convertNumberToSubAccount } from '@/lib/apis/utils';
import { getPrincipal } from '@/lib/auth';
import { MAIN_PRINCIPAL } from '@/lib/constants/canisters';
import { useIcrcBalance } from '@/lib/hooks/ledgers/icrc/balance';
import { ProviderAtom } from '@/lib/states/jotai';
import { CANISTERS_NAME } from '@/lib/utils';
import { Principal } from '@dfinity/principal';
import { principalToSubAccount } from '@dfinity/utils';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

export default function StakeDashboard({ refresh }: { refresh: boolean }) {
  const [totalStakedAmount, setTotalStakedAmount] = useState<bigint>(0n);
  const [totalUserStakedAmount, setTotalUserStakedAmount] =
    useState<bigint>(0n);
  const [poolBalance, setPoolBalance] = useState<bigint>(0n);

  const [getIcrcBalance, loadingGetIcrcBalance] = useIcrcBalance();
  const [provider] = useAtom(ProviderAtom);

  useEffect(() => {
    const refreshBalances = async () => {
      let totalValueStakedBalanceArgs: Account = {
        owner: MAIN_PRINCIPAL,
        subaccount: [await convertNumberToSubAccount(0, provider!)],
      };
      let poolBalanceArgs: Account = {
        owner: MAIN_PRINCIPAL,
        subaccount: [await convertNumberToSubAccount(1, provider!)],
      };

      const principal: Principal = (await getPrincipal(provider!))!;

      let userStakedBalanceArgs: Account = {
        owner: MAIN_PRINCIPAL,
        subaccount: [principalToSubAccount(principal)],
      };

      setPoolBalance(
        await getIcrcBalance(CANISTERS_NAME.AEGIS_LEDGER, poolBalanceArgs)
      );
      setTotalStakedAmount(
        await getIcrcBalance(
          CANISTERS_NAME.AEGIS_LEDGER,
          totalValueStakedBalanceArgs
        )
      );
      setTotalUserStakedAmount(
        await getIcrcBalance(CANISTERS_NAME.AEGIS_LEDGER, userStakedBalanceArgs)
      );
    };

    refreshBalances();
  }, [refresh]);

  return (
    <>
      <div className="md:mx-auto max-w-screen-xl px-4 lg:px-2">
        <div className="flex items-center text-start bg-gray-100 dark:bg-gray-900">
          <div className="container max-w-6xl px-5 mx-auto my-28">
            <div className="shadow-xl grid items-center bg-lavender-blue-200 divide-y divide-gray-100 rounded   sm:divide-x lg:divide-y-0  grid-cols-2 md:grid-cols-4">
              <div className="p-5 lg:px-8 ">
                <div className="text-base text-start text-gray-400 ">
                  Total Staked
                </div>
                <div className="flex items-start  text-start pt-1">
                  <div className="text-2xl   text-start font-bold text-gray-900 ">
                    {totalStakedAmount || '0'}
                  </div>
                  <span className="flex items-start px-2 py-0.5 mx-2 text-sm text-green-600 bg-green-100 rounded-full">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 15L12 9L6 15"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    {/* <span>1.8%</span> */}
                  </span>
                </div>
              </div>
              <div className="p-5 lg:px-8 ">
                <div className="text-base text-gray-400 ">Your Stake</div>
                <div className="flex items-start pt-1">
                  <div className="text-2xl font-bold text-gray-900 ">
                    {totalUserStakedAmount || '0'}{' '}
                  </div>
                  <span className="flex items-start px-2 py-0.5 mx-2 text-sm text-red-600 bg-red-100 rounded-full">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    {/* <span>2.5%</span> */}
                  </span>
                </div>
              </div>
              <div className="p-5 lg:px-8 ">
                <div className="text-base text-gray-400 ">Pool Balance</div>
                <div className="flex items-start pt-1">
                  <div className="text-2xl font-bold text-gray-900 ">
                    {poolBalance || '0'}
                  </div>
                  <span className="flex items-start px-2 py-0.5 mx-2 text-sm text-green-600 bg-green-100 rounded-full">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 15L12 9L6 15"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    {/* <span>5.2%</span> */}
                  </span>
                </div>
              </div>
              <div className="p-5 lg:px-8 ">
                <div className="text-base text-gray-400 ">Rewards Schedule</div>
                <div className="flex items-start pt-1">
                  <div className="text-2xl font-bold text-gray-900 ">
                    7 days
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
