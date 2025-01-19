'use client';

import { useSearchParams } from 'next/navigation';

import dynamic from 'next/dynamic';

const BuyOptionsContract = dynamic(
  () =>
    import('@/components/options/trade/buy/buy').then(
      module => module.BuyOptionsContract
    ),
  { ssr: false }
);
const IssueInsuranceContract = dynamic(
  () => import('@/components/options/trade/issue/issue'),
  { ssr: false }
);
const SellInsuranceContract = dynamic(
  () =>
    import('@/components/insurance/trade/sell/sell').then(
      module => module.SellInsuranceContract
    ),
  { ssr: false }
);
const ViewOptionsContract = dynamic(
  () =>
    import('@/components/options/view/view').then(
      module => module.ViewOptionsContract
    ),
  { ssr: false }
);
function TradeInsurance() {
  const searchParams = useSearchParams();

  const type = searchParams.get('type');
  const optionsId = searchParams.get('id');
  return (
    <>
      {type == 'issue' && <IssueInsuranceContract />}
      {type == 'buy' && <BuyOptionsContract optionsId={BigInt(optionsId!)} />}
      {type == 'view' && (
        <ViewOptionsContract optionsId={BigInt(optionsId!)!} />
      )}
    </>
  );
}

export default TradeInsurance;
