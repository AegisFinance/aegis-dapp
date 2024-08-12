import { Principal } from '@dfinity/principal';
import { ASSETS } from '.';

export const AEGIS_LEDGER_PRINCIPAL: Principal = Principal.fromText(
  process.env.NEXT_PUBLIC_AEGIS_LEDGER_ID!
);
// --
export const AEGIS_LEDGER_INDEX_PRINCIPAL: Principal = Principal.fromText(
  process.env.NEXT_PUBLIC_AEGIS_LEDGER_INDEX_ID!
);

//
export const CKSEPOLIA_LEDGER_PRINCIPAL: Principal = Principal.fromText(
  process.env.NEXT_PUBLIC_CKSEPOLIA_ETH_LEDGER_ID!
);
export const CKSEPOLIA_MINTER_PRINCIPAL: Principal = Principal.fromText(
  process.env.NEXT_PUBLIC_CKSEPOPLIA_ETH_MINTER_ID!
);

export const CKETH_LEDGER_PRINCIPAL: Principal = Principal.fromText(
  process.env.NEXT_PUBLIC_CKETH_LEDGER_ID!
);
export const CKETH_MINTER_PRINCIPAL: Principal = Principal.fromText(
  process.env.NEXT_PUBLIC_CKETH_MINTER_ID!
);
//
export const CKTEST_BTC_LEDGER_PRINCIPAL: Principal = Principal.fromText(
  process.env.NEXT_PUBLIC_CKTEST_BTC_LEDGER_ID!
);
export const CKTEST_BTC_MINTER_PRINCIPAL: Principal = Principal.fromText(
  process.env.NEXT_PUBLIC_CKTEST_BTC_MINTER_ID!
);

export const CKBTC_LEDGER_PRINCIPAL: Principal = Principal.fromText(
  process.env.NEXT_PUBLIC_CKBTC_LEDGER_ID!
);
export const CKBTC_MINTER_PRINCIPAL: Principal = Principal.fromText(
  process.env.NEXT_PUBLIC_CKBTC_MINTER_ID!
);
//

export const ICP_LEDGER_PRINCIPAL: Principal = Principal.fromText(
  process.env.NEXT_PUBLIC_ICP_LEDGER_ID!
);

export const ACCOUNTS_PRINCIPAL: Principal = Principal.fromText(
  process.env.NEXT_PUBLIC_ACCOUNTS_CANISTER_ID_LOCAL!
);

export const INSURANCE_PRINCIPAL: Principal = Principal.fromText(
  process.env.NEXT_PUBLIC_INSURANCE_CANISTER_ID!
);

export const MAIN_PRINCIPAL: Principal = Principal.fromText(
  process.env.NEXT_PUBLIC_MAIN_CANISTER_ID!
);

export const CKBTC_KYT_PRINCIPAL = Principal.fromText(
  process.env.NEXT_PUBLIC_CKBTC_KYT_CANISTER_ID!
);
export const CKTEST_BTC_KYT_PRINCIPAL = Principal.fromText(
  process.env.NEXT_PUBLIC_CKTEST_BTC_KYT_CANISTER_ID!
);

type ASSETS_PRINCIPAL_MAP = Map<ASSETS, Principal>;

let asset_principal_map_details = [
  [ASSETS.ICP, ICP_LEDGER_PRINCIPAL],
  [ASSETS.CKBTC, CKBTC_LEDGER_PRINCIPAL],
  [ASSETS.CKETH_SEPOLIA, CKSEPOLIA_LEDGER_PRINCIPAL],
];
export const asset_principal_map: ASSETS_PRINCIPAL_MAP = new Map(
  asset_principal_map_details as Iterable<readonly [ASSETS, Principal]>
);

// list of all canister id to be whitelkist on request connection
export const CANISTER_WHITE_LIST: string[] = [
  ACCOUNTS_PRINCIPAL.toText(),
  MAIN_PRINCIPAL.toText(),
  INSURANCE_PRINCIPAL.toText(),

  AEGIS_LEDGER_INDEX_PRINCIPAL.toText(),
  AEGIS_LEDGER_PRINCIPAL.toText(),

  CKBTC_LEDGER_PRINCIPAL.toText(),
  CKBTC_MINTER_PRINCIPAL.toText(),
  CKTEST_BTC_LEDGER_PRINCIPAL.toText(),
  CKTEST_BTC_MINTER_PRINCIPAL.toText(),

  CKETH_LEDGER_PRINCIPAL.toText(),
  CKETH_MINTER_PRINCIPAL.toText(),
  CKSEPOLIA_LEDGER_PRINCIPAL.toText(),
  CKSEPOLIA_MINTER_PRINCIPAL.toText(),

  ICP_LEDGER_PRINCIPAL.toText(),

  CKTEST_BTC_KYT_PRINCIPAL.toText(),
  CKBTC_KYT_PRINCIPAL.toText(),
];
