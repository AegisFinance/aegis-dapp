import { InsuranceActiveListKey } from '@/declarations/insurance/insurance.did';
import { Provider } from '@/lib/auth/interface';
import { createCanisterActor } from '@/lib/services/create_actor';
import { CANISTERS_NAME } from '@/lib/utils';
import { _INSURANCE } from '@/lib/utils/helper_contract';
import { ActorSubclass } from '@dfinity/agent';

export async function listInsurances(
  provider: Provider
): Promise<[InsuranceActiveListKey, null][]> {
  console.log(': --------------------');
  console.log(': provider', provider);
  console.log(': --------------------');
  
  let insuranceActor: ActorSubclass<_INSURANCE> = (await createCanisterActor(

    CANISTERS_NAME.INSURANCE,
    provider
  )) as ActorSubclass<_INSURANCE>;
  
	console.log(": --------------------------------");
	console.log(": insuranceActor", insuranceActor);
	console.log(": --------------------------------");
  return await insuranceActor.list_insurance_contract();
}
