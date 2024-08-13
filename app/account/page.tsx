'use client';

// import { accountNav } from '@/lib/states/jotai';
import { AbsoluteCenter } from '@chakra-ui/react';
// import { useAtom } from 'jotai';

// const AccountEth = dynamic(() => import('@/components/account/account_eth'), {
//   // Do not import in server side
//   ssr: false,
// });
// const ICRCs = dynamic(() => import('@/components/account/account_icrc'), {
//   // Do not import in server side
//   ssr: false,
// });
// const Overview = dynamic(
//   () => import('@/components/account/account_overview'),
//   {
//     // Do not import in server side
//     ssr: false,
//   }
// );
// const AccountBtc = dynamic(() => import('@/components/account/account_btc'), {
//   // Do not import in server side
//   ssr: false,
// });

// const AccountTransactions = dynamic(
//   () => import('@/components/account/account_transactions'),
//   {
//     // Do not import in server side
//     ssr: false,
//   }
// );

function Account() {
  // const [getAccountNav, setAccountNav] = useAtom(accountNav);

  // if (getAccountNav == MyAccountNav.Overview) {
  //   return (
  //     <>
  //       <Overview />
  //     </>
  //   );
  // } else if (getAccountNav == MyAccountNav.ICRC) {
  //   return (
  //     <>
  //       <ICRCs />
  //     </>
  //   );
  // } else if (getAccountNav == MyAccountNav.Bitcoin) {
  //   return (
  //     <>
  //       <AccountBtc />
  //     </>
  //   );
  // } else if (getAccountNav == MyAccountNav.Ethereum) {
  //   return (
  //     <>
  //       <AccountEth />
  //     </>
  //   );
  // } else if (getAccountNav == MyAccountNav.Transactions) {
  //   return (
  //     <>
  //       <AccountTransactions />
  //     </>
  //   );
  // } else {
  //   return <>{<ICRCs />}</>;
  // }

  return <>
  
<AbsoluteCenter> Account Canister is under Maintainence</AbsoluteCenter>
  </>
}

export default Account;
