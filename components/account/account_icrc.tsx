import {
  GetIcrcBalance,
  getIcrcBalances,
} from '@/lib/apis/canisters/accounts/get_accounts_balance';
import { e8sToHuman } from '@/lib/apis/utils';
import { getPrincipal } from '@/lib/auth';
import { ProviderAtom } from '@/lib/states/jotai';
import { Button, Table, Thead } from '@chakra-ui/react';
import { Principal } from '@dfinity/principal';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { formatEther } from 'viem';
import { Spinners } from '../spinners';
import { IcpAccountDeposit } from './account_deposit';
import { IcpAccountWithdraw } from './account_withdraw';

type AccountBalances = {
  avatar: string;
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

  const [accountBalances, setAccountBalances] = useState<
    AccountBalances[] | undefined
  >();

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
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            {/* Team members */}
          </h3>
          <p className="text-gray-600 mt-2">
            {/* Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. */}
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <Button
            onClick={handleDPopover}
            className="inline-block px-4 py-2 mr-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Deposit
          </Button>
          {}
          <Button
            onClick={handleWPopover}
            className="inline-block px-4 py-2 mr-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Withdraw
          </Button>
          <Button
            onClick={refreshBalance}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
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
          )}
        </>
      )}
    </div>
  );
}
