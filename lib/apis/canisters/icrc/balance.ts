import { Account } from '@/declarations/cketh_ledger/cketh_ledger.did';
import { Provider } from '@/lib/auth/interface';
import { createCanisterActor } from '@/lib/services/create_actor';
import { CANISTERS_NAME, Result } from '@/lib/utils';
import { _CKETH_LEDGER } from '@/lib/utils/helper_contract';
import { ActorSubclass } from '@dfinity/agent';
import { BalanceParams } from '@dfinity/ledger-icrc';

export async function getIcrcBalance(
  ledger: CANISTERS_NAME,
  args: Account,
  provider: Provider
): Promise<bigint> {
  let icrcActor: ActorSubclass<_CKETH_LEDGER> = (await createCanisterActor(
    ledger,
    provider
  )) as ActorSubclass<_CKETH_LEDGER>;

  let res: bigint = await icrcActor.icrc1_balance_of(args);

  return res;
}
