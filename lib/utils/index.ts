import { Principal } from '@dfinity/principal';
import {
  ACCOUNTS_PRINCIPAL,
  AEGIS_LEDGER_PRINCIPAL,
  CKBTC_KYT_PRINCIPAL,
  CKBTC_LEDGER_PRINCIPAL,
  CKBTC_MINTER_PRINCIPAL,
  CKETH_LEDGER_PRINCIPAL,
  CKETH_MINTER_PRINCIPAL,
  CKSEPOLIA_LEDGER_PRINCIPAL,
  CKSEPOLIA_MINTER_PRINCIPAL,
  CKTEST_BTC_KYT_PRINCIPAL,
  CKTEST_BTC_LEDGER_PRINCIPAL,
  CKTEST_BTC_MINTER_PRINCIPAL,
  ICP_LEDGER_PRINCIPAL,
  INSURANCE_PRINCIPAL,
  MAIN_PRINCIPAL,
} from '../constants/canisters';
import { InsuranceAssets } from '@/declarations/insurance/insurance.did';

export function checkTimeOutExpiry(time: number): boolean {
  if (time == 0) {
    return false;
  }

  const oneMinuteInMilliseconds = 60 * 1000; // 60 seconds * 1000 milliseconds/second

  const currentTimestamp = Date.now();

  // Calculate the difference in milliseconds
  const timeDifference = currentTimestamp - time;

  // Check if the difference is less than 30 minutes (1800 seconds)
  return timeDifference < oneMinuteInMilliseconds * 60;
}

export enum CANISTERS_NAME {
  ACCOUNTS,
  MAIN,
  INSURANCE,

  AEGIS_LEDGER_INDEX,
  AEGIS_LEDGER,

  CKBTC_LEDGER,
  CKBTC_MINTER,
  CKTEST_BTC_LEDGER,
  CKTEST_BTC_MINTER,

  CKBTC_KYT,
  CKTEST_BTC_KYT,

  CKETH_LEDGER,
  CKETH_MINTER,
  CKSEPOLIA_LEDGER,
  CKSEPOLIA_MINTER,

  ICP_LEDGER,
}

export let CANISTER_IDS: (CANISTERS_NAME | Principal)[][] = [
  [CANISTERS_NAME.ICP_LEDGER, ICP_LEDGER_PRINCIPAL],
  [CANISTERS_NAME.CKBTC_LEDGER, CKBTC_LEDGER_PRINCIPAL],
  [CANISTERS_NAME.CKETH_LEDGER, CKETH_LEDGER_PRINCIPAL],
  [CANISTERS_NAME.AEGIS_LEDGER, AEGIS_LEDGER_PRINCIPAL],
  [CANISTERS_NAME.CKTEST_BTC_LEDGER, CKTEST_BTC_LEDGER_PRINCIPAL],
  [CANISTERS_NAME.CKSEPOLIA_LEDGER, CKSEPOLIA_LEDGER_PRINCIPAL],

  [CANISTERS_NAME.CKBTC_MINTER, CKBTC_MINTER_PRINCIPAL],
  [CANISTERS_NAME.CKETH_MINTER, CKETH_MINTER_PRINCIPAL],
  [CANISTERS_NAME.CKTEST_BTC_MINTER, CKTEST_BTC_MINTER_PRINCIPAL],
  [CANISTERS_NAME.CKSEPOLIA_MINTER, CKSEPOLIA_MINTER_PRINCIPAL],

  [CANISTERS_NAME.ACCOUNTS, ACCOUNTS_PRINCIPAL],
  [CANISTERS_NAME.INSURANCE, INSURANCE_PRINCIPAL],
  [CANISTERS_NAME.MAIN, MAIN_PRINCIPAL],

  [CANISTERS_NAME.CKBTC_KYT, CKBTC_KYT_PRINCIPAL],

  [CANISTERS_NAME.CKTEST_BTC_KYT, CKTEST_BTC_KYT_PRINCIPAL],
];

export enum LEDGER_NAME {
  AEGIS_LEDGER,
  CKBTC_LEDGER,
  CKBTC_MINTER,
  CKTEST_BTC_LEDGER,
  CKETH_LEDGER,
  CKSEPOLIA_LEDGER,
  ICP_LEDGER,
}
export let LEDGER_IDS: (LEDGER_NAME | Principal)[][] = [
  [LEDGER_NAME.ICP_LEDGER, ICP_LEDGER_PRINCIPAL],
  [LEDGER_NAME.CKBTC_LEDGER, CKBTC_LEDGER_PRINCIPAL],
  [LEDGER_NAME.CKETH_LEDGER, CKETH_LEDGER_PRINCIPAL],
  [LEDGER_NAME.AEGIS_LEDGER, AEGIS_LEDGER_PRINCIPAL],
  [LEDGER_NAME.CKTEST_BTC_LEDGER, CKTEST_BTC_LEDGER_PRINCIPAL],
  [LEDGER_NAME.CKSEPOLIA_LEDGER, CKSEPOLIA_LEDGER_PRINCIPAL],
];

export let CANISTER_IDS_MAP = new Map(
  CANISTER_IDS.map(([key, value]) => [key, value as Principal])
);

export let LEDGER_IDS_MAP = new Map(
  LEDGER_IDS.map(([key, value]) => [key, value as Principal])
);

export type Result<T, U> = { Ok: T } | { Err: U };

export function convertToLedgerName(
  canisterName: CANISTERS_NAME
): LEDGER_NAME | undefined {
  switch (canisterName) {
    case CANISTERS_NAME.AEGIS_LEDGER:
      return LEDGER_NAME.AEGIS_LEDGER;
    case CANISTERS_NAME.CKBTC_LEDGER:
      return LEDGER_NAME.CKBTC_LEDGER;
    case CANISTERS_NAME.CKBTC_MINTER:
      return LEDGER_NAME.CKBTC_MINTER;
    case CANISTERS_NAME.CKTEST_BTC_LEDGER:
      return LEDGER_NAME.CKTEST_BTC_LEDGER;
    case CANISTERS_NAME.CKETH_LEDGER:
      return LEDGER_NAME.CKETH_LEDGER;
    case CANISTERS_NAME.CKSEPOLIA_LEDGER:
      return LEDGER_NAME.CKSEPOLIA_LEDGER;
    case CANISTERS_NAME.ICP_LEDGER:
      return LEDGER_NAME.ICP_LEDGER;
    default:
      return undefined; // Handle cases where there's no corresponding LEDGER_NAME
  }
}

export function convertInsuranceAssetToCanisterName(
  insuranceAsset: InsuranceAssets
): CANISTERS_NAME | undefined {
  if ('ICP' in insuranceAsset) {
    return CANISTERS_NAME.ICP_LEDGER;
  } else if ('CKBTC' in insuranceAsset) {
    return CANISTERS_NAME.CKBTC_LEDGER;
  } else if ('CKETH' in insuranceAsset) {
    return CANISTERS_NAME.CKETH_LEDGER;
  } else {
    return undefined; // Handle cases where there's no corresponding CANISTERS_NAME
  }
}
