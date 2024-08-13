import { insuranceNav } from '@/lib/states/jotai';
import { MyInsuranceNav } from '@/lib/states/types';
import * as Tabs from '@radix-ui/react-tabs';
import { useAtom } from 'jotai';
import React from 'react';
import { RiHistoryLine } from 'react-icons/ri';
import { MdFormatListNumbered } from 'react-icons/md';
import { RiContractLine } from 'react-icons/ri';
import Link from 'next/link';

function InsuranceNav() {
  const [, setInsuranceNav] = useAtom(insuranceNav);

  const setInsuranceNavHandle = (nav: MyInsuranceNav) => {
    setInsuranceNav(nav);
  };
  const tabItems = [
    {
      icon: <MdFormatListNumbered className="w-5 h-5" />,
      name: 'Contracts' as MyInsuranceNav,
    },
    {
      icon: <RiContractLine className="w-5 h-5" />,
      name: 'Buy' as MyInsuranceNav,
    },
    {
      icon: <RiContractLine className="w-5 h-5" />,
      name: 'Sell' as MyInsuranceNav,
    },
    {
      icon: <RiHistoryLine className="w-5 h-5" />,
      name: 'Closed' as MyInsuranceNav,
    },
  ];

  return (
    <>
      <Tabs.Root
        className=" max-w-screen-xl  md:px-4 lg:pt-8 pt-2 "
        defaultValue="Overview"
      >
        <Tabs.List
          className="w-full   flex items-center gap-x-3 overflow-x-auto text-sm"
          aria-label="Manage your account"
        >
          {tabItems.map((item, idx) => (
            <Tabs.Trigger
               key={idx}
              className="group outline-none py-1.5   border-white text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
              value={item.name}
            >
              <Link
                href="/insurance"
                onClick={() => {
                  setInsuranceNavHandle(item.name);
                }}
                className="flex items-center gap-x-2 py-1.5 px-3 rounded-lg duration-150 group-hover:text-indigo-600 group-hover:bg-gray-50 group-active:bg-gray-100 font-medium"
              >
                {item.icon}
                {item.name}
              </Link>
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

export default InsuranceNav;
