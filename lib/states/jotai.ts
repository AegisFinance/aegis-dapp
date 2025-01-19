import {
  InsuranceActiveListKey,
  InsuranceBuyersKey,
  UserInsuranceListHistoryKey,
} from '@/declarations/insurance/insurance.did';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Provider } from '../auth/interface';
import {
  ListAtomInterface,
  MyAccountNav,
  MyInsuranceNav,
  MyOptionsNav,
  MyStakeNav,
  OptionsAssets,
  OptionsType,
} from './types';
import {
  OptionsActiveListKey,
  OptionsContractState,
  TradedOptionsContractsKey,
  TradedOptionsContractsValue,
} from '@/declarations/options/options.did';

// storage
export const sessionTimeoutAtom = atomWithStorage<number>('sessionTimeout', 0);

export const ProviderAtom = atomWithStorage<Provider | undefined>(
  'provider',
  undefined
);

export const isAuthenticatedAtom = atomWithStorage<boolean>(
  'isAuthenticatedAtom',
  false
);

// states
export const accountNav = atom<MyAccountNav>(MyAccountNav.ICRC);
export const insuranceNav = atom<MyInsuranceNav>(MyInsuranceNav.Buy);
export const optionsNav = atom<MyOptionsNav>(MyOptionsNav.Options);

export const insuranceListAtom = atom<ListAtomInterface | undefined>(undefined);

export const insuranceKeyListAtom = atom<
  [InsuranceActiveListKey, null][] | undefined
>(undefined);

export const insuranceActiveBuyListKeyAtom = atom<
  InsuranceBuyersKey[] | undefined
>(undefined);

export const insuranceActiveSellListKeyAtom = atom<
  InsuranceBuyersKey[] | undefined
>(undefined);

export const insuranceTradeHistoryListAtom = atom<
  [UserInsuranceListHistoryKey, bigint][] | undefined
>(undefined);

export const stakeNav = atom<MyStakeNav>(MyStakeNav.AEGIS);

export const optionsType = atom<OptionsType>(OptionsType.Call);
export const optionsAssets = atom<OptionsAssets>(OptionsAssets.CKBTC);
export const optionHistoryStateAtom = atom<OptionsContractState>({ OPEN: null });

export const optionsOfferListAtom = atom<[OptionsActiveListKey, null][]>([]);
export const optionsActivityListAtom = atom<
  [TradedOptionsContractsKey, TradedOptionsContractsValue][]
>([]);
