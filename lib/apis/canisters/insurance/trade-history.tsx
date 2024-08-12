import { InsuranceBuyersKey, UserInsuranceListHistoryKey } from '@/declarations/insurance/insurance.did';
import { Provider } from '@/lib/auth/interface';
import { createCanisterActor } from '@/lib/services/create_actor';
import { CANISTERS_NAME } from '@/lib/utils';
import { _INSURANCE } from '@/lib/utils/helper_contract';
import { ActorSubclass } from '@dfinity/agent';

export async function getInsuranceTradeHistoryByPrincipal(
  provider: Provider
): Promise<[UserInsuranceListHistoryKey, bigint][]> {
  let insuranceActor: ActorSubclass<_INSURANCE> = (await createCanisterActor(
    CANISTERS_NAME.INSURANCE,
    provider
  )) as ActorSubclass<_INSURANCE>;

  return await insuranceActor.get_user_insurance_history_by_principal();
}
