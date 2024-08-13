'use client';

import dynamic from 'next/dynamic';

const AccountOverviewHome = dynamic(
  () =>
    import('@/components/layout/home/home-body').then(
      module => module.AccountOverviewHome
    ),
  { ssr: false }
);
const ICRCs = dynamic(
  () =>
    import('@/components/account/account_icrc').then(module => module.default),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <div className="  max-w-screen-xl mx-auto px-4 md:px-8">
        <AccountOverviewHome />
        <br/>
        <ICRCs />
      </div>{' '}
    </>
  );
}
