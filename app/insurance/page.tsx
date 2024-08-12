'use client';
import { ListActiveBuyContracts } from '@/components/insurance/list/active/list-active-buys';
import { ListActiveSellContracts } from '@/components/insurance/list/active/list-active-sell';
import ListTradeHistory from '@/components/insurance/list/closed/list-trade-history';
import { insuranceNav } from '@/lib/states/jotai';
import { MyInsuranceNav } from '@/lib/states/types';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';

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
