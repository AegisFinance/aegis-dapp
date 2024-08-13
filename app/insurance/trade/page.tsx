'use client';

// import { BuyInsuranceContract } from '@/components/insurance/trade/buy/buy';
// import IssueInsuranceContract from '@/components/insurance/trade/issue/issue';
// import { SellInsuranceContract } from '@/components/insurance/trade/sell/sell';
// import { ViewInsuranceContract } from '@/components/insurance/trade/view/view';
import { useSearchParams } from 'next/navigation';

import dynamic from 'next/dynamic';

// const SellInsuranceContract1 = dynamic(() => import('@/components/insurance/trade/sell/sell').then((module) => module.SellInsuranceContract), {
//   ssr: false,
// });

const BuyInsuranceContract = dynamic(
  () =>
    import('@/components/insurance/trade/buy/buy').then(
      module => module.BuyInsuranceContract
    ),
  { ssr: false }
);
const IssueInsuranceContract = dynamic(
  () => import('@/components/insurance/trade/issue/issue'),
  { ssr: false }
);
const SellInsuranceContract = dynamic(
  () =>
    import('@/components/insurance/trade/sell/sell').then(
      module => module.SellInsuranceContract
    ),
  { ssr: false }
);
const ViewInsuranceContract = dynamic(
  () =>
    import('@/components/insurance/trade/view/view').then(
      module => module.ViewInsuranceContract
    ),
  { ssr: false }
);
function TradeInsurance() {
  const searchParams = useSearchParams();

  const type = searchParams.get('type');
  const insuranceId = searchParams.get('id');
  return (
    <>
      {type == 'issue' && <IssueInsuranceContract />}
      {type == 'buy' && (
        <BuyInsuranceContract insuranceId={parseInt(insuranceId!)} />
      )}
      {type == 'sell' && (
        <SellInsuranceContract insuranceId={parseInt(insuranceId!)} />
      )}
      {type == 'view' && (
        <ViewInsuranceContract insuranceId={parseInt(insuranceId!)} />
      )}
    </>
  );
}

export default TradeInsurance;
