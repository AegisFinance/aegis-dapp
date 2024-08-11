import { InsuranceBuyersKey } from '@/declarations/insurance/insurance.did';
import { Provider } from '@/lib/auth/interface';
import { createCanisterActor } from '@/lib/services/create_actor';
import { CANISTERS_NAME } from '@/lib/utils';
import { _INSURANCE } from '@/lib/utils/helper_contract';
import { ActorSubclass } from '@dfinity/agent';

export async function getActiveBuyInsuranceListByPrincipal(
  provider: Provider
): Promise<InsuranceBuyersKey[]> {
  let insuranceActor: ActorSubclass<_INSURANCE> = (await createCanisterActor(
    CANISTERS_NAME.INSURANCE,
    provider
  )) as ActorSubclass<_INSURANCE>;

  return await insuranceActor.get_buy_insurance_contract_list_by_princicpal();
}

export async function getActiveSellInsuranceListByPrincipal(
  provider: Provider
): Promise<InsuranceBuyersKey[]> {
  let insuranceActor: ActorSubclass<_INSURANCE> = (await createCanisterActor(
    CANISTERS_NAME.INSURANCE,
    provider
  )) as ActorSubclass<_INSURANCE>;

  return await insuranceActor.get_seller_insurance_contract_list_by_princicpal();
}
