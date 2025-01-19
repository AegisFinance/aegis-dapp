import {
  GetIcrcBalance,
  getIcrcBalances,
} from '@/lib/apis/canisters/accounts/get_accounts_balance';
import { e8sToHuman } from '@/lib/apis/utils';
import { getPrincipal } from '@/lib/auth';
import { ProviderAtom } from '@/lib/states/jotai';
import { e18sToHuman } from '@/lib/utils/convert-inputs';
import { CkBtcLogo } from '@/lib/utils/icons/ckbtc';
import { CkEthLogo } from '@/lib/utils/icons/cketh';
import { CkUsdtLogo } from '@/lib/utils/icons/ckusdt';
import { ICLogo } from '@/lib/utils/icons/ic';
import { Button, Table, Thead } from '@chakra-ui/react';
import { Principal } from '@dfinity/principal';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { formatEther } from 'viem';
import { Spinners } from '../spinners';
import { IcpAccountDeposit } from './account_deposit';
import { IcpAccountWithdraw } from './account_withdraw';
// import ICP from '/ICP Token/02 svg/01 ICP Token HEX white.svg';

type AccountBalances = {
  avatar: JSX.Element;
  tokenName: string;
  ticker: string;
  inAccount: number;
  inWallet: number;

  // value: string;
  // price: string();
};

export default function ICRCs() {
  const [provider] = useAtom(ProviderAtom);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [wPopover, setWPopover] = useState<boolean>(false);
  const [dPopover, setDPopover] = useState<boolean>(false);
  const [principal, setPrincipal] = useState<Principal | undefined>(undefined);

  const [accountBalances, setAccountBalances] = useState<
    AccountBalances[] | undefined
  >();

  // const IcpLogo = <ICLogo />;

  const handleDPopover = () => {
    setDPopover(true);
    setWPopover(false);
  };
  const handleWPopover = () => {
    setWPopover(true);
    setDPopover(false);
  };
  const refreshBalance = async () => {
    setDPopover(false);
    setWPopover(false);

    await getBalances();
  };

  const getBalances = async () => {
    try {
      setLoading(true);
      let balances: AccountBalances[] = [];
      const principal: Principal = (await getPrincipal(provider!))!;
      setPrincipal(principal);

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
        avatar: <ICLogo className="w-10 h-10  " />,
        tokenName: 'Internet Computer',
        ticker: 'ICP',
        inAccount: e8sToHuman(icrcAccBalances.ICP)! || 0,
        inWallet: e8sToHuman(icrcWalletBalances.ICP)! || 0,
      };
      balances.push(icpBalance);
      let ckBTCBalances: AccountBalances = {
        avatar: <CkBtcLogo className="w-10 h-10" />,
        tokenName: 'Chain-Key Bitcoin ',
        ticker: 'ckBTC',
        inAccount: e8sToHuman(icrcAccBalances.ckBTC)! || 0,
        inWallet: e8sToHuman(icrcWalletBalances.ckBTC)! || 0,
      };
      balances.push(ckBTCBalances);

      let ckEthBalances: AccountBalances = {
        avatar: <CkEthLogo className="w-10 h-10 " />,
        tokenName: 'Chain-Key Ethereum ',
        ticker: 'ckETH',
        inAccount: parseFloat(formatEther(icrcAccBalances.ckETH)) || 0,
        inWallet: parseFloat(formatEther(icrcWalletBalances.ckETH)) || 0,
      };
      balances.push(ckEthBalances);

      let ckusdtBalance: AccountBalances = {
        avatar: <CkUsdtLogo className="w-10 h-10  " />,
        tokenName: 'Chain Key USDT',
        ticker: 'ckUSDT',
        inAccount: Number(e18sToHuman(icrcAccBalances.ckUSDT)!) || 0,
        inWallet: Number(e18sToHuman(icrcWalletBalances.ckUSDT)!) || 0,
      };
      balances.push(ckusdtBalance);

      setAccountBalances(balances);
      setLoading(false);
      setRefresh(false);
    } catch (error) {
      console.log(': -----------------------------');
      console.log(': getBalances -> error', error);
      console.log(': -----------------------------');
    }
  };

  useEffect(() => {
    try {
      getBalances();
    } catch (error) {
      console.log(': -----------------------');
      console.log(': ICRCs -> error', error);
      console.log(': -----------------------');
    }
  }, []);

  // if (isLoading) {
  //   return <Spinners sizes={"xl"} />;
  // }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-end justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-sm font-bold sm:text-2xl">
            {/* Team members */}
            Principal: {principal?.toText()}
            {/* {} */}
          </h3>
          <p className="text-gray-600 mt-2">
            {/* Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. */}
          </p>
        </div>
        <div className="flex gap-2 mt-3 md:mt-0">
          <Button
            onClick={handleDPopover}
            className=" font-serif border-black dark:border-lavender-blue-400 border-[3px] 
            transition-all rounded-sm py-1 px-4 my-2 font-semibold text-black bg-lavender-blue-400 
              shadow-[5px_5px_0px_rgba(0,0,0,1)]   ${
               dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 
               active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"
          >
            Deposit
          </Button>
          {}
          <Button
            onClick={handleWPopover}
            className=" font-serif border-black dark:border-lavender-blue-400 border-[3px] 
            transition-all rounded-sm py-1 px-4 my-2 font-semibold text-black bg-lavender-blue-400 
              shadow-[5px_5px_0px_rgba(0,0,0,1)]   ${
               dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 
               active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"
          >
            Withdraw
          </Button>
          <Button
            onClick={refreshBalance}
            className=" font-serif border-black dark:border-lavender-blue-400 border-[3px] 
            transition-all rounded-sm py-1 px-4 my-2 font-semibold text-black bg-lavender-blue-400 
              shadow-[5px_5px_0px_rgba(0,0,0,1)]   ${
               dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 
               active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"
          >
            Refresh
          </Button>
        </div>
      </div>
      {dPopover ? (
        <>
          <IcpAccountDeposit />
        </>
      ) : (
        <>
          {wPopover ? (
            <>
              <IcpAccountWithdraw />
            </>
          ) : (
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto text-center items-center">
              <Table className="w-full table-auto text-sm  ">
                <Thead className="bg-gray-50 text-gray-600 font-medium border-b">
                  <tr>
                    {/* <th className="py-3 px-6"></th> */}
                    <th className="py-3 px-6"></th>
                    <th className="py-3 px-6"> Account Balance</th>
                    <th className="py-3 px-6"> Wallet Balance</th>
                  </tr>
                </Thead>
                <tbody className="text-gray-600 divide-y">
                  {isLoading ? (
                    <Spinners sizes={'xl'} />
                  ) : (
                    <>
                      {accountBalances?.map((item, idx) => (
                        <tr key={idx}>
                          <td className="flex items-center gap-x-3 py-6 px-6 whitespace-nowrap">
                            {item.avatar}
                            {/* </td> */}
                            {/* <td className="px-6 py-4 whitespace-nowrap"> */}
                            <span className="block text-gray-700 text-xs">
                              {item.ticker}
                            </span>{' '}
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
          )}
        </>
      )}
    </div>
  );
}
