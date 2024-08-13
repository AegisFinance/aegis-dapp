'use client';

import dynamic from 'next/dynamic';
const StakeOverview = dynamic(() => import('@/components/stake'), {
  ssr: false,
});
function Stake() {
  return (
    <>
      <StakeOverview />
    </>
  );
}

export default Stake;
