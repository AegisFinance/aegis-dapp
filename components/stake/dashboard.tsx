import { Account } from '@/declarations/cketh_ledger/cketh_ledger.did';
import { StakeAsset } from '@/declarations/main/main.did';
import { getTotalValueStaked } from '@/lib/apis/canisters/main/stake/get-total-value-staked';
import { convertNumberToSubAccount, e8sToHuman } from '@/lib/apis/utils';
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
  const [totalStakedAmount, setTotalStakedAmount] = useState<
    number | undefined
  >(undefined);
  const [totalUserStakedAmount, setTotalUserStakedAmount] = useState<
    number | undefined
  >(undefined);
  const [poolBalance, setPoolBalance] = useState<number | undefined>(undefined);

  const [getIcrcBalance, loadingGetIcrcBalance] = useIcrcBalance();
  const [provider] = useAtom(ProviderAtom);

  useEffect(() => {
    const refreshBalances = async () => {
      let totalValueStakedBalanceArgs: StakeAsset = {
        ICRC: {
          AEGIS: null,
        },
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
        e8sToHuman(
          await getIcrcBalance(CANISTERS_NAME.AEGIS_LEDGER, poolBalanceArgs)
        )
      );
      setTotalStakedAmount(
        await getTotalValueStaked(totalValueStakedBalanceArgs, provider!)
      );
      setTotalUserStakedAmount(
        e8sToHuman(
          await getIcrcBalance(
            CANISTERS_NAME.AEGIS_LEDGER,
            userStakedBalanceArgs
          )
        )
      );

      console.log('totalStakedAmount', totalStakedAmount);
      console.log('totalUserStakedAmount', totalUserStakedAmount);
      console.log('poolBalance', poolBalance);
    };

    refreshBalances();
  }, [refresh]);

  return (
    <>
      <div className="md:mx-auto max-w-screen-xl px-4 lg:px-2      ">
        <div className="flex       bg-gray-100 dark:bg-gray-900">
          <div className="container justify-center max-w-6xl px-5 mx-auto my-28">
            <div className="shadow-xl grid      bg-lavender-blue-200 divide-y divide-gray-100 rounded   sm:divide-x lg:divide-y-0  grid-cols-2 md:grid-cols-3">
              <div className="p-5 lg:px-8 ">
                <div className="text-base  text-gray-400 ">Total Staked</div>
                <div className="flex        pt-1">
                  <div className="text-2xl         font-bold text-gray-900 ">
                    {totalStakedAmount || '0'}
                  </div>
                </div>
              </div>
              <div className="p-5 lg:px-8 ">
                <div className="text-base text-gray-400 ">Your Stake</div>
                <div className="flex      pt-1">
                  <div className="text-2xl font-bold text-gray-900 ">
                    {totalUserStakedAmount || '0'}
                  </div>
                  {/* <span className="flex      px-2 py-0.5 mx-2 text-sm text-red-600 bg-red-100 rounded-full">
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
                    </svg> */}
                  {/* <span>2.5%</span> */}
                  {/* </span> */}
                </div>
              </div>
              <div className="p-5 lg:px-8 ">
                <div className="text-base text-gray-400 ">Rewards Schedule</div>
                <div className="flex      pt-1">
                  <div className="text-2xl font-bold text-gray-900 ">
                    7 days
                  </div>
                </div>
              </div>
              <div className="p-5 lg:px-8 ">
                <div className="text-base text-gray-400 ">
                  Pool Balance (AEGIS)
                </div>
                <div className="flex      pt-1">
                  <div className="text-2xl font-bold text-gray-900 ">
                    {poolBalance || '0'}
                  </div>
                  {/* <span className="flex      px-2 py-0.5 mx-2 text-sm text-green-600 bg-green-100 rounded-full">
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
                    </svg> */}
                  {/* <span>5.2%</span> */}
                  {/* </span> */}
                </div>
              </div>
              <div className="p-5 lg:px-8 ">
                <div className="text-base text-gray-400 ">
                  Pool Balance (ckBTC)
                </div>
                <div className="flex      pt-1">
                  <div className="text-2xl font-bold text-gray-900 ">{'0'}</div>
                  {/* <span className="flex      px-2 py-0.5 mx-2 text-sm text-green-600 bg-green-100 rounded-full">
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
                  {/* </span> */}
                </div>
              </div>
              <div className="p-5 lg:px-8 ">
                <div className="text-base text-gray-400 ">
                  Pool Balance (ckETH)
                </div>
                <div className="flex      pt-1">
                  <div className="text-2xl font-bold text-gray-900 ">{'0'}</div>
                  {/* <span className="flex      px-2 py-0.5 mx-2 text-sm text-green-600 bg-green-100 rounded-full">
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
                  {/* </span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
