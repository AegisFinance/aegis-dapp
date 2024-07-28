import { Actor, ActorSubclass, HttpAgent } from "@dfinity/agent";
import { ACCOUNTS_PRINCIPAL } from "../constants/canisters";
import { getIdentity } from "../auth";
import { _SERVICE } from "@/declarations/accounts/accounts.did";
import {
  _ACCOUNTS,
  idlFactoryAccounts,
  idlFactoryCkbtcLedger,
  idlFactoryCkbtcMinter,
  idlFactoryCkethLedger,
  SERVICES,
} from "../utils/helper_contract";
import { CANISTER_IDS_MAP, CANISTERS_NAME } from "../utils";

export function createActor(
  canisterName: CANISTERS_NAME
): ActorSubclass<SERVICES> {
  const agent = new HttpAgent({
    host: "http://localhost:8080/",
    identity: getIdentity(),
  });

  agent.fetchRootKey();

  switch (canisterName) {
    case CANISTERS_NAME.ACCOUNTS:
      return Actor.createActor(idlFactoryAccounts, {
        agent,
        canisterId: ACCOUNTS_PRINCIPAL,
      });

    case CANISTERS_NAME.CKBTC_MINTER:
      return Actor.createActor(idlFactoryCkbtcMinter, {
        agent,
        canisterId: CANISTER_IDS_MAP.get(CANISTERS_NAME.CKBTC_MINTER)!,
      });

    case CANISTERS_NAME.CKETH_MINTER:
      return Actor.createActor(idlFactoryCkbtcMinter, {
        agent,
        canisterId: CANISTER_IDS_MAP.get(CANISTERS_NAME.CKETH_MINTER)!,
      });
    case CANISTERS_NAME.CKBTC_LEDGER:
      return Actor.createActor(idlFactoryCkbtcLedger, {
        agent,
        canisterId: CANISTER_IDS_MAP.get(CANISTERS_NAME.CKBTC_LEDGER)!,
      });
    case CANISTERS_NAME.CKETH_LEDGER:
      return Actor.createActor(idlFactoryCkethLedger, {
        agent,
        canisterId: CANISTER_IDS_MAP.get(CANISTERS_NAME.CKETH_LEDGER)!,
      });

    default:
      throw new Error(`Canister ${canisterName} not Found`);
  }
}
