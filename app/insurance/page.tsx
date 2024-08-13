'use client';
// import { ListActiveBuyContracts } from '@/components/insurance/list/active/list-active-buys';
// import { ListActiveSellContracts } from '@/components/insurance/list/active/list-active-sell';
// import ListTradeHistory from '@/components/insurance/list/closed/list-trade-history';
import { insuranceNav } from '@/lib/states/jotai';
import { MyInsuranceNav } from '@/lib/states/types';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';


const ListActiveBuyContracts = dynamic(() => import('@/components/insurance/list/active/list-active-buys').then((module) => module.ListActiveBuyContracts), { ssr: false });
const ListActiveSellContracts = dynamic(() => import('@/components/insurance/list/active/list-active-sell').then((module) => module.ListActiveSellContracts), { ssr: false });
const ListTradeHistory = dynamic(() => import('@/components/insurance/list/closed/list-trade-history'), { ssr: false });
const ListInsuranceContracts = dynamic(
  () => import('@/components/insurance/list/open/list_constracts'),
  {
    ssr: false,
  }
);
function Insurance() {
  const [getInsuranceNav, setInsuranceNav] = useAtom(insuranceNav);

  if (getInsuranceNav == MyInsuranceNav.Contracts) {
    return (
      <>
        <ListInsuranceContracts />
      </>
    );
  } else if (getInsuranceNav == MyInsuranceNav.Buy) {
    return (
      <>
        <ListActiveBuyContracts />
      </>
    );
  } else if (getInsuranceNav == MyInsuranceNav.Sell) {
    return (
      <>
        <ListActiveSellContracts />
      </>
    );
  } else if (getInsuranceNav == MyInsuranceNav.Closed) {
    return (
      <>
        <ListTradeHistory />
      </>
    );
  } else {
    return (
      <>
        <ListActiveBuyContracts />
      </>
    );
  }
}

export default Insurance;
