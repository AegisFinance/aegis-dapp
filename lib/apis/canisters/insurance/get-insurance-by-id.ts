import { Insurance } from '@/declarations/insurance/insurance.did';
import { Provider } from '@/lib/auth/interface';
import { createCanisterActor } from '@/lib/services/create_actor';
import { CANISTERS_NAME } from '@/lib/utils';
import { _INSURANCE } from '@/lib/utils/helper_contract';
import { ActorSubclass } from '@dfinity/agent';

export async function getInsuranceById(
  insuranceId: number,
  provider: Provider | undefined
): Promise<[] | [Insurance]> {
  let insuranceActor: ActorSubclass<_INSURANCE> = (await createCanisterActor(
    CANISTERS_NAME.INSURANCE,
    provider!
  )) as ActorSubclass<_INSURANCE>;

  let res: [] | [Insurance] =
    await insuranceActor.get_insurance_by_id(insuranceId);

  return res;
}
