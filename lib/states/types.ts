import { Insurance } from '@/declarations/insurance/insurance.did';

export enum MyAccountNav {
  Overview = 'Overview',
  Bitcoin = 'Bitcoin',
  Ethereum = 'Ethereum',
  ICRC = 'ICRC',
  Transactions = 'Transactions',
}

export enum MyInsuranceNav {
  Contracts = 'Contracts',
  Buy = 'Buy',
  Sell = 'Sell',
  Closed = 'Closed',
}

export interface ListAtomInterface {
  [id: number]: Insurance | string;
}

export enum MyStakeNav {
  AEGIS = 'AEGIS',
  ICP = 'ICP',
  CKBTC = 'CKBTC',
  CKETH = 'CKETH',
}
