import { Principal } from "@dfinity/principal";
import { ASSETS } from ".";

export const CKSEPOLIA_LEDGER_PRINCIPAL: Principal = Principal.fromText(
  "apia6-jaaaa-aaaar-qabma-cai"
);

export const CKSEPOLIA_MINTER_PRINCIPAL: Principal = Principal.fromText(
  "jzenf-aiaaa-aaaar-qaa7q-cai"
);

export const CKBTC_LEDGER_PRINCIPAL: Principal = Principal.fromText(
  "mxzaz-hqaaa-aaaar-qaada-cai"
);

export const ICP_LEDGER_PRINCIPAL: Principal = Principal.fromText(
  "ryjl3-tyaaa-aaaaa-aaaba-cai"
);

export const ACCOUNTS_PRINCIPAL_LOCAL: Principal = Principal.fromText(
  "222qi-2qaaa-aaaao-anesa-cai"
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
