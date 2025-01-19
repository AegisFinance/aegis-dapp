import { ActorSubclass } from '@dfinity/agent';
import {
  ACCOUNTS_PRINCIPAL,
  AEGIS_LEDGER_INDEX_PRINCIPAL,
  AEGIS_LEDGER_PRINCIPAL,
  CKBTC_KYT_PRINCIPAL,
  CKBTC_LEDGER_PRINCIPAL,
  CKBTC_MINTER_PRINCIPAL,
  CKETH_LEDGER_PRINCIPAL,
  CKETH_MINTER_PRINCIPAL,
  CKUSDT_LEDGER_PRINCIPAL,
  ICP_LEDGER_PRINCIPAL,
  INSURANCE_PRINCIPAL,
  MAIN_PRINCIPAL,
  OPTIONS_PRINCIPAL,
} from '../constants/canisters';
// import { getIdentity } from '../auth';
import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
import { Provider } from '../auth/interface';
import { CANISTERS_NAME } from '../utils';
import {
  _ACCOUNTS,
  _AEGIS_INDEX,
  _AEGIS_LEDGER,
  _CKBTC_KYT,
  _CKBTC_LEDGER,
  _CKBTC_MINTER,
  _CKETH_LEDGER,
  _CKETH_MINTER,
  _ICP_LEDGER,
  _INSURANCE,
  _MAIN,
  _OPTIONS,
  idlFactoryAccounts,
  idlFactoryAegisIndex,
  idlFactoryAegisLedger,
  idlFactoryCkBtcKyt,
  idlFactoryCkbtcLedger,
  idlFactoryCkbtcMinter,
  idlFactoryCkethLedger,
  idlFactoryCkethMinter,
  idlFactoryIcpLedger,
  idlFactoryInsurance,
  idlFactoryMain,
  idlFactoryOptions,
  SERVICES,
  _CKUSDT_LEDGER,
  idlFactoryCkUsdtLedger,
} from '../utils/helper_contract';
import { idlFactory } from '@/declarations/kyt';

// export function createActor(
//   canisterName: CANISTERS_NAME
// ): ActorSubclass<SERVICES> {
//   const agent = new HttpAgent({
//     host: 'http://localhost:8080/',
//     identity: getIdentity(),
//   });

//   agent.fetchRootKey();

//   switch (canisterName) {
//     case CANISTERS_NAME.ACCOUNTS:
//       return Actor.createActor(idlFactoryAccounts, {
//         agent,
//         canisterId: ACCOUNTS_PRINCIPAL,
//       });

//     case CANISTERS_NAME.CKBTC_MINTER:
//       return Actor.createActor(idlFactoryCkbtcMinter, {
//         agent,
//         canisterId: CANISTER_IDS_MAP.get(CANISTERS_NAME.CKBTC_MINTER)!,
//       });

//     case CANISTERS_NAME.CKETH_MINTER:
//       return Actor.createActor(idlFactoryCkbtcMinter, {
//         agent,
//         canisterId: CANISTER_IDS_MAP.get(CANISTERS_NAME.CKETH_MINTER)!,
//       });
//     case CANISTERS_NAME.CKBTC_LEDGER:
//       return Actor.createActor(idlFactoryCkbtcLedger, {
//         agent,
//         canisterId: CANISTER_IDS_MAP.get(CANISTERS_NAME.CKBTC_LEDGER)!,
//       });
//     case CANISTERS_NAME.CKETH_LEDGER:
//       return Actor.createActor(idlFactoryCkethLedger, {
//         agent,
//         canisterId: CANISTER_IDS_MAP.get(CANISTERS_NAME.CKETH_LEDGER)!,
//       });

//     default:
//       throw new Error(`Canister ${canisterName} not Found`);
//   }
// }

export async function createCanisterActorWithPlug(
  canisterId: Principal,
  idlFactory: IDL.InterfaceFactory
): Promise<ActorSubclass<SERVICES>> {
  return await window.ic?.plug?.createActor({
    canisterId,
    interfaceFactory: idlFactory,
  });
}

export async function createCanisterActorWithProvider(
  provider: Provider,
  canisterId: Principal,
  idl: IDL.InterfaceFactory
) {
  switch (provider) {
    case Provider.II:
      break;

    case Provider.Nfid:
      break;

    case Provider.Plug:
      return await createCanisterActorWithPlug(canisterId, idl);

    default:
      console.log('Provider Not Found');
      throw new Error('Provider Not Found');
  }
}

export async function createCanisterActor(
  canisterName: CANISTERS_NAME,
  provider: Provider
): Promise<ActorSubclass<SERVICES>> {
  let canisterId: Principal | undefined;
  let idl: IDL.InterfaceFactory;

  switch (canisterName) {
    case CANISTERS_NAME.OPTIONS:
      canisterId = OPTIONS_PRINCIPAL;
      idl = idlFactoryOptions;
      return (await createCanisterActorWithProvider(
        provider,
        canisterId,
        idl
      )) as ActorSubclass<_OPTIONS>;

    case CANISTERS_NAME.INSURANCE:
      canisterId = INSURANCE_PRINCIPAL;
      idl = idlFactoryInsurance;
      return (await createCanisterActorWithProvider(
        provider,
        canisterId,
        idl
      )) as ActorSubclass<_INSURANCE>;

    case CANISTERS_NAME.ACCOUNTS:
      canisterId = ACCOUNTS_PRINCIPAL;
      idl = idlFactoryAccounts;
      return (await createCanisterActorWithProvider(
        provider,
        canisterId,
        idl
      )) as ActorSubclass<_ACCOUNTS>;

    case CANISTERS_NAME.MAIN:
      canisterId = MAIN_PRINCIPAL;
      idl = idlFactoryMain;
      return (await createCanisterActorWithProvider(
        provider,
        canisterId,
        idl
      )) as ActorSubclass<_MAIN>;

    case CANISTERS_NAME.AEGIS_LEDGER:
      canisterId = AEGIS_LEDGER_PRINCIPAL;
      idl = idlFactoryAegisLedger;
      return (await createCanisterActorWithProvider(
        provider,
        canisterId,
        idl
      )) as ActorSubclass<_AEGIS_LEDGER>;

    case CANISTERS_NAME.AEGIS_LEDGER_INDEX:
      canisterId = AEGIS_LEDGER_INDEX_PRINCIPAL;
      idl = idlFactoryAegisIndex;
      return (await createCanisterActorWithProvider(
        provider,
        canisterId,
        idl
      )) as ActorSubclass<_AEGIS_INDEX>;

    case CANISTERS_NAME.CKBTC_KYT:
      canisterId = CKBTC_KYT_PRINCIPAL;
      idl = idlFactoryCkBtcKyt;
      return (await createCanisterActorWithProvider(
        provider,
        canisterId,
        idl
      )) as ActorSubclass<_CKBTC_KYT>;

    case CANISTERS_NAME.CKBTC_LEDGER:
      canisterId = CKBTC_LEDGER_PRINCIPAL;
      idl = idlFactoryCkbtcLedger;
      return (await createCanisterActorWithProvider(
        provider,
        canisterId,
        idl
      )) as ActorSubclass<_CKBTC_LEDGER>;

    case CANISTERS_NAME.CKBTC_MINTER:
      canisterId = CKBTC_MINTER_PRINCIPAL;
      idl = idlFactoryCkbtcMinter;
      return (await createCanisterActorWithProvider(
        provider,
        canisterId,
        idl
      )) as ActorSubclass<_CKBTC_MINTER>;

    case CANISTERS_NAME.CKETH_LEDGER:
      canisterId = CKETH_LEDGER_PRINCIPAL;
      idl = idlFactoryCkethLedger;
      return (await createCanisterActorWithProvider(
        provider,
        canisterId,
        idl
      )) as ActorSubclass<_CKETH_LEDGER>;

    case CANISTERS_NAME.CKETH_MINTER:
      canisterId = CKETH_MINTER_PRINCIPAL;
      idl = idlFactoryCkethMinter;
      return (await createCanisterActorWithProvider(
        provider,
        canisterId,
        idl
      )) as ActorSubclass<_CKETH_MINTER>;

    case CANISTERS_NAME.ICP_LEDGER:
      canisterId = ICP_LEDGER_PRINCIPAL;
      idl = idlFactoryIcpLedger;
      return (await createCanisterActorWithProvider(
        provider,
        canisterId,
        idl
      )) as ActorSubclass<_ICP_LEDGER>;

    case CANISTERS_NAME.CKUSDT_LEDGER:
      canisterId = CKUSDT_LEDGER_PRINCIPAL;
      idl = idlFactoryCkUsdtLedger;
      return (await createCanisterActorWithProvider(
        provider,
        canisterId,
        idl
      )) as ActorSubclass<_CKUSDT_LEDGER>;
    //
    //
    //
    //////// ---------- incomplete------------
    //
    //
    //

    case CANISTERS_NAME.CKSEPOLIA_LEDGER:
      canisterId = INSURANCE_PRINCIPAL;
      idl = idlFactoryInsurance;
      return (await createCanisterActorWithProvider(
        provider,
        canisterId,
        idl
      )) as ActorSubclass<_ACCOUNTS>;

    case CANISTERS_NAME.CKSEPOLIA_MINTER:
      canisterId = INSURANCE_PRINCIPAL;
      idl = idlFactoryInsurance;
      return (await createCanisterActorWithProvider(
        provider,
        canisterId,
        idl
      )) as ActorSubclass<_ACCOUNTS>;

    case CANISTERS_NAME.CKTEST_BTC_KYT:
      canisterId = INSURANCE_PRINCIPAL;
      idl = idlFactoryInsurance;
      return (await createCanisterActorWithProvider(
        provider,
        canisterId,
        idl
      )) as ActorSubclass<_ACCOUNTS>;

    case CANISTERS_NAME.CKTEST_BTC_LEDGER:
      canisterId = INSURANCE_PRINCIPAL;
      idl = idlFactoryInsurance;
      return (await createCanisterActorWithProvider(
        provider,
        canisterId,
        idl
      )) as ActorSubclass<_ACCOUNTS>;

    case CANISTERS_NAME.CKTEST_BTC_MINTER:
      canisterId = INSURANCE_PRINCIPAL;
      idl = idlFactoryInsurance;
      return (await createCanisterActorWithProvider(
        provider,
        canisterId,
        idl
      )) as ActorSubclass<_ACCOUNTS>;

    default:
      throw new Error(
        `Unable to Create Actor as Canister ${canisterName} not Found`
      );
  }
}
