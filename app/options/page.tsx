'use client';

import OptionsActivity from '@/components/options/list/activity';
import ListOptionsContracts from '@/components/options/list/open/list-contracts';
import { optionsNav } from '@/lib/states/jotai';
import { MyOptionsNav } from '@/lib/states/types';
import { Box } from '@chakra-ui/react';
import { useAtom } from 'jotai';

// import { ListActiveBuyContracts } from '@/components/Options/list/active/list-active-buys';
// import { ListActiveSellContracts } from '@/components/Options/list/active/list-active-sell';
// import ListTradeHistory from '@/components/Options/list/closed/list-trade-history';
// import { OptionsNav } from '@/lib/states/jotai';
// import { MyOptionsNav } from '@/lib/states/types';
// import { useAtom } from 'jotai';
// import dynamic from 'next/dynamic';

// const ListActiveBuyContracts = dynamic(() => import('@/components/Options/list/active/list-active-buys').then((module) => module.ListActiveBuyContracts), { ssr: false });
// const ListActiveSellContracts = dynamic(() => import('@/components/Options/list/active/list-active-sell').then((module) => module.ListActiveSellContracts), { ssr: false });
// const ListTradeHistory = dynamic(() => import('@/components/Options/list/closed/list-trade-history'), { ssr: false });
// const ListOptionsContracts = dynamic(
//   () => import('@/components/Options/list/open/list_constracts'),
//   {
//     ssr: false,
//   }
// );
function Options() {
  const [getOptionsNav, setOptionsNav] = useAtom(optionsNav);

  if (getOptionsNav == MyOptionsNav.Options) {
    return (
      <>
        {/* <ListInsuranceContracts /> */}
        <ListOptionsContracts />
      </>
    );
  } else if (getOptionsNav == MyOptionsNav.Activity) {
    return <>{<OptionsActivity />}</>;
  } else if (getOptionsNav == MyOptionsNav.Sell) {
    return <>{/* <ListActiveSellContracts /> */}Sell</>;
  } else if (getOptionsNav == MyOptionsNav.Closed) {
    return <>{/* <ListTradeHistory /> */}Closed</>;
  } else {
    return (
      <>
        {
          <>
            <ListOptionsContracts />
          </>
        }
      </>
    );
  }
}
export default Options;
