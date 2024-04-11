import { Principal } from "@dfinity/principal";

export function checkTimeOutExpiry(time: number): boolean {
  const currentTimestamp = Date.now();

  // Calculate the difference in milliseconds
  const timeDifference = currentTimestamp - time;

  // Check if the difference is less than 30 minutes (1800 seconds)
  return timeDifference < 1800 * 1000;
}


export enum CANISTERS_NAME {
  ACCOUNTS,
  ICP_LEDGER,
  CKBTC_LEDGER,
  CKETH_LEDGER,
  CKBTC_MINTER,
  CKETH_MINTER,
  KYT,
}

let CANISTER_IDS: (CANISTERS_NAME | Principal)[][] = [
  [
    CANISTERS_NAME.ICP_LEDGER,
    Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai"),
  ],
  [
    CANISTERS_NAME.CKBTC_LEDGER,
    Principal.fromText("mxzaz-hqaaa-aaaar-qaada-cai"),
  ],
  [
    CANISTERS_NAME.CKETH_LEDGER,
    Principal.fromText("apia6-jaaaa-aaaar-qabma-cai"),
  ],
  [
    CANISTERS_NAME.CKBTC_MINTER,
    Principal.fromText("mqygn-kiaaa-aaaar-qaadq-cai"),
  ],
  [
    CANISTERS_NAME.CKETH_MINTER,
    Principal.fromText("55zjc-4qaaa-aaaar-qadja-cai"),
  ],
  [CANISTERS_NAME.ACCOUNTS, Principal.fromText("222qi-2qaaa-aaaao-anesa-cai")],
  [CANISTERS_NAME.KYT, Principal.fromText("pjihx-aaaaa-aaaar-qaaka-cai")],
];

export let CANISTER_IDS_MAP = new Map(
  CANISTER_IDS.map(([key, value]) => [key, value as Principal])
);
