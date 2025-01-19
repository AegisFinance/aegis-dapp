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

export enum MyOptionsNav {
  Options = 'Options',
  Activity = 'Activity',
  Buy = 'Buy',
  Sell = 'Sell',
  Closed = 'Closed',
}

export enum OptionsType {
  Put = 'Put',
  Call = 'Call',
}

export enum OptionsAssets {
  CKBTC = 'CKBTC',
  CKETH = 'CKETH',
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
