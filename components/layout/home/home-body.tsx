import { Spinners } from '@/components/spinners';
import { Account } from '@/declarations/cketh_ledger/cketh_ledger.did';
import {
  GetIcrcBalance,
  getIcrcBalances,
} from '@/lib/apis/canisters/accounts/get_accounts_balance';
import { e8sToHuman } from '@/lib/apis/utils';
import { getPrincipal } from '@/lib/auth';
import { MAIN_PRINCIPAL } from '@/lib/constants/canisters';
import { usePrincipal } from '@/lib/hooks/auth/principal';
import { useIcrcBalance } from '@/lib/hooks/ledgers/icrc/balance';
import { ProviderAtom } from '@/lib/states/jotai';
import { CANISTERS_NAME } from '@/lib/utils';
import { Table, Thead } from '@chakra-ui/react';
import { Principal } from '@dfinity/principal';
import { principalToSubAccount } from '@dfinity/utils';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { formatEther } from 'viem';

const metricsData = [
  {
    title: 'Total AEGIS Balance',
    value: 0,
    nt: '1.8%',

    icon_style: 'bg-fuchsia-50 text-fuchsia-400',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.3333 9.33334H28M28 9.33334V20M28 9.33334L17.3333 20L12 14.6667L4 22.6667"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    ),
  },
  {
    title: 'Total Staked Amount',
    value: 0,
    upward: false,
    icon_style: 'bg-cyan-50 text-cyan-400',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.52325 6.61231C10.2911 5.20443 12.4206 4.32434 14.6667 4.07333V17.3333H27.9267C27.6757 19.5794 26.7956 21.7089 25.3877 23.4767C23.9798 25.2446 22.1013 26.5791 19.9685 27.3265C17.8357 28.0739 15.5351 28.2039 13.3317 27.7015C11.1282 27.1991 9.11142 26.0847 7.51336 24.4866C5.91529 22.8886 4.80094 20.8718 4.29854 18.6683C3.79614 16.4649 3.92612 14.1643 4.67352 12.0315C5.42092 9.89866 6.75535 8.0202 8.52325 6.61231Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M20 12H27.3173C26.7188 10.3128 25.7513 8.78047 24.4854 7.5146C23.2195 6.24873 21.6872 5.28125 20 4.68268V12Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    ),
  },
  {
    title: 'Traded Amount',
    value: 0,
    icon_style: 'bg-amber-50 text-amber-400',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.3333 9.33334H28M28 9.33334V20M28 9.33334L17.3333 20L12 14.6667L4 22.6667"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    ),
  },
  {
    title: 'Rewards',
    value: 0.0,
    icon_style: 'bg-emerald-50 text-emerald-400',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 25.3333V17.3333C12 16.6261 11.719 15.9478 11.219 15.4477C10.7189 14.9476 10.0406 14.6667 9.33333 14.6667H6.66667C5.95942 14.6667 5.28115 14.9476 4.78105 15.4477C4.28095 15.9478 4 16.6261 4 17.3333V25.3333C4 26.0406 4.28095 26.7189 4.78105 27.219C5.28115 27.719 5.95942 28 6.66667 28H9.33333C10.0406 28 10.7189 27.719 11.219 27.219C11.719 26.7189 12 26.0406 12 25.3333ZM12 25.3333V12C12 11.2928 12.281 10.6145 12.781 10.1144C13.2811 9.61428 13.9594 9.33333 14.6667 9.33333H17.3333C18.0406 9.33333 18.7189 9.61428 19.219 10.1144C19.719 10.6145 20 11.2928 20 12V25.3333M12 25.3333C12 26.0406 12.281 26.7189 12.781 27.219C13.2811 27.719 13.9594 28 14.6667 28H17.3333C18.0406 28 18.7189 27.719 19.219 27.219C19.719 26.7189 20 26.0406 20 25.3333M20 25.3333V6.66667C20 5.95942 20.281 5.28115 20.781 4.78105C21.2811 4.28095 21.9594 4 22.6667 4H25.3333C26.0406 4 26.7189 4.28095 27.219 4.78105C27.719 5.28115 28 5.95942 28 6.66667V25.3333C28 26.0406 27.719 26.7189 27.219 27.219C26.7189 27.719 26.0406 28 25.3333 28H22.6667C21.9594 28 21.2811 27.719 20.781 27.219C20.281 26.7189 20 26.0406 20 25.3333Z"
          stroke="currentColor "
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    ),
  },
];

export function AccountOverviewHome() {
  const [totalUserStakedAmount, setTotalUserStakedAmount] = useState<number>(0);
  const [userBalance, setUserBalance] = useState<number>(0);

  const [getIcrcBalance, loadingGetIcrcBalance] = useIcrcBalance();
  const [provider] = useAtom(ProviderAtom);

  useEffect(() => {
    const refreshBalances = async () => {
      try {
        const principal: Principal = (await getPrincipal(provider!))!;

        let userStakedBalanceArgs: Account = {
          owner: MAIN_PRINCIPAL,
          subaccount: [principalToSubAccount(principal)],
        };

        let userBalanceArgs: Account = {
          owner: principal,
          subaccount: [],
        };

        let amount1 =
          e8sToHuman(
            await getIcrcBalance(
              CANISTERS_NAME.AEGIS_LEDGER,
              userStakedBalanceArgs
            )
          ) ?? 0;
        console.log(': -------------------------------------');
        console.log(': refreshBalances -> amount1', amount1);
        console.log(': -------------------------------------');
        setTotalUserStakedAmount(amount1!);

        let amount2 =
          e8sToHuman(
            await getIcrcBalance(CANISTERS_NAME.AEGIS_LEDGER, userBalanceArgs)
          ) ?? 0;
        console.log(': -------------------------------------');
        console.log(': refreshBalances -> amount2', amount2);
        console.log(': -------------------------------------');

        setUserBalance(amount2!);

        metricsData[0].value = amount2;
        metricsData[1].value = amount1;

        console.log(
          ': -----------------------------------------------------------------'
        );
        console.log(
          ': AccountOverview -> totalUserStakedAmount',
          totalUserStakedAmount
        );
        console.log(
          ': -----------------------------------------------------------------'
        );
        console.log(': ---------------------------------------------');
        console.log(': AccountOverview -> userBalance', userBalance);
        console.log(': ---------------------------------------------');
      } catch (error) {
        console.log(': ---------------------------------');
        console.log(': refreshBalances -> error', error);
        console.log(': ---------------------------------');
      }
    };
    refreshBalances();
  }, []);

  if (loadingGetIcrcBalance) {
    return (
      <>
        <Spinners sizes="xl" />
      </>
    );
  }
  return (
    <>
      <div className="flex flex-col gap-10 lg:gap:15    bg-gray-100 dark:bg-gray-900 items-center">
        <div className="container max-w-6xl px-5 mx-auto mt-10">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {metricsData.map((metrics, index) => (
              <>
                <div className="flex items-center space-x-4 shadow-md shadow-slate-600 p-5 rounded ">
                  <div>
                    <div
                      className={`${metrics.icon_style} flex items-center justify-center w-12 h-12 rounded-full `}
                    >
                      {metrics.icon}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <div className="text-gray-400">{metrics.title}</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {metrics.value}
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        {/* <AccountOverviewChart /> */}
      </div>
    </>
  );
}

type AccountBalances = {
  avatar: string;
  tokenName: string;
  ticker: string;
  inAccount: number;
  inWallet: number;
};

export function ICRCsHome() {
  const [provider] = useAtom(ProviderAtom);

  const [getAuthPrincipal, authPrincipal] = usePrincipal();
  const [isLoading, setLoading] = useState<boolean>(false);

  const [accountBalances, setAccountBalances] = useState<
    AccountBalances[] | undefined
  >();

  const getBalances = async () => {
    try {
      setLoading(true);
      let balances: AccountBalances[] = [];
      const principal: Principal = authPrincipal!;
      console.log(': -------------------------------------');
      console.log(': getBalances -> principal', principal);
      console.log(': -------------------------------------');

      const icrcAccBalances: GetIcrcBalance = (await getIcrcBalances(
        true,
        principal,
        provider!
      )) as GetIcrcBalance;
      console.log(': -------------------------------------------------');
      console.log(': getBalances -> icrcAccBalances', icrcAccBalances);
      console.log(': -------------------------------------------------');

      const icrcWalletBalances: GetIcrcBalance = (await getIcrcBalances(
        false,
        principal,
        provider!
      )) as GetIcrcBalance;
      console.log(': -------------------------------------------------------');
      console.log(': getBalances -> icrcWalletBalances', icrcWalletBalances);
      console.log(': -------------------------------------------------------');

      let icpBalance: AccountBalances = {
        avatar:
          'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
        tokenName: 'Internet Computer',
        ticker: 'ICP',
        inAccount: e8sToHuman(icrcAccBalances.ICP)! || 0,
        inWallet: e8sToHuman(icrcWalletBalances.ICP)! || 0,
      };
      balances.push(icpBalance);
      let ckBTCBalances: AccountBalances = {
        avatar:
          'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
        tokenName: 'Chain-Key Bitcoin ',
        ticker: 'ckBTC',
        inAccount: e8sToHuman(icrcAccBalances.ckBTC)! || 0,
        inWallet: e8sToHuman(icrcWalletBalances.ckBTC)! || 0,
      };
      balances.push(ckBTCBalances);

      let ckEthBalances: AccountBalances = {
        avatar:
          'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
        tokenName: 'Chain-Key Ethereum ',
        ticker: 'ckETH',
        inAccount: parseFloat(formatEther(icrcAccBalances.ckETH)) || 0,
        inWallet: parseFloat(formatEther(icrcWalletBalances.ckETH)) || 0,
      };
      balances.push(ckEthBalances);

      setAccountBalances(balances);
      setLoading(false);
    } catch (err) {
      console.log(': -------------------------');
      console.log(': getBalances -> err', err);
      console.log(': -------------------------');
    }
  };

  useEffect(() => {
    !authPrincipal &&
      getAuthPrincipal().then(async res => {
        await getBalances();
      });
  });

  if (isLoading) {
    return <Spinners sizes={'xl'} />;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <Table className="w-full table-auto text-sm text-left">
          <Thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Token(s)</th>
              <th className="py-3 px-6"> Account Balance</th>
              <th className="py-3 px-6"> Wallet Balance</th>
              {/* <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Deposit</th> */}
            </tr>
          </Thead>
          <tbody className="text-gray-600 divide-y">
            {isLoading ? (
              <Spinners sizes={'xl'} />
            ) : (
              <>
                {accountBalances?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                      <Image
                        src={item.avatar}
                        className="rounded-full"
                        alt={''}
                        width={10}
                        height={10}
                      />
                      <div>
                        <span className="block text-gray-700 text-sm font-medium">
                          {item.tokenName}
                        </span>
                        <span className="block text-gray-700 text-xs">
                          {item.ticker}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.inAccount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.inWallet}
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">{item.price}</td> */}
                    {/* <td className="px-6 py-4 whitespace-nowrap ">
                  <BsArrowDownCircle />
                </td> */}

                    {/* <td className="text-right px-6 whitespace-nowrap">
                  <a
                    href="javascript:void()"
                    className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    Edit
                  </a>
                  <button className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                    Delete
                  </button>
                </td> */}
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
