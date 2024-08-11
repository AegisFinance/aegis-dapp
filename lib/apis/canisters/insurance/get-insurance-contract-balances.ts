import { Provider } from '@/lib/auth/interface';
import { createCanisterActor } from '@/lib/services/create_actor';
import { CANISTERS_NAME } from '@/lib/utils';
import { _INSURANCE } from '@/lib/utils/helper_contract';
import { ActorSubclass } from '@dfinity/agent';

export async function getInsurancePoolBalance(
  insuranceId: number,
  provider: Provider
): Promise<bigint> {
  let insuranceActor: ActorSubclass<_INSURANCE> = (await createCanisterActor(
    CANISTERS_NAME.INSURANCE,
    provider
  )) as ActorSubclass<_INSURANCE>;

  return await insuranceActor.get_pool_balance_by_insurance_id(insuranceId);
}

export async function getInsurancePremiumPoolBalance(
  insuranceId: number,
  provider: Provider
): Promise<bigint> {
  let insuranceActor: ActorSubclass<_INSURANCE> = (await createCanisterActor(
    CANISTERS_NAME.INSURANCE,
    provider
  )) as ActorSubclass<_INSURANCE>;

  return await insuranceActor.get_premium_pool_balance_by_insurance_id(
    insuranceId
  );
}
