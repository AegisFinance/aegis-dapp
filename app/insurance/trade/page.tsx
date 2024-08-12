'use client';

import { useSearchParams } from 'next/navigation';
import { BuyInsuranceContract } from '@/components/insurance/trade/buy/buy';
import IssueInsuranceContract from '@/components/insurance/trade/issue/issue';
import { SellInsuranceContract } from '@/components/insurance/trade/sell/sell';
import { ViewInsuranceContract } from '@/components/insurance/trade/view/view';

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
