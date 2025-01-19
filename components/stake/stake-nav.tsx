import { stakeNav } from '@/lib/states/jotai';
import type { MyStakeNav } from '@/lib/states/types';
import { Box } from '@chakra-ui/react';
import * as Tabs from '@radix-ui/react-tabs';
import { useAtom } from 'jotai';
import { RiContractLine } from 'react-icons/ri';

export default function StakeNav() {
  const [, setStakeNav] = useAtom(stakeNav);

  const setStakeNavHandle = (nav: MyStakeNav) => {
    setStakeNav(nav);
  };
  const tabItems: any[] = [
    // {
    //   icon: <RiContractLine className="w-5 h-5" />,
    //   name: 'AEGIS' as MyStakeNav,
    // },
    // {
    //   icon: <RiContractLine className="w-5 h-5" />,
    //   name: 'ICP' as MyStakeNav,
    // },
    // {
    //   icon: <RiContractLine className="w-5 h-5" />,
    //   name: 'CKBTC' as MyStakeNav,
    // },
    // {
    //   icon: <RiHistoryLine className="w-5 h-5" />,
    //   name: 'CKETH' as MyStakeNav,
    // },
  ];

  return (
    <>
      <Tabs.Root
        className=" max-w-screen-xl  md:px-4 lg:pt-8 pt-2 "
        defaultValue="Overview"
      >
        <Tabs.List
          className="w-full border-b flex items-center gap-x-3 overflow-x-auto text-sm"
          aria-label="Manage your account"
        >
          {tabItems.map((item, idx) => (
            <Tabs.Trigger
              key={idx}
              className="group outline-none py-1.5 border-b-2   text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
              value={item.name}
            >
              <Box
                // href="/inssurance"
                onClick={() => {
                  setStakeNavHandle(item.name);
                }}
                className="flex items-center gap-x-2 py-1.5 px-3 rounded-lg duration-150 group-hover:text-indigo-600 group-hover:bg-gray-50 group-active:bg-gray-100 font-medium"
              >
                {item.icon}
                {item.name}
              </Box>
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
