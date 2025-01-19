import { Spinners } from '@/components/spinners';
import { useListOptionsOfferList } from '@/lib/hooks/canisters/options/list-options-offers-list';
import { optionsAssets, optionsType } from '@/lib/states/jotai';
import { OptionsAssets, OptionsType } from '@/lib/states/types';
import { CkBtcLogo } from '@/lib/utils/icons/ckbtc';
import { CkEthLogo } from '@/lib/utils/icons/cketh';
import { Box } from '@chakra-ui/react';
import * as Tabs from '@radix-ui/react-tabs';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { LuRefreshCw } from 'react-icons/lu';
import { SiBitcoinsv } from 'react-icons/si';

function ListOptionsContractsNav() {
  const [action, setAction] = useState(false);
  const [optionType, setOptionType] = useAtom(optionsType);
  const [listOfferOptions, isLoadingApi, list] = useListOptionsOfferList();
  const [optionsAsset, setOptionsAssetsNav] = useAtom(optionsAssets);
  const [isLoading, setLoading] = useState<boolean>(false);

  const listOptions = async () => {
    await listOfferOptions({ CALL: null });
    console.log(list);
  };

  useEffect(() => {
    const listOffersOptions = async () => {
      if (list == undefined) {
        await listOfferOptions({ CALL: null });
      } else {
        console.log('List already present');
      }
    };

    listOffersOptions();
  }, [optionsAsset, optionType]);

  const setOptionsAssetsNavHandle = (nav: OptionsAssets) => {
    setOptionsAssetsNav(nav);
    handleOptionsTypeChange();
  };

  const handleOptionsTypeChange = async () => {
    setLoading(true);
    if (optionType == OptionsType.Put) {
      await listOfferOptions({ PUT: null });
    } else {
      await listOfferOptions({ CALL: null });
    }
    setLoading(false);
  };
  const tabItems = [
    {
      icon: <CkBtcLogo className={'w-5 h-5'} />,
      name: 'CKBTC' as OptionsAssets,
    },
    {
      icon: <CkEthLogo className={'w-5 h-5'} />,
      name: 'CKETH' as OptionsAssets,
    },
  ];

  if (isLoadingApi || isLoading) {
    return <Spinners sizes="xl" />;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
      <div className="w-full md:w-1/2">
        <div role="tablist" className="tabs tabs-boxed flex font-serif ">
          <Tabs.Root
            className=" max-w-screen-xl  md:px-0 lg:pt-8 pt-2 "
            defaultValue="Overview"
          >
            <Tabs.List
              className="w-full flex items-center gap-x-3 overflow-x-auto text-sm"
              aria-label="Manage your account"
            >
              {tabItems.map((item, idx) => (
                <Tabs.Trigger
                  key={idx}
                  className="group outline-none py-1.5   border-white text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  value={item.name}
                >
                  <Link
                    href="/options"
                    onClick={() => {
                      setOptionsAssetsNavHandle(item.name);
                    }}
                    className="flex items-center gap-x-2 py-1.5 px-3 rounded-lg duration-150 group-hover:text-indigo-600 group-hover:bg-gray-50 group-active:bg-gray-100 font-medium"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Tabs.Root>
        </div>
        <div role="tablist" className="tabs tabs-boxed flex font-serif pl-4 ">
          <Box
            className={` border-y-2 border-l-2 border-black-color  ${optionType == OptionsType.Call ? `bg-indigo-400 ` : `bg-transparent`}`}
          >
            <Link
              role="tab"
              className={` px-2  tab  `}
              href={''}
              onClick={() => {
                setOptionType(OptionsType.Call);
                handleOptionsTypeChange();
              }}
            >
              Calls
            </Link>
          </Box>
          <Box
            className={`border-y-2 border-r-2 border-black-color  ${optionType == OptionsType.Put ? `bg-indigo-400 ` : `bg-transparent`}`}
          >
            <Link
              role="tab"
              className={` px-2 tab`}
              href={''}
              onClick={() => {
                setOptionType(OptionsType.Put);
                handleOptionsTypeChange();
              }}
            >
              Puts
            </Link>
          </Box>
        </div>
      </div>
      <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
        <div className="flex items-center space-x-3 w-full md:w-auto">
          {!action && (
            <button
              onClick={() => {
                setAction(true);
              }}
              id="actionsDropdownButton"
              data-dropdown-toggle="actionsDropdown"
              className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600  dark:hover:bg-gray-700"
              type="button"
            >
              <svg
                className="-ml-1 mr-1.5 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
              Actions
            </button>
          )}
          {action && (
            <Link
              href="/options/trade?type=issue"
              onClick={() => {
                setLoading(true);
                setAction(false);
              }}
              id="actionsDropdown"
              className=" z-10    rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
            >
              <div className="py-1">
                <a
                  href="#"
                  className="font-serif block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 "
                >
                  Sell Contract
                </a>
              </div>
            </Link>
          )}
          <button
            onClick={() => {
              handleOptionsTypeChange();
            }}
            id="filterDropdownButton"
            data-dropdown-toggle="filterDropdown"
            className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600  dark:hover:bg-gray-700"
            type="button"
          >
            <LuRefreshCw className="h-4 w-4 mr-2 text-gray-400" />
            Refresh
          </button>
          <div
            id="filterDropdown"
            className="z-10 hidden w-48 p-3  rounded-lg shadow dark:bg-gray-700"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ListOptionsContractsNav;
