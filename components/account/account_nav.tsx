import { accountNav } from '@/lib/states/jotai';
import { MyAccountNav } from '@/lib/states/types';
import * as Tabs from '@radix-ui/react-tabs';
import { useAtom } from 'jotai';
import React from 'react';
import { FaEthereum } from 'react-icons/fa';
import { LuListFilter } from 'react-icons/lu';
import { SiBitcoinsv } from 'react-icons/si';

export default function AccountNav() {
  const [getAccountNav, setAccountNav] = useAtom(accountNav);

  const setAccountNavHandle = (nav: MyAccountNav) => {
    console.log('🚀 ~ setAccountNavHandle ~ nav:', nav);

    setAccountNav(nav);
  };
  const tabItems = [
    {
      icon: <LuListFilter className="w-5 h-5" />,
      name: 'Overview' as MyAccountNav,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
          />
        </svg>
      ),
      name: 'ICRC' as MyAccountNav,
    },
    {
      icon: <SiBitcoinsv className="w-5 h-5" />,
      name: 'Bitcoin' as MyAccountNav,
    },

    {
      icon: <FaEthereum className="w-5 h-5" />,
      name: 'Ethereum' as MyAccountNav,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>
      ),
      name: 'Transactions' as MyAccountNav,
    },
  ];

  return (
    <>
      <Tabs.Root
        className=" max-w-screen-xl lg:mx-auto md:px-4 lg:pt-8 pt-2 "
        defaultValue="Overview"
      >
        <Tabs.List
          className="w-full border-b flex items-center gap-x-3 overflow-x-auto text-sm"
          aria-label="Manage your account"
        >
          {tabItems.map((item, idx) => (
            <Tabs.Trigger
              key={idx}
              className="group outline-none py-1.5 border-b-2 border-white text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
              value={item.name}
            >
              <div
                onClick={() => {
                  setAccountNavHandle(item.name);
                }}
                className="flex items-center gap-x-2 py-1.5 px-3 rounded-lg duration-150 group-hover:text-indigo-600 group-hover:bg-gray-50 group-active:bg-gray-100 font-medium"
              >
                {item.icon}
                {item.name}
              </div>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {tabItems.map((item, idx) => (
          <Tabs.Content
            key={idx}
            className="py-6"
            value={item.name}
          ></Tabs.Content>
        ))}
      </Tabs.Root>
    </>
  );
}

export function AccountRoot({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full flex flex-col min-h-screen ">
      <AccountNav />
      <div className=" flex-1 overflow-y-auto border-2 border-blue-700 ">
        {children}
      </div>
    </main>
  );
}
