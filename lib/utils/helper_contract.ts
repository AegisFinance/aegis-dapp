import {
  _SERVICE as _CKUSDT_LEDGER,
  idlFactory as idlFactoryCkUsdtLedger,
  init as initCkUsdtLedger,
} from '../../declarations/ckusdt_ledger/ckusdt_ledger.did';

import {
  _SERVICE as _OPTIONS,
  idlFactory as idlFactoryOptions,
  init as initOptions,
} from '../../declarations/options/options.did';

import {
  _SERVICE as _ACCOUNTS,
  idlFactory as idlFactoryAccounts,
  init as initAccounts,
  Account,
} from '../../declarations/accounts/accounts.did';

import {
  _SERVICE as _ICP_LEDGER,
  idlFactory as idlFactoryIcpLedger,
  init as initIcpLedger,
} from '../../declarations/icp_ledger/icp_ledger.did';

import {
  _SERVICE as _CKBTC_LEDGER,
  idlFactory as idlFactoryCkbtcLedger,
  init as initCkBtcLedger,
} from '../../declarations/ckbtc_ledger/ckbtc_ledger.did';

import {
  _SERVICE as _CKETH_LEDGER,
  idlFactory as idlFactoryCkethLedger,
  init as initCkEthLedger,
} from '../../declarations/cketh_ledger/cketh_ledger.did';

import {
  _SERVICE as _CKBTC_MINTER,
  idlFactory as idlFactoryCkbtcMinter,
  init as initCkBtcMinter,
} from '../../declarations/ckbtc_minter/ckbtc_minter.did';

import {
  _SERVICE as _CKETH_MINTER,
  idlFactory as idlFactoryCkethMinter,
  init as initCkEthMinter,
} from '../../declarations/cketh_minter/cketh_minter.did';

import {
  _SERVICE as _KYT,
  idlFactory as idlFactoryKYT,
  init as intKYT,
} from '../../declarations/kyt/kyt.did';

import {
  _SERVICE as _INSURANCE,
  idlFactory as idlFactoryInsurance,
  init as initInsurance,
} from '../../declarations/insurance/insurance.did';

import {
  _SERVICE as _MAIN,
  idlFactory as idlFactoryMain,
  init as initMain,
} from '../../declarations/main/main.did';

import {
  _SERVICE as _AEGIS_LEDGER,
  idlFactory as idlFactoryAegisLedger,
  init as initAegisLedger,
} from '../../declarations/aegis_ledger/aegis_ledger.did';

import {
  _SERVICE as _AEGIS_INDEX,
  idlFactory as idlFactoryAegisIndex,
  init as iniAegisIndex,
} from '../../declarations/aegis_index/aegis_index.did';

import {
  _SERVICE as _CKBTC_KYT,
  idlFactory as idlFactoryCkBtcKyt,
  init as initCkBtcKyt,
} from '../../declarations/kyt/kyt.did';

//
//
//
//
//
export type {
  _CKUSDT_LEDGER,
  _OPTIONS,
  _ICP_LEDGER,
  _CKBTC_MINTER,
  _CKETH_LEDGER,
  _CKETH_MINTER,
  _ACCOUNTS,
  _CKBTC_LEDGER,
  _KYT,
  _INSURANCE,
  _MAIN,
  _AEGIS_LEDGER,
  _AEGIS_INDEX,
  _CKBTC_KYT,
};
export {
  idlFactoryOptions,
  idlFactoryKYT,
  idlFactoryAccounts,
  idlFactoryCkbtcLedger,
  idlFactoryCkbtcMinter,
  idlFactoryCkethLedger,
  idlFactoryCkethMinter,
  idlFactoryIcpLedger,
  idlFactoryInsurance,
  idlFactoryMain,
  idlFactoryAegisLedger,
  idlFactoryAegisIndex,
  idlFactoryCkBtcKyt,
  idlFactoryCkUsdtLedger,
};

export type SERVICES =
  | _CKUSDT_LEDGER
  | _OPTIONS
  | _ICP_LEDGER
  | _CKBTC_MINTER
  | _CKETH_LEDGER
  | _CKETH_MINTER
  | _ACCOUNTS
  | _CKBTC_LEDGER
  | _KYT
  | _INSURANCE
  | _MAIN
  | _AEGIS_LEDGER
  | _AEGIS_INDEX
  | _CKBTC_KYT;

export type IDLS =
  | typeof idlFactoryCkUsdtLedger
  | typeof idlFactoryOptions
  | typeof idlFactoryAccounts
  | typeof idlFactoryCkbtcLedger
  | typeof idlFactoryCkbtcMinter
  | typeof idlFactoryCkethLedger
  | typeof idlFactoryCkethMinter
  | typeof idlFactoryIcpLedger
  | typeof idlFactoryKYT
  | typeof idlFactoryInsurance
  | typeof idlFactoryMain
  | typeof idlFactoryAegisLedger
  | typeof idlFactoryAegisIndex
  | typeof idlFactoryCkBtcKyt;

export {
  initOptions,
  initAccounts,
  initCkBtcLedger,
  initCkBtcMinter,
  initCkEthLedger,
  initCkEthMinter,
  initIcpLedger,
  intKYT,
  initInsurance,
  initMain,
  initAegisLedger,
  iniAegisIndex,
  initCkUsdtLedger,
};

export type { Account };
